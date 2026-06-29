import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { clearQuizStatus, clearSubmissionsForStudent } from "@/lib/examSubmissions";

/**
 * Temporary dev-only button to reset the current student's exam history
 * so all exams appear as "not started" again and can be retaken.
 */
const DevResetExams = () => {
  const { toast } = useToast();

  const handleReset = () => {
    // Generic keys (legacy)
    const keysToRemove = [
      "completedQuizzes",
      "quizProgress",
      "quizResults",
      "examProgress",
      "examResults",
    ];
    keysToRemove.forEach((k) => localStorage.removeItem(k));

    // Per-user / per-quiz keys
    Object.keys(localStorage).forEach((k) => {
      if (k.startsWith("quiz_") || k.startsWith("exam_")) {
        localStorage.removeItem(k);
      }
    });

    // Flag the current student so the Quizzes page treats all
    // completed/missed exams as available again.
    const userId = localStorage.getItem("userId");
    if (userId) {
      localStorage.setItem(`examsReset_${userId}`, "1");
      clearQuizStatus(userId);
      clearSubmissionsForStudent(userId);
    }

    toast({
      title: "Exams reset",
      description: "All your exams are now available again.",
    });

    // Reload so the quiz list re-renders with the reset applied.
    setTimeout(() => window.location.reload(), 400);
  };

  return (
    <Button
      onClick={handleReset}
      variant="outline"
      size="sm"
      className="fixed bottom-4 right-4 z-[100] shadow-lg bg-background/80 backdrop-blur border-dashed"
      title="Dev only: resets your exam history"
    >
      <RotateCcw className="w-3 h-3 mr-1" />
      Reset My Exams
    </Button>
  );
};

export default DevResetExams;
