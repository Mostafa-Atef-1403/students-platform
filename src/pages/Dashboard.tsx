import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  BookOpen,
  ClipboardList,
  Trophy,
  TrendingUp,
  Clock,
  ChevronRight,
  Calendar,
  Target } from
'lucide-react';
import { subjects, quizzes, attendanceRecords, weeklyProgress } from '@/data/mockData';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar } from
'recharts';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { student } = useAuth();
  const navigate = useNavigate();

  const availableQuizzes = quizzes.filter((q) => q.status === 'available');
  const completedQuizzes = quizzes.filter((q) => q.status === 'completed');
  const avgAttendance = Math.round(
    attendanceRecords.reduce((acc, r) => acc + r.percentage, 0) / attendanceRecords.length
  );

  const statCards = [
  {
    title: 'Current GPA',
    value: student?.gpa?.toFixed(2) || '3.50',
    icon: Trophy,
    color: 'bg-success/10 text-success',
    description: 'This semester'
  },
  {
    title: 'CGPA',
    value: student?.cgpa?.toFixed(2) || '3.42',
    icon: TrendingUp,
    color: 'bg-primary/10 text-primary',
    description: 'Cumulative'
  },
  {
    title: 'Subjects',
    value: subjects.length.toString(),
    icon: BookOpen,
    color: 'bg-secondary/10 text-secondary',
    description: `${student?.completedCredits || 48} credits`
  },
  {
    title: 'Attendance',
    value: `${avgAttendance}%`,
    icon: Calendar,
    color: 'bg-warning/10 text-warning',
    description: 'Overall average'
  }];


  return (
    <DashboardLayout>
      {/* Welcome Section */}
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold mb-2">Welcome back, <span className="text-gradient">{student?.name}</span>! 👋</h1>
        <p className="text-muted-foreground">
          Here's your academic progress overview for this semester.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat, index) =>
        <Card
          key={stat.title}
          className="animate-fade-in hover:shadow-lg transition-all"
          style={{ animationDelay: `${index * 100}ms` }}>
          
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Weekly Progress Chart */}
        <Card className="lg:col-span-2 animate-fade-in" style={{ animationDelay: '400ms' }}>
          <CardHeader>
            <CardTitle className="text-lg">Weekly Activity</CardTitle>
            <CardDescription>Your study hours and completed quizzes</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={weeklyProgress}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="day" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} />
                
                <Area
                  type="monotone"
                  dataKey="hours"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary) / 0.2)"
                  name="Study Hours" />
                
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Subject Progress */}
        <Card className="animate-fade-in" style={{ animationDelay: '500ms' }}>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Subject Progress</CardTitle>
              <CardDescription>Completion status</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate('/subjects')}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {subjects.slice(0, 4).map((subject) =>
            <div key={subject.id}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="truncate pr-2">{subject.code}</span>
                  <span className="text-muted-foreground">{subject.progress}%</span>
                </div>
                <Progress value={subject.progress} className="h-2" />
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Available Quizzes */}
        <Card className="animate-fade-in" style={{ animationDelay: '600ms' }}>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Available Quizzes
              </CardTitle>
              <CardDescription>{availableQuizzes.length} quizzes ready to take</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate('/quizzes')}>
              View All
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {availableQuizzes.length > 0 ?
            availableQuizzes.map((quiz) =>
            <div
              key={quiz.id}
              className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
              
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <ClipboardList className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{quiz.title}</p>
                    <p className="text-sm text-muted-foreground">{quiz.subjectName}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className="mb-1">
                      <Clock className="w-3 h-3 mr-1" />
                      {quiz.duration}m
                    </Badge>
                  </div>
                </div>
            ) :

            <p className="text-muted-foreground text-center py-4">No quizzes available right now</p>
            }
          </CardContent>
        </Card>

        {/* Recent Results */}
        <Card className="animate-fade-in" style={{ animationDelay: '700ms' }}>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                <Trophy className="w-5 h-5 text-success" />
                Recent Results
              </CardTitle>
              <CardDescription>Your latest quiz scores</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {completedQuizzes.slice(0, 3).map((quiz) =>
            <div
              key={quiz.id}
              className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
              
                <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-success" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{quiz.title}</p>
                  <p className="text-sm text-muted-foreground">{quiz.attemptedAt}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">
                    {quiz.score}/{quiz.maxScore}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {Math.round(quiz.score! / quiz.maxScore! * 100)}%
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>);

};

export default Dashboard;