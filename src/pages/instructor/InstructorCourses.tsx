import { InstructorLayout } from '@/components/layout/InstructorLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Users, Clock, BookOpen } from 'lucide-react';
import { instructorCourses } from '@/data/instructorMockData';

const InstructorCourses = () => {
  return (
    <InstructorLayout>
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold mb-2">My Courses</h1>
        <p className="text-muted-foreground">Manage your courses for this semester.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {instructorCourses.map((course, i) => (
          <Card key={course.id} className="animate-fade-in hover:shadow-lg transition-all" style={{ animationDelay: `${i * 100}ms` }}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <Badge variant="outline" className="mb-2">{course.code}</Badge>
                  <CardTitle className="text-lg">{course.name}</CardTitle>
                </div>
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{course.schedule}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>{course.enrolledStudents} students enrolled</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span>{course.credits} credits</span>
              </div>

              <div className="pt-2 border-t border-border space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Avg Attendance</span>
                    <span className="font-medium">{course.avgAttendance}%</span>
                  </div>
                  <Progress value={course.avgAttendance} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Avg Grade</span>
                    <span className="font-medium">{course.avgGrade}%</span>
                  </div>
                  <Progress value={course.avgGrade} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </InstructorLayout>
  );
};

export default InstructorCourses;
