import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  User,
  Mail,
  IdCard,
  GraduationCap,
  BookOpen,
  Trophy,
  TrendingUp,
  Lock,
  Eye,
  EyeOff,
  Save,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { student } = useAuth();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const handlePasswordChange = () => {
    if (passwords.new !== passwords.confirm) {
      toast({
        title: 'Error',
        description: 'New passwords do not match',
        variant: 'destructive',
      });
      return;
    }
    if (passwords.new.length < 6) {
      toast({
        title: 'Error',
        description: 'Password must be at least 6 characters',
        variant: 'destructive',
      });
      return;
    }
    
    // Mock password update
    toast({
      title: 'Success',
      description: 'Password updated successfully',
    });
    setIsEditingPassword(false);
    setPasswords({ current: '', new: '', confirm: '' });
  };

  const profileInfo = [
    { label: 'Full Name', value: student?.name, icon: User },
    { label: 'Email', value: student?.email, icon: Mail },
    { label: 'National ID', value: student?.nationalId, icon: IdCard },
    { label: 'Faculty', value: student?.faculty, icon: GraduationCap },
    { label: 'Year', value: `Year ${student?.year}`, icon: BookOpen },
  ];

  const academicStats = [
    { label: 'Current GPA', value: student?.gpa?.toFixed(2) || '3.50', icon: Trophy, color: 'text-success' },
    { label: 'CGPA', value: student?.cgpa?.toFixed(2) || '3.42', icon: TrendingUp, color: 'text-primary' },
    { label: 'Total Credits', value: student?.totalCredits || 120, icon: BookOpen, color: 'text-secondary' },
    { label: 'Completed', value: student?.completedCredits || 48, icon: GraduationCap, color: 'text-warning' },
  ];

  return (
    <DashboardLayout>
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold mb-2">My Profile</h1>
        <p className="text-muted-foreground">
          View and manage your personal information
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-2 animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Personal Information
            </CardTitle>
            <CardDescription>
              Your registered details from the university database
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6 mb-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-3xl font-bold text-primary-foreground">
                  {student?.name?.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-bold">{student?.name}</h2>
                <Badge variant="secondary" className="mt-2">
                  <GraduationCap className="w-3 h-3 mr-1" />
                  {student?.faculty}
                </Badge>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profileInfo.map((info) => (
                <div key={info.label} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <info.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{info.label}</p>
                    <p className="font-medium">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Academic Stats */}
        <Card className="animate-fade-in" style={{ animationDelay: '100ms' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-success" />
              Academic Stats
            </CardTitle>
            <CardDescription>Your academic performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {academicStats.map((stat) => (
              <div key={stat.label} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </div>
                <span className="font-bold text-lg">{stat.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Password Change */}
        <Card className="lg:col-span-3 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-warning" />
              Security
            </CardTitle>
            <CardDescription>
              Update your password to keep your account secure
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!isEditingPassword ? (
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Password</p>
                    <p className="text-sm text-muted-foreground">Last changed: Never</p>
                  </div>
                </div>
                <Button onClick={() => setIsEditingPassword(true)}>
                  Change Password
                </Button>
              </div>
            ) : (
              <div className="space-y-4 max-w-md">
                <div className="space-y-2">
                  <Label htmlFor="current">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="current"
                      type={showPassword ? 'text' : 'password'}
                      value={passwords.current}
                      onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                      placeholder="Enter current password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new">New Password</Label>
                  <Input
                    id="new"
                    type={showPassword ? 'text' : 'password'}
                    value={passwords.new}
                    onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                    placeholder="Enter new password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm">Confirm New Password</Label>
                  <Input
                    id="confirm"
                    type={showPassword ? 'text' : 'password'}
                    value={passwords.confirm}
                    onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                    placeholder="Confirm new password"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handlePasswordChange}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Password
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsEditingPassword(false);
                      setPasswords({ current: '', new: '', confirm: '' });
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
