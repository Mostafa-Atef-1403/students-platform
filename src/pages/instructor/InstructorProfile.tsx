import { useAuth } from '@/contexts/AuthContext';
import { InstructorLayout } from '@/components/layout/InstructorLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Building, BookOpen, Users } from 'lucide-react';
import { instructorCourses } from '@/data/instructorMockData';

const InstructorProfile = () => {
  const { user } = useAuth();
  const totalStudents = instructorCourses.reduce((a, c) => a + c.enrolledStudents, 0);

  const details = [
    { label: 'Full Name', value: user?.name, icon: User },
    { label: 'Email', value: user?.email, icon: Mail },
    { label: 'Department', value: user?.department, icon: Building },
    { label: 'Title', value: user?.title, icon: User },
    { label: 'Courses', value: `${instructorCourses.length} this semester`, icon: BookOpen },
    { label: 'Total Students', value: totalStudents.toString(), icon: Users },
  ];

  return (
    <InstructorLayout>
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold mb-2">My Profile</h1>
        <p className="text-muted-foreground">Your instructor profile details.</p>
      </div>

      <div className="max-w-2xl">
        <Card className="animate-fade-in">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-8 h-8 text-primary" />
            </div>
            <div>
              <CardTitle>{user?.name}</CardTitle>
              <div className="flex gap-2 mt-1">
                <Badge>{user?.role}</Badge>
                <Badge variant="outline">{user?.faculty}</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {details.map(d => (
                <div key={d.label} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <d.icon className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">{d.label}</p>
                    <p className="text-sm font-medium">{d.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </InstructorLayout>
  );
};

export default InstructorProfile;
