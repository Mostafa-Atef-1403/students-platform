import { useEffect, useState } from "react";
import { InstructorLayout } from "@/components/layout/InstructorLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";
import { studentRecords, instructorCourses } from "@/data/instructorMockData";
import StudentReportModal from "@/components/StudentReportModal";
import { getSubmissions, type ExamSubmission } from "@/lib/examSubmissions";
import { downloadExamReportExcel } from "@/services/proctoring";
import { useToast } from "@/hooks/use-toast";

interface ExamGroup {
  examId: number;
  examName: string;
  subjectName: string;
  count: number;
}

const InstructorStudents = () => {
  const { toast } = useToast();
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [reportOpen, setReportOpen] = useState(false);
  const [reportTarget, setReportTarget] = useState<{
    studentId: number;
    studentName: string;
    examId: number;
  } | null>(null);
  const [submissions, setSubmissions] = useState<ExamSubmission[]>([]);
  const [downloadingExam, setDownloadingExam] = useState<number | null>(null);

  useEffect(() => {
    setSubmissions(getSubmissions());
  }, []);

  const examGroups: ExamGroup[] = Object.values(
    submissions.reduce<Record<number, ExamGroup>>((acc, s) => {
      if (!acc[s.examId]) {
        acc[s.examId] = {
          examId: s.examId,
          examName: s.examName,
          subjectName: s.subjectName,
          count: 0,
        };
      }
      acc[s.examId].count++;
      return acc;
    }, {}),
  );

  const handleDownloadExcel = async (examId: number, examName: string) => {
    setDownloadingExam(examId);
    try {
      await downloadExamReportExcel(examId);
      toast({
        title: "Download started",
        description: `Excel report for "${examName}" is downloading.`,
      });
    } catch (e) {
      toast({
        title: "Download failed",
        description:
          e instanceof Error ? e.message : "Could not download report",
        variant: "destructive",
      });
    } finally {
      setDownloadingExam(null);
    }
  };

  const filtered =
    selectedCourse === "all"
      ? studentRecords
      : studentRecords.filter((s) => s.courseId === selectedCourse);

  const openReport = (
    studentIdRaw: string | number,
    studentName: string,
    examIdRaw: string | number,
  ) => {
    const studentId =
      typeof studentIdRaw === "number"
        ? studentIdRaw
        : parseInt(String(studentIdRaw).replace(/\D/g, ""), 10) || 1;
    const examId =
      typeof examIdRaw === "number"
        ? examIdRaw
        : parseInt(String(examIdRaw).replace(/\D/g, ""), 10) || 1;
    setReportTarget({ studentId, studentName, examId });
    setReportOpen(true);
  };

  return (
    <InstructorLayout>
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold mb-2">Students</h1>
        <p className="text-muted-foreground">
          View and manage student performance across your courses.
        </p>
      </div>

      <div className="mb-6">
        <Select value={selectedCourse} onValueChange={setSelectedCourse}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Filter by course" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Courses</SelectItem>
            {instructorCourses.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.code} – {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Per-student submission table */}
      <Card className="animate-fade-in mb-6">
        <CardHeader>
          <CardTitle>Exam Submissions</CardTitle>
          <CardDescription>
            {submissions.length} submission{submissions.length === 1 ? "" : "s"}{" "}
            from students who took an exam
          </CardDescription>
        </CardHeader>
        <CardContent>
          {submissions.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No exam submissions yet.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Exam</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Report</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submissions.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell className="font-medium">
                        {s.studentName}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {s.studentEmail}
                      </TableCell>
                      <TableCell>{s.examName}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{s.subjectName}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={s.percentage >= 50 ? "default" : "secondary"}
                        >
                          {s.score}/{s.total} ({s.percentage}%)
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(s.date).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            openReport(s.studentId, s.studentName, s.examId)
                          }
                        >
                          <FileText className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Excel download — one per exam, covers ALL students who sat it */}
      {examGroups.length > 0 && (
        <Card className="animate-fade-in mb-6">
          <CardHeader>
            <CardTitle>Download Full Excel Reports</CardTitle>
            <CardDescription>
              Each file contains all students who sat that exam with proctoring
              data and scores.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Exam</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Submissions</TableHead>
                    <TableHead className="text-right">Download</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {examGroups.map((eg) => (
                    <TableRow key={eg.examId}>
                      <TableCell className="font-medium">
                        {eg.examName}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{eg.subjectName}</Badge>
                      </TableCell>
                      <TableCell>
                        {eg.count} student{eg.count === 1 ? "" : "s"}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          onClick={() =>
                            handleDownloadExcel(eg.examId, eg.examName)
                          }
                          disabled={downloadingExam === eg.examId}
                        >
                          <Download className="w-4 h-4 mr-1" />
                          {downloadingExam === eg.examId
                            ? "Preparing..."
                            : "Excel"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {reportTarget && (
        <StudentReportModal
          open={reportOpen}
          onOpenChange={setReportOpen}
          studentId={reportTarget.studentId}
          studentName={reportTarget.studentName}
          examId={reportTarget.examId}
        />
      )}
    </InstructorLayout>
  );
};

export default InstructorStudents;
