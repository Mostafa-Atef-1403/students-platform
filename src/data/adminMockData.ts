export interface PlatformUser {
  id: string;
  name: string;
  nationalId: string;
  email: string;
  role: 'student' | 'instructor' | 'admin';
  faculty: string;
  status: 'active' | 'suspended' | 'inactive';
  joinedDate: string;
  lastLogin?: string;
}

export interface PlatformCourse {
  id: string;
  name: string;
  code: string;
  credits: number;
  faculty: string;
  instructor: string;
  enrolledStudents: number;
  status: 'active' | 'archived' | 'upcoming';
  semester: string;
}

export interface PlatformStats {
  totalStudents: number;
  totalInstructors: number;
  totalCourses: number;
  activeQuizzes: number;
  avgAttendance: number;
  avgGPA: number;
}

export const platformStats: PlatformStats = {
  totalStudents: 1248,
  totalInstructors: 56,
  totalCourses: 124,
  activeQuizzes: 18,
  avgAttendance: 86,
  avgGPA: 3.2,
};

export const platformUsers: PlatformUser[] = [
  { id: 'u1', name: 'Ahmed Mohamed', nationalId: '12345678901234', email: 'ahmed.mohamed@university.edu', role: 'student', faculty: 'Computer Science', status: 'active', joinedDate: '2024-09-01', lastLogin: '2026-04-03' },
  { id: 'u2', name: 'Sara Hassan', nationalId: '98765432109876', email: 'sara.hassan@university.edu', role: 'student', faculty: 'Engineering', status: 'active', joinedDate: '2024-09-01', lastLogin: '2026-04-02' },
  { id: 'u3', name: 'Dr. Ahmed Hassan', nationalId: '11111111111111', email: 'ahmed.hassan@university.edu', role: 'instructor', faculty: 'Computer Science', status: 'active', joinedDate: '2022-01-15', lastLogin: '2026-04-04' },
  { id: 'u4', name: 'Omar Khaled', nationalId: '11223344556677', email: 'omar.khaled@university.edu', role: 'student', faculty: 'Computer Science', status: 'active', joinedDate: '2025-02-01', lastLogin: '2026-04-01' },
  { id: 'u5', name: 'Fatma Ali', nationalId: '22334455667788', email: 'fatma.ali@university.edu', role: 'student', faculty: 'Engineering', status: 'suspended', joinedDate: '2024-09-01', lastLogin: '2026-03-15' },
  { id: 'u6', name: 'Dr. Mona Saleh', nationalId: '77889900112233', email: 'mona.saleh@university.edu', role: 'instructor', faculty: 'Mathematics', status: 'active', joinedDate: '2021-08-20', lastLogin: '2026-04-04' },
  { id: 'u7', name: 'Youssef Ibrahim', nationalId: '33445566778899', email: 'youssef.ibrahim@university.edu', role: 'student', faculty: 'Business', status: 'inactive', joinedDate: '2023-09-01', lastLogin: '2025-12-10' },
  { id: 'u8', name: 'Dr. Hassan Tarek', nationalId: '88990011223344', email: 'hassan.tarek@university.edu', role: 'instructor', faculty: 'Engineering', status: 'active', joinedDate: '2020-03-01', lastLogin: '2026-04-03' },
  { id: 'u9', name: 'Nour Adel', nationalId: '44556677889900', email: 'nour.adel@university.edu', role: 'student', faculty: 'Computer Science', status: 'active', joinedDate: '2025-02-01', lastLogin: '2026-04-04' },
  { id: 'u10', name: 'Mona Samir', nationalId: '66778899001122', email: 'mona.samir@university.edu', role: 'student', faculty: 'Mathematics', status: 'active', joinedDate: '2024-09-01', lastLogin: '2026-04-02' },
];

export const platformCourses: PlatformCourse[] = [
  { id: 'pc1', name: 'Data Structures & Algorithms', code: 'CS301', credits: 4, faculty: 'Computer Science', instructor: 'Dr. Ahmed Hassan', enrolledStudents: 45, status: 'active', semester: 'Spring 2026' },
  { id: 'pc2', name: 'Operating Systems', code: 'CS305', credits: 3, faculty: 'Computer Science', instructor: 'Dr. Ahmed Hassan', enrolledStudents: 38, status: 'active', semester: 'Spring 2026' },
  { id: 'pc3', name: 'Machine Learning', code: 'CS401', credits: 3, faculty: 'Computer Science', instructor: 'Dr. Ahmed Hassan', enrolledStudents: 30, status: 'active', semester: 'Spring 2026' },
  { id: 'pc4', name: 'Calculus II', code: 'MATH201', credits: 4, faculty: 'Mathematics', instructor: 'Dr. Mona Saleh', enrolledStudents: 60, status: 'active', semester: 'Spring 2026' },
  { id: 'pc5', name: 'Linear Algebra', code: 'MATH301', credits: 3, faculty: 'Mathematics', instructor: 'Dr. Mona Saleh', enrolledStudents: 42, status: 'active', semester: 'Spring 2026' },
  { id: 'pc6', name: 'Circuit Analysis', code: 'ENG201', credits: 4, faculty: 'Engineering', instructor: 'Dr. Hassan Tarek', enrolledStudents: 50, status: 'active', semester: 'Spring 2026' },
  { id: 'pc7', name: 'Thermodynamics', code: 'ENG301', credits: 3, faculty: 'Engineering', instructor: 'Dr. Hassan Tarek', enrolledStudents: 35, status: 'active', semester: 'Spring 2026' },
  { id: 'pc8', name: 'Database Systems', code: 'CS302', credits: 3, faculty: 'Computer Science', instructor: 'Dr. Ahmed Hassan', enrolledStudents: 0, status: 'upcoming', semester: 'Fall 2026' },
];

export const enrollmentTrend = [
  { month: 'Sep', students: 980 },
  { month: 'Oct', students: 1050 },
  { month: 'Nov', students: 1100 },
  { month: 'Dec', students: 1080 },
  { month: 'Jan', students: 1150 },
  { month: 'Feb', students: 1200 },
  { month: 'Mar', students: 1230 },
  { month: 'Apr', students: 1248 },
];

export const facultyDistribution = [
  { name: 'Computer Science', value: 420 },
  { name: 'Engineering', value: 350 },
  { name: 'Mathematics', value: 210 },
  { name: 'Business', value: 168 },
  { name: 'Others', value: 100 },
];
