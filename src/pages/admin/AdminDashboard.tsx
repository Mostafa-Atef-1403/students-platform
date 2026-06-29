import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookOpen, ClipboardList, GraduationCap, TrendingUp, BarChart3 } from 'lucide-react';
import { platformStats, enrollmentTrend, facultyDistribution } from '@/data/adminMockData';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const statCards = [
  { title: 'Total Students', value: platformStats.totalStudents.toLocaleString(), icon: Users, color: 'text-primary' },
  { title: 'Instructors', value: platformStats.totalInstructors, icon: GraduationCap, color: 'text-emerald-600' },
  { title: 'Active Courses', value: platformStats.totalCourses, icon: BookOpen, color: 'text-amber-600' },
  { title: 'Active Quizzes', value: platformStats.activeQuizzes, icon: ClipboardList, color: 'text-violet-600' },
  { title: 'Avg Attendance', value: `${platformStats.avgAttendance}%`, icon: TrendingUp, color: 'text-cyan-600' },
  { title: 'Platform GPA', value: platformStats.avgGPA.toFixed(1), icon: BarChart3, color: 'text-rose-600' },
];

const PIE_COLORS = ['hsl(216, 19%, 26%)', 'hsl(142, 76%, 36%)', 'hsl(38, 92%, 50%)', 'hsl(262, 60%, 50%)', 'hsl(200, 60%, 50%)'];

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">Platform overview and management</p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {statCards.map((stat) => (
            <Card key={stat.title} className="glass-card">
              <CardContent className="p-4 text-center">
                <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Enrollment Trend */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg">Enrollment Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={enrollmentTrend}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="students" stroke="hsl(216, 19%, 26%)" fill="hsl(216, 19%, 26%)" fillOpacity={0.2} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Faculty Distribution */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg">Students by Faculty</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie data={facultyDistribution} cx="50%" cy="50%" outerRadius={90} dataKey="value" nameKey="name" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                    {facultyDistribution.map((_, index) => (
                      <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
