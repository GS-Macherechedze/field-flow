import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { MOCK_JOBS, MOCK_EXPENSES, MOCK_BAKKIES } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, Receipt, CheckCircle, LogOut, Users, MapPin, Clock } from 'lucide-react';
import { toast } from 'sonner';

export default function OfficeDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const isReadOnly = user?.role === 'ceo';
  const handleLogout = () => { logout(); navigate('/login'); };
  const [bakkieFilter, setBakkieFilter] = useState<string>('all');

  const today = new Date().toISOString().split('T')[0];
  const jobsToday = MOCK_JOBS.filter(j => j.date === today);
  const pendingExpenses = MOCK_EXPENSES.filter(e => !e.approved);
  const totalExpensesWeek = MOCK_EXPENSES.reduce((sum, e) => sum + e.amount, 0);

  const filteredJobs = bakkieFilter === 'all' ? MOCK_JOBS : MOCK_JOBS.filter(j => j.bakkieId === bakkieFilter);
  const filteredExpenses = bakkieFilter === 'all' ? MOCK_EXPENSES : MOCK_EXPENSES.filter(e => e.bakkieId === bakkieFilter);

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <div>
          <h1 className="text-lg font-bold">{isReadOnly ? 'CEO' : 'Office'} Dashboard</h1>
          <p className="text-xs text-muted-foreground">Welcome, {user?.name}</p>
        </div>
        <div className="flex items-center gap-2">
          {!isReadOnly && (
            <Button variant="outline" size="sm" asChild>
              <Link to="/office/clients">
                <Users className="w-4 h-4 mr-1" /> Clients
              </Link>
            </Button>
          )}
          <Button variant="ghost" size="icon" onClick={logout}>
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <div className="p-4 max-w-4xl mx-auto space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card>
            <CardContent className="p-4 text-center">
              <Briefcase className="w-6 h-6 text-primary mx-auto mb-1" />
              <p className="text-2xl font-bold">{jobsToday.length}</p>
              <p className="text-xs text-muted-foreground">Jobs Today</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Receipt className="w-6 h-6 text-accent mx-auto mb-1" />
              <p className="text-2xl font-bold">{pendingExpenses.length}</p>
              <p className="text-xs text-muted-foreground">Pending</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="w-6 h-6 text-success mx-auto mb-1" />
              <p className="text-2xl font-bold">R {totalExpensesWeek.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Expenses</p>
            </CardContent>
          </Card>
        </div>

        {/* Filter */}
        <div className="flex justify-end">
          <Select value={bakkieFilter} onValueChange={setBakkieFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Bakkies" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Bakkies</SelectItem>
              {MOCK_BAKKIES.map(b => <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="jobs">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="jobs">Recent Jobs</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
          </TabsList>

          <TabsContent value="jobs" className="space-y-3 mt-3">
            {filteredJobs.map(job => (
              <Card key={job.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold">{job.clientName}</h3>
                    <Badge variant="outline">{job.bakkieName}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {job.address}
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {job.date} · {job.startTime}–{job.endTime}
                  </p>
                  <p className="text-sm mt-2">{job.description}</p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="expenses" className="space-y-3 mt-3">
            {filteredExpenses.map(expense => (
              <Card key={expense.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-semibold">R {expense.amount.toFixed(2)}</h3>
                      <p className="text-sm text-muted-foreground">{expense.userName} · {expense.bakkieName}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={expense.category === 'Materials' ? 'default' : 'secondary'}>
                        {expense.category}
                      </Badge>
                      {expense.approved ? (
                        <Badge className="bg-success text-success-foreground">Approved</Badge>
                      ) : !isReadOnly ? (
                        <Button size="sm" variant="outline" onClick={() => toast.success('Expense approved!')}>
                          Approve
                        </Button>
                      ) : (
                        <Badge variant="outline">Pending</Badge>
                      )}
                    </div>
                  </div>
                  {expense.vatAmount > 0 && (
                    <p className="text-xs text-muted-foreground mt-1">VAT: R {expense.vatAmount.toFixed(2)}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
