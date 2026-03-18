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
