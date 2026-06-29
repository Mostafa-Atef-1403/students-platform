import { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, BookOpen, Users, GraduationCap } from 'lucide-react';
import { platformCourses } from '@/data/adminMockData';

const statusColors: Record<string, string> = {
  active: 'bg-emerald-100 text-emerald-800',
  archived: 'bg-gray-100 text-gray-800',
  upcoming: 'bg-blue-100 text-blue-800',
};

const AdminCourses = () => {
  const [search, setSearch] = useState('');
  const [facultyFilter, setFacultyFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const faculties = [...new Set(platformCourses.map(c => c.faculty))];

  const filtered = platformCourses.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.code.toLowerCase().includes(search.toLowerCase());
    const matchFaculty = facultyFilter === 'all' || c.faculty === facultyFilter;
    const matchStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchSearch && matchFaculty && matchStatus;
  });

  const totalEnrolled = filtered.reduce((sum, c) => sum + c.enrolledStudents, 0);

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Course Management</h1>
            <p className="text-muted-foreground">Manage all courses across faculties</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" /> Add Course
          </Button>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="glass-card">
            <CardContent className="p-4 flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-primary" />
              <div>
                <p className="text-2xl font-bold text-foreground">{filtered.length}</p>
                <p className="text-xs text-muted-foreground">Courses</p>
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-4 flex items-center gap-3">
              <Users className="w-8 h-8 text-emerald-600" />
              <div>
                <p className="text-2xl font-bold text-foreground">{totalEnrolled}</p>
                <p className="text-xs text-muted-foreground">Enrolled</p>
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-4 flex items-center gap-3">
              <GraduationCap className="w-8 h-8 text-amber-600" />
              <div>
                <p className="text-2xl font-bold text-foreground">{faculties.length}</p>
                <p className="text-xs text-muted-foreground">Faculties</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search by name or code..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
              </div>
              <Select value={facultyFilter} onValueChange={setFacultyFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Faculty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Faculties</SelectItem>
                  {faculties.map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card className="glass-card">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead className="hidden sm:table-cell">Faculty</TableHead>
                  <TableHead>Instructor</TableHead>
                  <TableHead className="hidden md:table-cell">Credits</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">{course.name}</p>
                        <p className="text-xs text-muted-foreground">{course.code} · {course.semester}</p>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-sm">{course.faculty}</TableCell>
                    <TableCell className="text-sm">{course.instructor}</TableCell>
                    <TableCell className="hidden md:table-cell text-sm">{course.credits}</TableCell>
                    <TableCell className="text-sm font-medium">{course.enrolledStudents}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${statusColors[course.status]}`}>
                        {course.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminCourses;
