import { InstructorLayout } from '@/components/layout/InstructorLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, Users, BarChart3, ClipboardList } from 'lucide-react';
import { instructorQuizzes } from '@/data/instructorMockData';

const statusColors: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  draft: 'outline',
  published: 'secondary',
  active: 'default',
  closed: 'destructive',
};

const InstructorQuizzes = () => {
  const tabs = [
    { value: 'all', label: 'All', filter: () => true },
    { value: 'active', label: 'Active', filter: (q: typeof instructorQuizzes[0]) => q.status === 'active' },
    { value: 'published', label: 'Published', filter: (q: typeof instructorQuizzes[0]) => q.status === 'published' },
    { value: 'draft', label: 'Drafts', filter: (q: typeof instructorQuizzes[0]) => q.status === 'draft' },
    { value: 'closed', label: 'Closed', filter: (q: typeof instructorQuizzes[0]) => q.status === 'closed' },
  ];

  return (
    <InstructorLayout>
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold mb-2">Quiz Manager</h1>
        <p className="text-muted-foreground">Create and manage quizzes for your courses.</p>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          {tabs.map(tab => (
            <TabsTrigger key={tab.value} value={tab.value}>{tab.label}</TabsTrigger>
          ))}
        </TabsList>

        {tabs.map(tab => (
          <TabsContent key={tab.value} value={tab.value}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {instructorQuizzes.filter(tab.filter).map((quiz, i) => (
                <Card key={quiz.id} className="animate-fade-in hover:shadow-lg transition-all" style={{ animationDelay: `${i * 80}ms` }}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base">{quiz.title}</CardTitle>
                        <CardDescription>{quiz.courseName}</CardDescription>
                      </div>
                      <Badge variant={statusColors[quiz.status]}>{quiz.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <ClipboardList className="w-3.5 h-3.5" />
                        {quiz.totalQuestions} questions
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {quiz.duration} min
                      </span>
                      {quiz.submissions !== undefined && (
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" />
                          {quiz.submissions} submitted
                        </span>
                      )}
                      {quiz.avgScore !== undefined && (
                        <span className="flex items-center gap-1">
                          <BarChart3 className="w-3.5 h-3.5" />
                          Avg: {quiz.avgScore}%
                        </span>
                      )}
                    </div>
                    {quiz.startTime && (
                      <p className="text-xs text-muted-foreground">
                        {new Date(quiz.startTime).toLocaleDateString()} – {new Date(quiz.endTime!).toLocaleDateString()}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
              {instructorQuizzes.filter(tab.filter).length === 0 && (
                <p className="text-muted-foreground col-span-2 text-center py-8">No quizzes in this category.</p>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </InstructorLayout>
  );
};

export default InstructorQuizzes;
