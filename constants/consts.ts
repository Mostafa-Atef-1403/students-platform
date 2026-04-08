// Students DB for testing
export const studentsDB = [
  {
    id: 1,
    firstName: "Ahmed",
    lastName: "Hassan",
    phone: "01012345678",
    email: "ahmed.hassan@example.com",
    password: "123456",
  },
  {
    id: 2,
    firstName: "Mona",
    lastName: "Ali",
    phone: "01198765432",
    email: "mona.ali@example.com",
    password: "password123",
  },
  {
    id: 3,
    firstName: "Youssef",
    lastName: "Mahmoud",
    phone: "01255588990",
    email: "youssef.mahmoud@example.com",
    password: "youssef2024",
  },
  {
    id: 4,
    firstName: "Sara",
    lastName: "Adel",
    phone: "01544422111",
    email: "sara.adel@example.com",
    password: "sara321",
  },
];

// sidebar nav links
export const sidebar_links = [
  { id: 1, link: `Dashboard`, icon: "bi-house-door" },
  { id: 2, link: `Subjects`, icon: "bi-book" },
  { id: 3, link: `Quizzes`, icon: "bi-question-circle" },
  { id: 4, link: `Attendance`, icon: "bi-calendar-check" },
  { id: 5, link: `Profile`, icon: "bi-person" },
];

export const instructor_links = [
  { id: 1, link: `Dashboard`, icon: "bi-house-door" },
  { id: 2, link: `Subjects`, icon: "bi-book" },
  { id: 3, link: `Quizzes`, icon: "bi-question-circle" },
  { id: 4, link: `Attendance`, icon: "bi-calendar-check" },
  { id: 5, link: `Profile`, icon: "bi-person" },
];

// Components Headers

export const headers = {
  dashboard: {
    h: "welcome ",
    p: "View academic progress overview for this semester.",
  },
  subjects: {
    h: "My Subjects",
    p: "Current semester courses and progress.",
  },
  attendance: {
    h: "Attendance",
    p: "Track your class attendance across all subjects.",
  },
  quizzes: {
    h: "Quizzes",
    p: "View and manage your personal information",
  },
  profile: {
    h: "My Profile",
    p: "View and manage your personal information",
  },
};

// personal and academic info

export const personalInfo = [
  {
    id: 1,
    label: "Full Name",
    value: "Mostafa Atef",
    icon: "bi bi-person",
  },
  {
    id: 2,
    label: "Email",
    value: "mostafa.atef@example.com",
    icon: "bi bi-envelope-at-fill",
  },
  {
    id: 3,
    label: "Phone Number",
    value: "01234567890",
    icon: "bi bi-telephone",
  },
  {
    id: 4,
    label: "National Id",
    value: "12345678901234",
    icon: "bi bi-person-vcard",
  },
  {
    id: 5,
    label: "Education",
    value: "Beni-suef",
    icon: "bi bi-mortarboard",
  },
  {
    id: 6,
    label: "Year",
    value: "Year 4",
    icon: "bi bi-book",
  },
];

export const academicInfo = [
  {
    id: 1,
    label: "GPA",
    icon: "bi bi-trophy text-green-500",
    value: "3.00",
  },
  {
    id: 2,
    label: "CGPA",
    icon: "bi bi-bar-chart",
    value: "3.00",
  },
  {
    id: 3,
    label: "Total Hours",
    icon: "bi bi-book",
    value: "120",
  },
  {
    id: 4,
    label: "Completed subjects",
    icon: "bi bi-mortarboard text-orange-400",
    value: "21",
  },
];

// exams&quizzes

export const quizzesPage = [
  {
    id: 1,
    icon: "bi bi-play text-green-500",
    type: "Available",
    quizzes: [
      {
        id: 1,
        title: "Network Protocols Quiz",
        subject: "Computer Networks",
        duration: "30 Minutes",
        questions: "15 Questions",
        date: "Jan 31, 8:00 AM",
        state: "Available",
        score: "",
      },
    ],
    bg: "bg-green-100",
  },
  {
    id: 2,
    icon: "bi bi-calendar2-check text-gray-500",
    type: "Upcoming",
    quizzes: [
      {
        id: 1,
        title: "Agile Methodology",
        subject: "Software Engineering",
        duration: "30 Minutes",
        questions: "15 Questions",
        date: "Feb 4, 1:00 PM",
        state: "Upcoming",
        score: "",
      },
      {
        id: 2,
        title: "SQL Fundamentals",
        subject: "Database Systems",
        duration: "40 Minutes",
        questions: "30 Questions",
        date: "Feb 4, 5:00 PM",
        state: "Upcoming",
        score: "",
      },
      {
        id: 3,
        title: "Network Protocols Quiz",
        subject: "Computer Networks",
        duration: "30 Minutes",
        questions: "20 Questions",
        date: "Feb 5, 10:30 AM",
        state: "Upcoming",
        score: "",
      },
    ],
    bg: "bg-gray-200",
  },
  {
    id: 3,
    icon: "bi bi-check-circle text-gray-500",
    type: "Completed",
    quizzes: [
      {
        id: 1,
        title: "Trees & Graphs Quiz",
        subject: "Data Structures",
        duration: "30 Minutes",
        questions: "20 Questions",
        date: "Jan 5, 10:30 AM",
        state: "Completed",
        score: "18/20",
      },
      {
        id: 2,
        title: "Sorting Algorithms",
        subject: "Data Structures",
        duration: "25 Minutes",
        questions: "20 Questions",
        date: "Jan 10, 11:00 AM",
        state: "Completed",
        score: "20/20",
      },
      {
        id: 3,
        title: "HTTP & REST APIs",
        subject: "Web Development",
        duration: "30 Minutes",
        questions: "18 Questions",
        date: "Jan 15, 9:00 AM",
        state: "Completed",
        score: "17/18",
      },
      {
        id: 4,
        title: "Normalization & ER Diagrams",
        subject: "Database Systems",
        duration: "35 Minutes",
        questions: "22 Questions",
        date: "Jan 20, 2:00 PM",
        state: "Completed",
        score: "20/22",
      },
    ],
    bg: "bg-gray-200",
  },
  {
    id: 4,
    icon: "bi bi-x-circle text-alert",
    type: "Missed",
    quizzes: [
      {
        id: 1,
        title: "Process Scheduling Quiz",
        subject: "Operating Systems",
        duration: "30 Minutes",
        questions: "15 Questions",
        date: "Jan 12, 8:00 AM",
        state: "Missed",
        score: "",
      },
    ],
    bg: "bg-red-100",
  },
];

//
