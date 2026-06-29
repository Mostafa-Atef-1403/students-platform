export interface Course {
  id: string;
  name: string;
  code: string;
  credits: number;
  schedule: string;
  enrolledStudents: number;
  avgAttendance: number;
  avgGrade: number;
}

export interface StudentRecord {
  id: string;
  name: string;
  nationalId: string;
  courseId: string;
  courseName: string;
  attendance: number;
  quizAvg: number;
  midterm?: number;
  final?: number;
  grade?: string;
}

export interface InstructorQuiz {
  id: string;
  title: string;
  courseId: string;
  courseName: string;
  status: 'draft' | 'published' | 'active' | 'closed';
  duration: number;
  totalQuestions: number;
  startTime?: string;
  endTime?: string;
  submissions?: number;
  avgScore?: number;
}

export const instructorCourses: Course[] = [
  {
    id: 'cs301',
    name: 'Data Structures & Algorithms',
    code: 'CS301',
    credits: 4,
    schedule: 'Sun, Tue 10:00 AM',
    enrolledStudents: 45,
    avgAttendance: 88,
    avgGrade: 78,
  },
  {
    id: 'cs305',
    name: 'Operating Systems',
    code: 'CS305',
    credits: 3,
    schedule: 'Mon, Wed 12:00 PM',
    enrolledStudents: 38,
    avgAttendance: 82,
    avgGrade: 72,
  },
  {
    id: 'cs401',
    name: 'Machine Learning',
    code: 'CS401',
    credits: 3,
    schedule: 'Tue, Thu 2:00 PM',
    enrolledStudents: 30,
    avgAttendance: 91,
    avgGrade: 85,
  },
];

export const studentRecords: StudentRecord[] = [
  { id: 's1', name: 'Ahmed Mohamed', nationalId: '12345678901234', courseId: 'cs301', courseName: 'CS301', attendance: 92, quizAvg: 85, midterm: 78, grade: 'A-' },
  { id: 's2', name: 'Sara Hassan', nationalId: '98765432109876', courseId: 'cs301', courseName: 'CS301', attendance: 88, quizAvg: 92, midterm: 90, grade: 'A' },
  { id: 's3', name: 'Omar Khaled', nationalId: '11223344556677', courseId: 'cs301', courseName: 'CS301', attendance: 75, quizAvg: 68, midterm: 65, grade: 'B' },
  { id: 's4', name: 'Fatma Ali', nationalId: '22334455667788', courseId: 'cs301', courseName: 'CS301', attendance: 95, quizAvg: 90, midterm: 88, grade: 'A' },
  { id: 's5', name: 'Youssef Ibrahim', nationalId: '33445566778899', courseId: 'cs305', courseName: 'CS305', attendance: 80, quizAvg: 72, midterm: 70, grade: 'B+' },
  { id: 's6', name: 'Nour Adel', nationalId: '44556677889900', courseId: 'cs305', courseName: 'CS305', attendance: 90, quizAvg: 88, midterm: 82, grade: 'A-' },
  { id: 's7', name: 'Hassan Tarek', nationalId: '55667788990011', courseId: 'cs401', courseName: 'CS401', attendance: 93, quizAvg: 95, midterm: 92, grade: 'A+' },
  { id: 's8', name: 'Mona Samir', nationalId: '66778899001122', courseId: 'cs401', courseName: 'CS401', attendance: 87, quizAvg: 78, midterm: 75, grade: 'B+' },
];

export const instructorQuizzes: InstructorQuiz[] = [
  { id: 'iq1', title: 'Trees & Graphs Quiz', courseId: 'cs301', courseName: 'Data Structures', status: 'closed', duration: 30, totalQuestions: 20, submissions: 42, avgScore: 82 },
  { id: 'iq2', title: 'Sorting Algorithms', courseId: 'cs301', courseName: 'Data Structures', status: 'active', duration: 25, totalQuestions: 15, startTime: '2026-03-31T08:00:00', endTime: '2026-04-02T23:59:00', submissions: 28 },
  { id: 'iq3', title: 'Process Scheduling', courseId: 'cs305', courseName: 'Operating Systems', status: 'published', duration: 40, totalQuestions: 20, startTime: '2026-04-05T09:00:00', endTime: '2026-04-05T23:59:00' },
  { id: 'iq4', title: 'Memory Management', courseId: 'cs305', courseName: 'Operating Systems', status: 'draft', duration: 35, totalQuestions: 18 },
  { id: 'iq5', title: 'Neural Networks Basics', courseId: 'cs401', courseName: 'Machine Learning', status: 'closed', duration: 45, totalQuestions: 25, submissions: 29, avgScore: 88 },
  { id: 'iq6', title: 'Regression Models', courseId: 'cs401', courseName: 'Machine Learning', status: 'published', duration: 30, totalQuestions: 15, startTime: '2026-04-08T10:00:00', endTime: '2026-04-08T18:00:00' },
];

export const coursePerformance = [
  { month: 'Jan', cs301: 75, cs305: 70, cs401: 82 },
  { month: 'Feb', cs301: 78, cs305: 73, cs401: 85 },
  { month: 'Mar', cs301: 80, cs305: 76, cs401: 88 },
  { month: 'Apr', cs301: 82, cs305: 78, cs401: 90 },
];
