import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const AdminSettings = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({ title: 'Settings saved', description: 'Platform settings have been updated.' });
  };

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in max-w-3xl">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Platform Settings</h1>
          <p className="text-muted-foreground">Configure platform-wide settings</p>
        </div>

        {/* General */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg">General</CardTitle>
            <CardDescription>Basic platform configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Platform Name</Label>
              <Input defaultValue="ExamHub" />
            </div>
            <div className="space-y-2">
              <Label>University Name</Label>
              <Input defaultValue="Cairo University" />
            </div>
            <div className="space-y-2">
              <Label>Current Semester</Label>
              <Select defaultValue="spring2026">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="spring2026">Spring 2026</SelectItem>
                  <SelectItem value="fall2026">Fall 2026</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Quiz Settings */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg">Quiz Settings</CardTitle>
            <CardDescription>Default quiz behavior</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Auto-submit on timeout</p>
                <p className="text-xs text-muted-foreground">Automatically submit when time runs out</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Show results immediately</p>
                <p className="text-xs text-muted-foreground">Students see scores right after submission</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Allow quiz retakes</p>
                <p className="text-xs text-muted-foreground">Students can retake quizzes if enabled per quiz</p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label>Default Quiz Duration (minutes)</Label>
              <Input type="number" defaultValue="30" className="w-32" />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg">Notifications</CardTitle>
            <CardDescription>Email and platform notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Quiz reminders</p>
                <p className="text-xs text-muted-foreground">Notify students before quiz starts</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Attendance alerts</p>
                <p className="text-xs text-muted-foreground">Alert when attendance drops below threshold</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Button onClick={handleSave} className="w-full sm:w-auto">Save Settings</Button>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
