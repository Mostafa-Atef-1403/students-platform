import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Camera,
  Mic,
  Clock,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  CheckCircle,
  Send,
  Shield,
} from "lucide-react";
import { quizzes } from "@/data/mockData";
import { getQuestionsForQuiz, type QuizQuestion } from "@/data/quizQuestions";
import {
  sendProctoringFrame,
  startExamSession,
  submitExamSession,
  type ProctoringResult,
} from "@/services/proctoring";
import { addSubmission, markQuizCompleted } from "@/lib/examSubmissions";

// Backend exam ID is taken from the quiz's backendExamId field (set in mockData).
// Falls back to 4 only if somehow missing.

type QuizPhase = "permissions" | "exam" | "submitted";

const QuizTaking = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const quiz = quizzes.find((q) => q.id === quizId);
  // Resolve the real backend exam ID from the quiz definition; fall back to 4
  const BACKEND_EXAM_ID = quiz?.backendExamId ?? 4;
  const [phase, setPhase] = useState<QuizPhase>("permissions");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [proctoring, setProctoring] = useState<ProctoringResult | null>(null);
  const [examStudentId, setExamStudentId] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Load questions
  useEffect(() => {
    if (quiz) {
      const qs = getQuestionsForQuiz(
        quiz.id,
        quiz.subjectId,
        quiz.totalQuestions,
      );
      setQuestions(qs);
      setTimeLeft(quiz.duration * 60);
    }
  }, [quiz]);

  // Timer
  useEffect(() => {
    if (phase !== "exam" || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [phase, timeLeft]);

  // Attach camera to video element
  useEffect(() => {
    if (videoRef.current && cameraStream) {
      videoRef.current.srcObject = cameraStream;
    }
  }, [cameraStream, phase]);

  // AI Proctoring: capture & send a frame every 2 seconds during exam
  useEffect(() => {
    if (phase !== "exam" || !cameraStream || !quiz) return;

    const captureAndSend = async () => {
      const video = videoRef.current;
      if (!video || video.readyState < 2) return;

      if (!canvasRef.current)
        canvasRef.current = document.createElement("canvas");
      const canvas = canvasRef.current;
      // Use full native resolution so the AI models get a proper image
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob((b) => resolve(b), "image/jpeg", 0.85),
      );
      if (!blob) return;

      const studentId = parseInt(localStorage.getItem("userId") || "0", 10);
      const result = await sendProctoringFrame(
        blob,
        studentId,
        BACKEND_EXAM_ID,
      );
      if (result) setProctoring(result);
    };

    // Fire once immediately, then every .3 seconds
    captureAndSend();
    const interval = setInterval(captureAndSend, 300);
    return () => clearInterval(interval);
  }, [phase, cameraStream, quiz, BACKEND_EXAM_ID]);

  const requestPermissions = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setCameraStream(stream);

      // Start backend exam session so proctoring frames are accepted
      const sessionId = await startExamSession(BACKEND_EXAM_ID);
      if (sessionId) {
        setExamStudentId(sessionId);
      }

      setPhase("exam");
      toast({
        title: "Permissions granted",
        description: "Camera and microphone are active.",
      });
    } catch {
      toast({
        title: "Permission denied",
        description:
          "You must allow camera and microphone access to start the quiz.",
        variant: "destructive",
      });
    }
  };

  const handleAnswer = (questionId: string, optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmit = useCallback(() => {
    if (phase === "submitted") return;
    // Calculate score
    let correct = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) correct++;
    });
    setScore(correct);
    setPhase("submitted");
    setShowSubmitDialog(false);

    // Stop camera
    cameraStream?.getTracks().forEach((t) => t.stop());

    // Submit the backend exam session so violations are finalised and reports work
    if (examStudentId) {
      submitExamSession(examStudentId).catch(() => {
        // Non-fatal — local score is already recorded
      });
    }

    // Persist the submission so instructor view can show it, and mark the
    // quiz as completed for this student. Reset clears both.
    const userId = localStorage.getItem("userId") || "0";
    const studentName = localStorage.getItem("userName") || "Student";
    const studentEmail = localStorage.getItem("userEmail") || "";
    if (quiz) {
      addSubmission({
        id: `${userId}-${quiz.id}-${Date.now()}`,
        studentId: userId,
        studentName,
        studentEmail,
        quizId: quiz.id,
        examId: examStudentId ?? BACKEND_EXAM_ID,
        examName: quiz.title,
        subjectName: quiz.subjectName,
        score: correct,
        total: questions.length,
        percentage: Math.round((correct / questions.length) * 100),
        date: new Date().toISOString(),
      });
      markQuizCompleted(userId, quiz.id);
      // Clear any active reset flag so the completed status sticks.
      localStorage.removeItem(`examsReset_${userId}`);
    }

    toast({
      title: "Quiz submitted!",
      description: `You scored ${correct}/${questions.length}`,
    });
  }, [phase, questions, answers, cameraStream, quiz, toast, examStudentId]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const answeredCount = Object.keys(answers).length;
  const isTimeCritical = timeLeft < 60;

  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="p-8 text-center">
          <p className="text-lg font-medium">Quiz not found</p>
          <Button className="mt-4" onClick={() => navigate("/quizzes")}>
            Back to Quizzes
          </Button>
        </Card>
      </div>
    );
  }

  // PHASE 1: Permission request
  if (phase === "permissions") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="max-w-lg w-full">
          <CardContent className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold mb-2">{quiz.title}</h1>
              <p className="text-muted-foreground">{quiz.subjectName}</p>
            </div>

            <div className="text-left space-y-3 bg-muted/50 rounded-lg p-4">
              <p className="font-medium text-sm">Before you start:</p>
              <div className="flex items-center gap-3 text-sm">
                <Clock className="w-4 h-4 text-primary shrink-0" />
                <span>Duration: {quiz.duration} minutes</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                <span>{quiz.totalQuestions} questions</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Camera className="w-4 h-4 text-primary shrink-0" />
                <span>Camera access required (AI proctoring)</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mic className="w-4 h-4 text-primary shrink-0" />
                <span>Microphone access required (AI proctoring)</span>
              </div>
            </div>

            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
              <div className="flex items-center gap-2 text-sm text-destructive">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>AI anti-cheat system will monitor during the exam</span>
              </div>
            </div>

            <Button size="lg" className="w-full" onClick={requestPermissions}>
              <Camera className="w-4 h-4 mr-2" />
              Grant Access & Start Quiz
            </Button>
            <Button variant="ghost" onClick={() => navigate("/quizzes")}>
              Cancel
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // PHASE 3: Submitted
  if (phase === "submitted") {
    const percentage = Math.round((score! / questions.length) * 100);
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="max-w-lg w-full">
          <CardContent className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
            <h1 className="text-2xl font-bold">Quiz Completed!</h1>
            <p className="text-muted-foreground">
              {quiz.title} — {quiz.subjectName}
            </p>

            <div className="bg-muted/50 rounded-lg p-6 space-y-2">
              <p className="text-4xl font-bold">
                {score}/{questions.length}
              </p>
              <p className="text-lg text-muted-foreground">{percentage}%</p>
              <Badge
                className={
                  percentage >= 50
                    ? "bg-success/10 text-success"
                    : "bg-destructive/10 text-destructive"
                }
              >
                {percentage >= 50 ? "Passed" : "Failed"}
              </Badge>
            </div>

            <div className="text-sm text-muted-foreground">
              <p>
                Answered: {answeredCount}/{questions.length}
              </p>
            </div>

            <Button className="w-full" onClick={() => navigate("/quizzes")}>
              Back to Quizzes
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // PHASE 2: Exam
  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <div className="border-b bg-card px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Badge variant="outline">{quiz.subjectName}</Badge>
          <span className="font-semibold text-sm hidden sm:inline">
            {quiz.title}
          </span>
        </div>
        <div
          className={`flex items-center gap-2 font-mono text-lg font-bold ${isTimeCritical ? "text-destructive animate-pulse" : ""}`}
        >
          <Clock className="w-5 h-5" />
          {formatTime(timeLeft)}
        </div>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => setShowSubmitDialog(true)}
        >
          <Send className="w-4 h-4 mr-1" />
          Submit
        </Button>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-4 p-4 max-w-7xl mx-auto w-full">
        {/* Left: Camera feed */}
        <div className="lg:order-first order-first">
          <div className="sticky top-20 space-y-2">
            <div className="w-40 h-30 lg:w-48 lg:h-36 rounded-lg overflow-hidden border-2 border-primary/30 bg-black relative">
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-1 left-1 flex gap-1">
                <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
                <span className="text-[10px] text-white/80">LIVE</span>
              </div>
            </div>

            {/* AI Proctoring status chip — always visible during the exam.
                Turns red when the backend reports cheating or any violation;
                otherwise stays green so the UI doesn't look broken while the
                backend isn't responding yet. */}
            {(() => {
              const hasViolation = !!(
                proctoring &&
                (proctoring.cheating ||
                  proctoring.phone_detection?.violation ||
                  proctoring.person_detection?.violation ||
                  proctoring.eye_tracking?.violation ||
                  proctoring.head_pose?.violation ||
                  proctoring.face_detection?.violation)
              );

              if (hasViolation) {
                return (
                  <div className="w-40 lg:w-48 rounded-lg border border-destructive/40 bg-destructive/10 p-2 text-xs animate-fade-in">
                    <div className="flex items-center gap-1 text-destructive font-medium mb-1">
                      <AlertTriangle className="w-3 h-3" />
                      <span>Suspicious activity</span>
                    </div>
                    <p
                      className="text-[10px] text-muted-foreground truncate"
                      title={proctoring?.current_event}
                    >
                      {proctoring?.current_event || "Violation detected"}
                    </p>
                  </div>
                );
              }

              return (
                <div className="w-40 lg:w-48 rounded-lg border border-success/30 bg-success/5 p-2 text-[10px] text-success flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  <span>AI monitoring active</span>
                </div>
              );
            })()}
          </div>
        </div>

        {/* Center: Question */}
        <div className="flex-1 max-w-2xl">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <Badge variant="outline">
                  Question {currentQuestion + 1} of {questions.length}
                </Badge>
                {answers[currentQ?.id] !== undefined && (
                  <Badge className="bg-success/10 text-success">Answered</Badge>
                )}
              </div>

              <h2 className="text-lg font-semibold mb-6">
                {currentQ?.question}
              </h2>

              <RadioGroup
                value={answers[currentQ?.id]?.toString()}
                onValueChange={(val) =>
                  handleAnswer(currentQ.id, parseInt(val))
                }
                className="space-y-3"
              >
                {currentQ?.options.map((option, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center space-x-3 rounded-lg border p-4 cursor-pointer transition-colors ${
                      answers[currentQ.id] === idx
                        ? "border-primary bg-primary/5"
                        : "hover:bg-muted/50"
                    }`}
                    onClick={() => handleAnswer(currentQ.id, idx)}
                  >
                    <RadioGroupItem value={idx.toString()} id={`opt-${idx}`} />
                    <Label
                      htmlFor={`opt-${idx}`}
                      className="cursor-pointer flex-1"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              {/* Prev/Next buttons */}
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  disabled={currentQuestion === 0}
                  onClick={() => setCurrentQuestion((p) => p - 1)}
                >
                  <ChevronLeft className="w-4 h-4 mr-1" /> Previous
                </Button>
                <Button
                  disabled={currentQuestion === questions.length - 1}
                  onClick={() => setCurrentQuestion((p) => p + 1)}
                >
                  Next <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Question navigation */}
        <div className="lg:w-64">
          <Card className="sticky top-20">
            <CardContent className="p-4">
              <p className="text-sm font-medium mb-3">
                Progress: {answeredCount}/{questions.length}
              </p>

              {/* Navigation circles with connecting lines */}
              <div className="flex flex-wrap gap-0 justify-center">
                {questions.map((q, idx) => {
                  const isAnswered = answers[q.id] !== undefined;
                  const isCurrent = idx === currentQuestion;
                  return (
                    <div key={q.id} className="flex items-center">
                      <button
                        onClick={() => setCurrentQuestion(idx)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all border-2 ${
                          isCurrent
                            ? "border-primary bg-primary text-primary-foreground scale-110"
                            : isAnswered
                              ? "border-success bg-success/20 text-success"
                              : "border-muted-foreground/30 bg-muted text-muted-foreground"
                        }`}
                      >
                        {idx + 1}
                      </button>
                      {idx < questions.length - 1 && (
                        <div
                          className={`w-3 h-0.5 ${
                            isAnswered &&
                            answers[questions[idx + 1]?.id] !== undefined
                              ? "bg-success"
                              : "bg-muted-foreground/20"
                          }`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 space-y-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-success/20 border-2 border-success" />
                  Answered
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-muted border-2 border-muted-foreground/30" />
                  Not answered
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary border-2 border-primary" />
                  Current
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Submit confirmation dialog */}
      <Dialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit Quiz?</DialogTitle>
            <DialogDescription>
              You have answered {answeredCount} out of {questions.length}{" "}
              questions.
              {answeredCount < questions.length && (
                <span className="block mt-2 text-destructive">
                  ⚠ {questions.length - answeredCount} question(s) are
                  unanswered.
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowSubmitDialog(false)}
            >
              Continue Quiz
            </Button>
            <Button variant="destructive" onClick={handleSubmit}>
              Submit Quiz
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QuizTaking;
