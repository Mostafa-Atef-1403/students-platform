import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Clock,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
  Play,
  Trophy,
  HelpCircle,
} from 'lucide-react';
import { quizzes, type Quiz } from '@/data/mockData';
import { format, parseISO } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { getQuizStatusMap, getSubmissions } from '@/lib/examSubmissions';


const Quizzes = () => {
  const navigate = useNavigate();

  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
  const wasReset = !!userId && localStorage.getItem(`examsReset_${userId}`) === '1';
  const statusMap = userId ? getQuizStatusMap(userId) : {};
  const submissions = userId ? getSubmissions().filter((s) => s.studentId === userId) : [];
  const lastSubmissionFor = (quizId: string) =>
    [...submissions].reverse().find((s) => s.quizId === quizId);

  const mergedQuizzes: Quiz[] = quizzes.map((q) => {
    // If the student took it, show it as completed with their real score.
    const sub = lastSubmissionFor(q.id);
    if (sub && !wasReset) {
      return {
        ...q,
        status: 'completed',
        score: sub.score,
        maxScore: sub.total,
        attemptedAt: new Date(sub.date).toLocaleString(),
      };
    }
    // If reset, treat completed/missed as available again.
    if (wasReset && (q.status === 'completed' || q.status === 'missed')) {
      return { ...q, status: 'available', score: undefined, attemptedAt: undefined };
    }
    // Honor in-session status overrides.
    if (statusMap[q.id] === 'completed' && !wasReset) {
      return { ...q, status: 'completed' };
    }
    return q;
  });

  const availableQuizzes = mergedQuizzes.filter((q) => q.status === 'available');
  const upcomingQuizzes = mergedQuizzes.filter((q) => q.status === 'upcoming');
  const completedQuizzes = mergedQuizzes.filter((q) => q.status === 'completed');
  const missedQuizzes = mergedQuizzes.filter((q) => q.status === 'missed');

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'available':
        return { color: 'bg-success/10 text-success border-success/20', icon: Play, label: 'Available' };
      case 'upcoming':
        return { color: 'bg-primary/10 text-primary border-primary/20', icon: Calendar, label: 'Upcoming' };
      case 'completed':
        return { color: 'bg-secondary/10 text-secondary border-secondary/20', icon: CheckCircle, label: 'Completed' };
      case 'missed':
        return { color: 'bg-destructive/10 text-destructive border-destructive/20', icon: XCircle, label: 'Missed' };
      default:
        return { color: 'bg-muted text-muted-foreground', icon: HelpCircle, label: 'Unknown' };
    }
  };

  const QuizCard = ({ quiz }: { quiz: Quiz }) => {
    const statusConfig = getStatusConfig(quiz.status);
    const StatusIcon = statusConfig.icon;

    return (
      <Card className="hover:shadow-lg transition-all">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold truncate">{quiz.title}</h3>
              <p className="text-sm text-muted-foreground">{quiz.subjectName}</p>
            </div>
            <Badge className={statusConfig.color}>
              <StatusIcon className="w-3 h-3 mr-1" />
              {statusConfig.label}
            </Badge>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{quiz.duration} minutes</span>
              <span className="mx-2">•</span>
              <HelpCircle className="w-4 h-4" />
              <span>{quiz.totalQuestions} questions</span>
            </div>

            {quiz.startTime && quiz.endTime && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>
                  {format(parseISO(quiz.startTime), 'MMM d, h:mm a')} -{' '}
                  {format(parseISO(quiz.endTime), 'MMM d, h:mm a')}
                </span>
              </div>
            )}

            {quiz.status === 'completed' && quiz.score !== undefined && (
              <div className="flex items-center gap-2 mt-3 p-2 rounded-lg bg-muted/50">
                <Trophy className="w-4 h-4 text-success" />
                <span className="font-medium">
                  Score: {quiz.score}/{quiz.maxScore} ({Math.round((quiz.score / quiz.maxScore!) * 100)}%)
                </span>
              </div>
            )}

            {quiz.attemptedAt && (
              <div className="text-xs text-muted-foreground">
                Attempted on: {quiz.attemptedAt}
              </div>
            )}
          </div>

          {quiz.status === 'available' && (
            <Button className="w-full mt-4" onClick={() => navigate(`/quiz/${quiz.id}`)}>
              <Play className="w-4 h-4 mr-2" />
              Start Quiz
            </Button>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <DashboardLayout>
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold mb-2">Quizzes</h1>
        <p className="text-muted-foreground">View and take your available quizzes</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { count: availableQuizzes.length, label: 'Available', icon: Play, bg: 'bg-success/10', text: 'text-success' },
          { count: upcomingQuizzes.length, label: 'Upcoming', icon: Calendar, bg: 'bg-primary/10', text: 'text-primary' },
          { count: completedQuizzes.length, label: 'Completed', icon: CheckCircle, bg: 'bg-secondary/10', text: 'text-secondary' },
          { count: missedQuizzes.length, label: 'Missed', icon: XCircle, bg: 'bg-destructive/10', text: 'text-destructive' },
        ].map((item, i) => (
          <Card key={item.label} className="animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
            <CardContent className="p-4 text-center">
              <div className={`w-10 h-10 rounded-lg ${item.bg} flex items-center justify-center mx-auto mb-2`}>
                <item.icon className={`w-5 h-5 ${item.text}`} />
              </div>
              <p className="text-2xl font-bold">{item.count}</p>
              <p className="text-sm text-muted-foreground">{item.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="available" className="animate-fade-in" style={{ animationDelay: '400ms' }}>
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="available">Available ({availableQuizzes.length})</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming ({upcomingQuizzes.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedQuizzes.length})</TabsTrigger>
          <TabsTrigger value="missed">Missed ({missedQuizzes.length})</TabsTrigger>
        </TabsList>

        {[
          { value: 'available', items: availableQuizzes, emptyIcon: AlertCircle, emptyTitle: 'No quizzes available', emptyDesc: 'Check back later for new quizzes' },
          { value: 'upcoming', items: upcomingQuizzes, emptyIcon: Calendar, emptyTitle: 'No upcoming quizzes', emptyDesc: 'All scheduled quizzes will appear here' },
          { value: 'completed', items: completedQuizzes, emptyIcon: CheckCircle, emptyTitle: 'No completed quizzes', emptyDesc: 'Your completed quizzes will appear here' },
          { value: 'missed', items: missedQuizzes, emptyIcon: Trophy, emptyTitle: 'No missed quizzes!', emptyDesc: 'Great job keeping up with your quizzes' },
        ].map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            {tab.items.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tab.items.map((quiz) => (
                  <QuizCard key={quiz.id} quiz={quiz} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <tab.emptyIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium">{tab.emptyTitle}</p>
                  <p className="text-muted-foreground">{tab.emptyDesc}</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </DashboardLayout>
  );
};

export default Quizzes;
