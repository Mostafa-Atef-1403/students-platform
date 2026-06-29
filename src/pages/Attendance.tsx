import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Calendar, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { attendanceRecords } from '@/data/mockData';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';

const Attendance = () => {
  const totalClasses = attendanceRecords.reduce((acc, r) => acc + r.totalClasses, 0);
  const totalAttended = attendanceRecords.reduce((acc, r) => acc + r.attended, 0);
  const overallPercentage = Math.round((totalAttended / totalClasses) * 100);

  const getAttendanceStatus = (percentage: number) => {
    if (percentage >= 90) return { label: 'Excellent', color: 'bg-success/10 text-success', icon: CheckCircle };
    if (percentage >= 75) return { label: 'Good', color: 'bg-primary/10 text-primary', icon: CheckCircle };
    if (percentage >= 60) return { label: 'Warning', color: 'bg-warning/10 text-warning', icon: AlertCircle };
    return { label: 'Critical', color: 'bg-destructive/10 text-destructive', icon: XCircle };
  };

  const pieData = [
    { name: 'Attended', value: totalAttended, color: 'hsl(var(--success))' },
    { name: 'Missed', value: totalClasses - totalAttended, color: 'hsl(var(--destructive))' },
  ];

  return (
    <DashboardLayout>
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold mb-2">Attendance</h1>
        <p className="text-muted-foreground">
          Track your class attendance across all subjects
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="animate-fade-in">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Classes</p>
              <p className="text-2xl font-bold">{totalClasses}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="animate-fade-in" style={{ animationDelay: '100ms' }}>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Attended</p>
              <p className="text-2xl font-bold">{totalAttended}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="animate-fade-in" style={{ animationDelay: '200ms' }}>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
              <XCircle className="w-6 h-6 text-destructive" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Missed</p>
              <p className="text-2xl font-bold">{totalClasses - totalAttended}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="animate-fade-in" style={{ animationDelay: '300ms' }}>
          <CardContent className="p-4 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl ${getAttendanceStatus(overallPercentage).color} flex items-center justify-center`}>
              {(() => {
                const StatusIcon = getAttendanceStatus(overallPercentage).icon;
                return <StatusIcon className="w-6 h-6" />;
              })()}
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Overall</p>
              <p className="text-2xl font-bold">{overallPercentage}%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Table */}
        <Card className="lg:col-span-2 animate-fade-in" style={{ animationDelay: '400ms' }}>
          <CardHeader>
            <CardTitle>Subject-wise Attendance</CardTitle>
            <CardDescription>Detailed breakdown by subject</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject</TableHead>
                  <TableHead className="text-center">Attended</TableHead>
                  <TableHead className="text-center">Total</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendanceRecords.map((record) => {
                  const status = getAttendanceStatus(record.percentage);
                  return (
                    <TableRow key={record.subjectId}>
                      <TableCell className="font-medium">{record.subjectName}</TableCell>
                      <TableCell className="text-center">{record.attended}</TableCell>
                      <TableCell className="text-center">{record.totalClasses}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={record.percentage} className="h-2 flex-1" />
                          <span className="text-sm text-muted-foreground w-12">
                            {record.percentage}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge className={status.color}>{status.label}</Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card className="animate-fade-in" style={{ animationDelay: '500ms' }}>
          <CardHeader>
            <CardTitle>Attendance Overview</CardTitle>
            <CardDescription>Visual breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            <div className="text-center mt-4">
              <p className="text-3xl font-bold">{overallPercentage}%</p>
              <p className="text-sm text-muted-foreground">Overall Attendance</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Attendance;
