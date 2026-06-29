// Shared store for student exam submissions + per-student quiz status overrides.
// Backed by localStorage only (no backend persistence yet).

export interface ExamSubmission {
  id: string;            // unique row id
  studentId: string;     // from localStorage userId
  studentName: string;
  studentEmail: string;
  quizId: string;
  examId: number;        // backend exam id — matches quiz.backendExamId
  examName: string;
  subjectName: string;
  score: number;
  total: number;
  percentage: number;
  date: string;          // ISO
}

const SUBMISSIONS_KEY = 'examSubmissions';

export function getSubmissions(): ExamSubmission[] {
  try {
    const raw = localStorage.getItem(SUBMISSIONS_KEY);
    return raw ? (JSON.parse(raw) as ExamSubmission[]) : [];
  } catch {
    return [];
  }
}

export function addSubmission(sub: ExamSubmission) {
  const all = getSubmissions();
  all.push(sub);
  localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(all));
}

export function clearSubmissionsForStudent(studentId: string) {
  const remaining = getSubmissions().filter((s) => s.studentId !== studentId);
  localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(remaining));
}

export function clearAllSubmissions() {
  localStorage.removeItem(SUBMISSIONS_KEY);
}

// Per-student per-quiz status override ("completed")
export function quizStatusKey(userId: string) {
  return `quizStatus_${userId}`;
}

export function getQuizStatusMap(userId: string): Record<string, 'completed'> {
  try {
    const raw = localStorage.getItem(quizStatusKey(userId));
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function markQuizCompleted(userId: string, quizId: string) {
  const map = getQuizStatusMap(userId);
  map[quizId] = 'completed';
  localStorage.setItem(quizStatusKey(userId), JSON.stringify(map));
}

export function clearQuizStatus(userId: string) {
  localStorage.removeItem(quizStatusKey(userId));
}
