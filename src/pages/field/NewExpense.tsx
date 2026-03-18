import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth-context';
import { MOCK_BAKKIES, calculateVAT } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Camera } from 'lucide-react';
import { toast } from 'sonner';

export default function NewExpense() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const today = new Date().toISOString().split('T')[0];

  const [form, setForm] = useState({
    amount: '',
    category: '' as string,
    bakkieId: user?.assignedBakkie || '',
    date: today,
  });
  const [receiptPhoto, setReceiptPhoto] = useState<string | null>(null);

  const amount = parseFloat(form.amount) || 0;
  const vat = calculateVAT(amount, form.category);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setReceiptPhoto(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (!form.amount || !form.category) {
      toast.error('Please fill in amount and category');
      return;
    }
    toast.success('Expense submitted!');
    navigate('/field');
  };

  return (
    <div className="min-h-screen bg-background p-4 max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate('/field')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-bold">New Expense</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Receipt Photo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {receiptPhoto ? (
            <div className="relative rounded-lg overflow-hidden border">
              <img src={receiptPhoto} alt="Receipt" className="w-full max-h-48 object-contain bg-muted" />
              <Button variant="ghost" size="sm" className="absolute top-2 right-2" onClick={() => setReceiptPhoto(null)}>Remove</Button>
            </div>
          ) : (
            <label className="block w-full h-36 rounded-lg border-2 border-dashed border-muted-foreground/30 flex items-center justify-center cursor-pointer hover:border-primary/50 transition-colors">
              <div className="text-center">
                <Camera className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Take photo or upload</p>
              </div>
              <input type="file" accept="image/*" capture="environment" className="hidden" onChange={handlePhotoUpload} />
            </label>
          )}
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="text-base">Expense Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label>Amount (ZAR)</Label>
            <Input type="number" inputMode="decimal" placeholder="0.00" value={form.amount} onChange={e => setForm(p => ({ ...p, amount: e.target.value }))} />
          </div>

          <div className="space-y-1.5">
            <Label>Category</Label>
            <Select value={form.category} onValueChange={v => setForm(p => ({ ...p, category: v }))}>
              <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Materials">Materials</SelectItem>
                <SelectItem value="Fuel">Fuel</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {form.category && amount > 0 && (
            <div className="rounded-lg bg-muted p-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">VAT (15%)</span>
                <span className="font-medium">R {vat.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-muted-foreground">Total incl. VAT</span>
                <span className="font-semibold">R {amount.toFixed(2)}</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Date</Label>
              <Input type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <Label>Bakkie</Label>
              <Select value={form.bakkieId} onValueChange={v => setForm(p => ({ ...p, bakkieId: v }))}>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  {MOCK_BAKKIES.map(b => <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button className="w-full" onClick={handleSubmit}>Submit Expense</Button>
        </CardContent>
      </Card>
    </div>
  );
}
