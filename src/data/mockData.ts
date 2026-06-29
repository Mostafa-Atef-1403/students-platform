// Mock data for the student dashboard

export interface Subject {
  id: string;
  name: string;
  code: string;
  credits: number;
  professor: string;
  schedule: string;
  progress: number;
  grade?: string;
}

export interface AttendanceRecord {
  subjectId: string;
  subjectName: string;
  totalClasses: number;
  attended: number;
  percentage: number;
}

export interface Quiz {
  id: string;
  title: string;
  subjectId: string;
  subjectName: string;
  status: 'upcoming' | 'available' | 'completed' | 'missed';
  startTime?: string;
  endTime?: string;
  duration: number; // in minutes
  totalQuestions: number;
  score?: number;
  maxScore?: number;
  attemptedAt?: string;
  /** Maps this quiz to its real exam ID in the backend database */
  backendExamId?: number;
}

export const subjects: Subject[] = [
  {
    id: 'cs301',
    name: 'Data Structures & Algorithms',
    code: 'CS301',
    credits: 4,
    professor: 'Dr. Ahmed Hassan',
    schedule: 'Sun, Tue 10:00 AM',
    progress: 65,
    grade: 'A-',
  },
  {
    id: 'cs302',
    name: 'Database Systems',
    code: 'CS302',
    credits: 3,
    professor: 'Dr. Fatma Ali',
    schedule: 'Mon, Wed 2:00 PM',
    progress: 78,
    grade: 'B+',
  },
  {
    id: 'cs303',
    name: 'Computer Networks',
    code: 'CS303',
    credits: 3,
    professor: 'Dr. Omar Khalil',
    schedule: 'Tue, Thu 12:00 PM',
    progress: 45,
  },
  {
    id: 'cs304',
    name: 'Software Engineering',
    code: 'CS304',
    credits: 3,
    professor: 'Dr. Sara Mohamed',
    schedule: 'Mon, Wed 10:00 AM',
    progress: 82,
    grade: 'A',
  },
  {
    id: 'math201',
    name: 'Linear Algebra',
    code: 'MATH201',
    credits: 3,
    professor: 'Dr. Hany Ibrahim',
    schedule: 'Sun, Thu 8:00 AM',
    progress: 55,
    grade: 'B',
  },
];

export const attendanceRecords: AttendanceRecord[] = [
  { subjectId: 'cs301', subjectName: 'Data Structures & Algorithms', totalClasses: 24, attended: 22, percentage: 92 },
  { subjectId: 'cs302', subjectName: 'Database Systems', totalClasses: 20, attended: 18, percentage: 90 },
  { subjectId: 'cs303', subjectName: 'Computer Networks', totalClasses: 18, attended: 14, percentage: 78 },
  { subjectId: 'cs304', subjectName: 'Software Engineering', totalClasses: 22, attended: 21, percentage: 95 },
  { subjectId: 'math201', subjectName: 'Linear Algebra', totalClasses: 20, attended: 17, percentage: 85 },
];

export const quizzes: Quiz[] = [
  {
    id: 'q1',
    title: 'Trees & Graphs Quiz',
    subjectId: 'cs301',
    subjectName: 'Data Structures',
    status: 'completed',
    duration: 30,
    totalQuestions: 20,
    score: 18,
    maxScore: 20,
    attemptedAt: '2026-01-25',
    backendExamId: 1,
  },
  {
    id: 'q2',
    title: 'SQL Fundamentals',
    subjectId: 'cs302',
    subjectName: 'Database Systems',
    status: 'completed',
    duration: 45,
    totalQuestions: 25,
    score: 22,
    maxScore: 25,
    attemptedAt: '2026-01-20',
    backendExamId: 2,
  },
  {
    id: 'q3',
    title: 'Network Protocols Quiz',
    subjectId: 'cs303',
    subjectName: 'Computer Networks',
    status: 'available',
    startTime: '2026-01-31T08:00:00',
    endTime: '2026-02-01T23:59:00',
    duration: 40,
    totalQuestions: 20,
    backendExamId: 3,
  },
  {
    id: 'q4',
    title: 'Agile Methodology',
    subjectId: 'cs304',
    subjectName: 'Software Engineering',
    status: 'available',
    startTime: '2026-01-31T10:00:00',
    endTime: '2026-02-02T18:00:00',
    duration: 30,
    totalQuestions: 15,
    backendExamId: 4,
  },
  {
    id: 'q5',
    title: 'Matrix Operations',
    subjectId: 'math201',
    subjectName: 'Linear Algebra',
    status: 'upcoming',
    startTime: '2026-02-05T09:00:00',
    endTime: '2026-02-05T23:59:00',
    duration: 60,
    totalQuestions: 30,
    backendExamId: 5,
  },
  {
    id: 'q6',
    title: 'Sorting Algorithms',
    subjectId: 'cs301',
    subjectName: 'Data Structures',
    status: 'missed',
    duration: 25,
    totalQuestions: 15,
    backendExamId: 6,
  },
];

export const weeklyProgress = [
  { day: 'Mon', quizzes: 2, hours: 3 },
  { day: 'Tue', quizzes: 1, hours: 2 },
  { day: 'Wed', quizzes: 3, hours: 4 },
  { day: 'Thu', quizzes: 0, hours: 1 },
  { day: 'Fri', quizzes: 2, hours: 3 },
  { day: 'Sat', quizzes: 1, hours: 2 },
  { day: 'Sun', quizzes: 0, hours: 1 },
];

export const gradeDistribution = [
  { grade: 'A', count: 2, color: 'hsl(var(--success))' },
  { grade: 'B', count: 2, color: 'hsl(var(--primary))' },
  { grade: 'C', count: 1, color: 'hsl(var(--warning))' },
];
