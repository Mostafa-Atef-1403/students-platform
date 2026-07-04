const BASE_URL = "https://examify.runasp.net";

// ── Exam Session ─────────────────────────────────────────────────────────────

export interface StartExamResponse {
  examStudentId: number;
  [key: string]: unknown;
}

// Try to extract an examStudentId from whatever shape the backend returns
function extractSessionId(data: unknown): number | null {
  if (data == null) return null;
  if (typeof data === "number") return data;
  if (typeof data === "object") {
    const d = data as Record<string, unknown>;
    const v = d.examStudentId ?? d.ExamStudentId ?? d.id ?? d.Id ?? d.sessionId;
    if (typeof v === "number") return v;
    if (typeof v === "string") {
      const n = parseInt(v, 10);
      return isNaN(n) ? null : n;
    }
  }
  return null;
}

// Fetch all student results and find the most recent session for this exam.
// Used as a fallback when start/ returns 400 (session already exists).
async function getExistingSessionId(examId: number): Promise<number | null> {
  try {
    const res = await fetch(
      `${BASE_URL}/api/student-exams/results/my-results`,
      {
        headers: authHeaders(),
      },
    );
    if (!res.ok) return null;
    const data = await res.json();
    // data is expected to be an array of result objects
    const list: Record<string, unknown>[] = Array.isArray(data)
      ? data
      : (data?.items ?? data?.data ?? []);
    // Find entries matching this examId, pick the most recent (highest id)
    const matches = list.filter((r) => {
      const eid = r.examId ?? r.ExamId;
      return Number(eid) === examId;
    });
    if (matches.length === 0) return null;
    // Sort descending by examStudentId / id
    matches.sort((a, b) => {
      const aId = Number(a.examStudentId ?? a.ExamStudentId ?? a.id ?? 0);
      const bId = Number(b.examStudentId ?? b.ExamStudentId ?? b.id ?? 0);
      return bId - aId;
    });
    return extractSessionId(matches[0]);
  } catch {
    return null;
  }
}

export async function startExamSession(examId: number): Promise<number | null> {
  try {
    const res = await fetch(`${BASE_URL}/api/student-exams/start/${examId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders(),
      },
    });
    if (res.ok) {
      const data = await res.json();
      return extractSessionId(data);
    }
    // 400 usually means a session already exists — fall back to fetching it
    if (res.status === 400) {
      return await getExistingSessionId(examId);
    }
    return null;
  } catch {
    return null;
  }
}

export async function submitExamSession(
  examStudentId: number,
): Promise<boolean> {
  try {
    const res = await fetch(
      `${BASE_URL}/api/student-exams/${examStudentId}/submit`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders(),
        },
      },
    );
    return res.ok;
  } catch {
    return false;
  }
}

// ── Proctoring ────────────────────────────────────────────────────────────────

export interface ProctoringResult {
  cheating: boolean;
  student_id: string;
  exam_id: string;
  phone_detection: {
    detected: boolean;
    confidence: number;
    timer_seconds: number;
    violation: boolean;
  };
  person_detection: {
    person_count: number;
    timer_seconds: number;
    violation: boolean;
  };
  eye_tracking: {
    status: string;
    timer_seconds: number;
    threshold_seconds: number;
    violation: boolean;
  };
  head_pose: { status: string; violation: boolean };
  face_detection: {
    face_present: boolean;
    timer_seconds: number;
    threshold_seconds: number;
    violation: boolean;
  };
  current_event: string;
  session: { suspicious_time: number; total_score: number; risk_level: string };
  timestamp: string;
}

function authHeaders(): HeadersInit {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// OLD WAY OF PROCTORING

// export async function sendProctoringFrame(
//   blob: Blob,
//   studentId: number,
//   examId: number,
// ): Promise<ProctoringResult | null> {
//   try {
//     const formData = new FormData();
//     formData.append("Frame", blob, "frame.jpg");
//     formData.append("StudentId", String(studentId));
//     formData.append("ExamId", String(examId));

//     const res = await fetch(`${BASE_URL}/api/Proctoring/frame`, {
//       method: "POST",
//       headers: authHeaders(),
//       body: formData,
//     });
//     if (!res.ok) return null;
//     return (await res.json()) as ProctoringResult;
//   } catch {
//     return null;
//   }
// }

// WEBSOCKET PROCTORING

// ── WebSocket Proctoring ──────────────────────────────────────────────────────

const WS_URL = "wss://examify.runasp.net/ws/proctoring/frame";

let ws: WebSocket | null = null;
let wsReady = false;
let pendingResultCallback: ((result: ProctoringResult) => void) | null = null;

export function openProctoringSocket(
  studentId: number,
  examId: number,
  onResult: (result: ProctoringResult) => void,
): void {
  if (
    ws &&
    (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)
  ) {
    pendingResultCallback = onResult;
    return;
  }

  const token = localStorage.getItem("token") ?? "";
  const url = `${WS_URL}?token=${token}&student_id=${studentId}&exam_id=${examId}`;
  ws = new WebSocket(url);
  wsReady = false;
  pendingResultCallback = onResult;

  ws.onopen = () => {
    wsReady = true;
    console.log("[Proctoring WS] Connected");
  };

  ws.onmessage = (event) => {
    try {
      const result = JSON.parse(event.data) as ProctoringResult;
      pendingResultCallback?.(result);
    } catch {
      // ignore non-JSON messages
    }
  };

  ws.onerror = (e) => console.warn("[Proctoring WS] Error", e);

  ws.onclose = () => {
    wsReady = false;
    ws = null;
    console.log("[Proctoring WS] Closed");
  };
}

export function sendFrameOverSocket(blob: Blob): void {
  if (!ws || !wsReady) {
    console.warn("[Proctoring WS] Not ready, skipping frame");
    return;
  }
  ws.send(blob);
}

export function closeProctoringSocket(): void {
  ws?.close();
  ws = null;
  wsReady = false;
}

// =========================================

export async function fetchExamReportText(
  examId: number,
  studentId: number,
): Promise<string> {
  const res = await fetch(
    `${BASE_URL}/api/Reports/exam/${examId}/student/${studentId}/report/txt`,
    { headers: authHeaders() },
  );
  if (!res.ok) throw new Error("Failed to fetch report");
  return await res.text();
}

export async function downloadExamReportExcel(examId: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/api/Reports/exam/${examId}/excel`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to download excel report");
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `exam-${examId}-report.xlsx`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
