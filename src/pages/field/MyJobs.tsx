import { useAuth } from '@/lib/auth-context';
import { MOCK_JOBS } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock } from 'lucide-react';

export default function MyJobs() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const jobs = MOCK_JOBS.filter(j => j.createdBy === user?.id);

  return (
    <div className="min-h-screen bg-background p-4 max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate('/field')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-bold">My Jobs</h1>
      </div>

      {jobs.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">No jobs yet</p>
      ) : (
        <div className="space-y-3">
          {jobs.map(job => (
            <Card key={job.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{job.clientName}</h3>
                  <Badge variant={job.status === 'Submitted' ? 'default' : 'secondary'}>{job.status}</Badge>
                </div>
                <p className="text-sm text-muted-foreground flex items-center gap-1 mb-1">
                  <MapPin className="w-3.5 h-3.5" /> {job.address}
                </p>
                <p className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
                  <Clock className="w-3.5 h-3.5" /> {job.date} · {job.startTime}–{job.endTime}
                </p>
                <p className="text-sm">{job.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
