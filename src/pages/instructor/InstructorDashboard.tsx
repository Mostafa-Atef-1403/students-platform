import { useAuth } from '@/contexts/AuthContext';
import { InstructorLayout } from '@/components/layout/InstructorLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Users, BookOpen, ClipboardList, TrendingUp, ChevronRight, Clock } from 'lucide-react';
import { instructorCourses, instructorQuizzes, coursePerformance } from '@/data/instructorMockData';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';

const InstructorDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const totalStudents = instructorCourses.reduce((a, c) => a + c.enrolledStudents, 0);
  const activeQuizzes = instructorQuizzes.filter(q => q.status === 'active').length;
  const avgAttendance = Math.round(instructorCourses.reduce((a, c) => a + c.avgAttendance, 0) / instructorCourses.length);

  const stats = [
    { title: 'Total Students', value: totalStudents.toString(), icon: Users, color: 'bg-primary/10 text-primary', desc: 'Across all courses' },
    { title: 'Courses', value: instructorCourses.length.toString(), icon: BookOpen, color: 'bg-secondary/10 text-secondary', desc: 'This semester' },
    { title: 'Active Quizzes', value: activeQuizzes.toString(), icon: ClipboardList, color: 'bg-success/10 text-success', desc: 'Currently running' },
    { title: 'Avg Attendance', value: `${avgAttendance}%`, icon: TrendingUp, color: 'bg-warning/10 text-warning', desc: 'All courses' },
  ];

  const recentQuizzes = instructorQuizzes.filter(q => q.status === 'active' || q.status === 'closed').slice(0, 4);

  return (
    <InstructorLayout>
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold mb-2">
          Welcome, <span className="text-gradient">{user?.name?.split(' ')[0]}</span>! 👋
        </h1>
        <p className="text-muted-foreground">Here's an overview of your courses and students.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <Card key={stat.title} className="animate-fade-in hover:shadow-lg transition-all" style={{ animationDelay: `${i * 100}ms` }}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.desc}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Performance Chart */}
        <Card className="lg:col-span-2 animate-fade-in" style={{ animationDelay: '400ms' }}>
          <CardHeader>
            <CardTitle className="text-lg">Course Performance Trends</CardTitle>
            <CardDescription>Average student scores over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={coursePerformance}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
                <Area type="monotone" dataKey="cs301" stroke="hsl(var(--primary))" fill="hsl(var(--primary) / 0.15)" name="CS301" />
                <Area type="monotone" dataKey="cs305" stroke="hsl(var(--secondary))" fill="hsl(var(--secondary) / 0.15)" name="CS305" />
                <Area type="monotone" dataKey="cs401" stroke="hsl(var(--success))" fill="hsl(var(--success) / 0.15)" name="CS401" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Course Overview */}
        <Card className="animate-fade-in" style={{ animationDelay: '500ms' }}>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">My Courses</CardTitle>
              <CardDescription>Attendance overview</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate('/instructor/courses')}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {instructorCourses.map((course) => (
              <div key={course.id}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="truncate pr-2">{course.code}</span>
                  <span className="text-muted-foreground">{course.avgAttendance}%</span>
                </div>
                <Progress value={course.avgAttendance} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Quiz Activity */}
      <Card className="animate-fade-in" style={{ animationDelay: '600ms' }}>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg">Recent Quiz Activity</CardTitle>
            <CardDescription>Active and recently closed quizzes</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate('/instructor/quizzes')}>View All</Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {recentQuizzes.map((quiz) => (
              <div key={quiz.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <ClipboardList className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{quiz.title}</p>
                  <p className="text-sm text-muted-foreground">{quiz.courseName}</p>
                </div>
                <div className="text-right space-y-1">
                  <Badge variant={quiz.status === 'active' ? 'default' : 'secondary'}>
                    {quiz.status}
                  </Badge>
                  {quiz.submissions !== undefined && (
                    <p className="text-xs text-muted-foreground">{quiz.submissions} submissions</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </InstructorLayout>
  );
};

export default InstructorDashboard;
