import { useAuth } from '@/lib/auth-context';
import { MOCK_BAKKIES } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, Receipt, ClipboardList, LogOut, Truck } from 'lucide-react';

export default function FieldHome() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const bakkie = MOCK_BAKKIES.find(b => b.id === user?.assignedBakkie);
  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <div className="min-h-screen bg-background p-4 max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold">Hey, {user?.name?.split(' ')[0]} 👋</h1>
          {bakkie && (
            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
              <Truck className="w-4 h-4" /> {bakkie.name} · {bakkie.registration}
            </p>
          )}
        </div>
        <Button variant="ghost" size="icon" onClick={handleLogout}>
          <LogOut className="w-5 h-5" />
        </Button>
      </div>

      <div className="space-y-4">
        <Link to="/field/new-job">
          <Card className="hover:shadow-md transition-shadow cursor-pointer border-2 border-transparent hover:border-primary/30">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <Briefcase className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold text-lg">New Job</h2>
                <p className="text-sm text-muted-foreground">Log a new job with photos</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/field/new-expense">
          <Card className="hover:shadow-md transition-shadow cursor-pointer border-2 border-transparent hover:border-primary/30">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0">
                <Receipt className="w-7 h-7 text-accent" />
              </div>
              <div>
                <h2 className="font-semibold text-lg">New Expense</h2>
                <p className="text-sm text-muted-foreground">Capture a receipt</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/field/my-jobs">
          <Card className="hover:shadow-md transition-shadow cursor-pointer border-2 border-transparent hover:border-primary/30">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="w-14 h-14 rounded-2xl bg-secondary/20 flex items-center justify-center shrink-0">
                <ClipboardList className="w-7 h-7 text-secondary-foreground" />
              </div>
              <div>
                <h2 className="font-semibold text-lg">My Jobs</h2>
                <p className="text-sm text-muted-foreground">View your submitted jobs</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
