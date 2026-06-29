import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Shield, Mail, Building, IdCard } from 'lucide-react';

const AdminProfile = () => {
  const { user } = useAuth();

  const infoItems = [
    { icon: IdCard, label: 'National ID', value: user?.nationalId },
    { icon: Mail, label: 'Email', value: user?.email },
    { icon: Building, label: 'Faculty', value: user?.faculty },
    { icon: Shield, label: 'Role', value: 'Platform Administrator' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in max-w-2xl">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Admin Profile</h1>
          <p className="text-muted-foreground">Your account information</p>
        </div>

        <Card className="glass-card">
          <CardHeader className="text-center pb-2">
            <div className="w-20 h-20 mx-auto rounded-full bg-destructive/10 flex items-center justify-center mb-3">
              <Shield className="w-10 h-10 text-destructive" />
            </div>
            <CardTitle className="text-xl">{user?.name}</CardTitle>
            <p className="text-sm text-muted-foreground">Platform Administrator</p>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            {infoItems.map((item) => (
              <div key={item.label} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                <item.icon className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="text-sm font-medium text-foreground">{item.value}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminProfile;
