import { useState } from 'react';
import { InstructorLayout } from '@/components/layout/InstructorLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { studentRecords, instructorCourses } from '@/data/instructorMockData';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const InstructorAttendance = () => {
  const [selectedCourse, setSelectedCourse] = useState(instructorCourses[0].id);

  const filtered = studentRecords.filter(s => s.courseId === selectedCourse);
  const course = instructorCourses.find(c => c.id === selectedCourse)!;

  const above90 = filtered.filter(s => s.attendance >= 90).length;
  const between75and90 = filtered.filter(s => s.attendance >= 75 && s.attendance < 90).length;
  const below75 = filtered.filter(s => s.attendance < 75).length;

  const pieData = [
    { name: '≥90%', value: above90, color: 'hsl(var(--success))' },
    { name: '75–89%', value: between75and90, color: 'hsl(var(--warning))' },
    { name: '<75%', value: below75, color: 'hsl(var(--destructive))' },
  ].filter(d => d.value > 0);

  return (
    <InstructorLayout>
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold mb-2">Attendance</h1>
        <p className="text-muted-foreground">Track student attendance across your courses.</p>
      </div>

      <div className="mb-6">
        <Select value={selectedCourse} onValueChange={setSelectedCourse}>
          <SelectTrigger className="w-64">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {instructorCourses.map(c => (
              <SelectItem key={c.id} value={c.id}>{c.code} – {c.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="text-lg">Overview</CardTitle>
            <CardDescription>{course.code} – {course.name}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Enrolled</span>
              <span className="font-medium">{course.enrolledStudents}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Avg Attendance</span>
              <span className="font-medium">{course.avgAttendance}%</span>
            </div>
            <Progress value={course.avgAttendance} className="h-2" />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <CardHeader>
            <CardTitle className="text-lg">Attendance Distribution</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-8">
            <ResponsiveContainer width={160} height={160}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value" paddingAngle={4}>
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {pieData.map(d => (
                <div key={d.name} className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
                  <span>{d.name}: {d.value} students</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="animate-fade-in" style={{ animationDelay: '200ms' }}>
        <CardHeader>
          <CardTitle>Student Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Attendance</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(s => (
                <TableRow key={s.id}>
                  <TableCell className="font-medium">{s.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={s.attendance} className="h-2 w-24" />
                      <span className="text-sm">{s.attendance}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={s.attendance >= 90 ? 'default' : s.attendance >= 75 ? 'secondary' : 'destructive'}>
                      {s.attendance >= 90 ? 'Good' : s.attendance >= 75 ? 'Warning' : 'Critical'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </InstructorLayout>
  );
};

export default InstructorAttendance;
