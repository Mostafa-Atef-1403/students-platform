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
    Available: {
      icon: "bi bi-play text-green-500",
      quizzes: [
        {
          id: 1,
          title: "Network Protocols Quiz",
          subject: "",
          duration: "",
          questions: "",
          // situtional props
          date: "Jan 31, 8:00 AM",
          state: "Available",
        },
      ],
    },
  },
  {
    Upcoming: { id: 2, icon: "bi bi-calendar text-gray-500", quizzes: [{}] },
  },
  {
    Completed: {
      id: 3,
      icon: "bi bi-check-circle text-gray-500",
      quizzes: [{}],
    },
  },
  {
    Missed: { id: 4, icon: "bi bi-x-circle text-alert", quizzes: [{}] },
  },
];

//
