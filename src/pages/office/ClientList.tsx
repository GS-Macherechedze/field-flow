import { useState } from 'react';
import { MOCK_CLIENTS, Client } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Search, Phone, Mail } from 'lucide-react';
import { toast } from 'sonner';

export default function ClientList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [clients] = useState<Client[]>(MOCK_CLIENTS);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newClient, setNewClient] = useState({ name: '', address: '', phone: '', email: '' });

  const filtered = clients.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  const handleAdd = () => {
    if (!newClient.name) { toast.error('Name is required'); return; }
    toast.success('Client added!');
    setDialogOpen(false);
    setNewClient({ name: '', address: '', phone: '', email: '' });
  };

  return (
    <div className="min-h-screen bg-background p-4 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate('/office')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-bold flex-1">Clients</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm"><Plus className="w-4 h-4 mr-1" /> Add</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Add Client</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div><Label>Name</Label><Input value={newClient.name} onChange={e => setNewClient(p => ({ ...p, name: e.target.value }))} /></div>
              <div><Label>Address</Label><Input value={newClient.address} onChange={e => setNewClient(p => ({ ...p, address: e.target.value }))} /></div>
              <div><Label>Phone</Label><Input value={newClient.phone} onChange={e => setNewClient(p => ({ ...p, phone: e.target.value }))} /></div>
              <div><Label>Email</Label><Input value={newClient.email} onChange={e => setNewClient(p => ({ ...p, email: e.target.value }))} /></div>
              <Button className="w-full" onClick={handleAdd}>Add Client</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search by name or phone..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div className="space-y-3">
        {filtered.map(client => (
          <Card key={client.id}>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-1">{client.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{client.address}</p>
              <div className="flex gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {client.phone}</span>
                <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {client.email}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
