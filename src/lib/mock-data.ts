export type UserRole = 'field' | 'office' | 'ceo';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  assignedBakkie?: string;
}

export interface Bakkie {
  id: string;
  name: string;
  registration: string;
}

export interface Client {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  createdDate: string;
}

export interface Job {
  id: string;
  clientId: string;
  clientName: string;
  bakkieId: string;
  bakkieName: string;
  createdBy: string;
  date: string;
  startTime: string;
  endTime: string;
  address: string;
  description: string;
  status: 'Draft' | 'Submitted';
  photoURLs: string[];
}

export interface Expense {
  id: string;
  userId: string;
  userName: string;
  bakkieId: string;
  bakkieName: string;
  amount: number;
  category: 'Materials' | 'Fuel' | 'Other';
  vatAmount: number;
  receiptPhotoURL: string;
  date: string;
  approved: boolean;
  approvedBy?: string;
}

export const MOCK_USERS: User[] = [
  { id: '1', name: 'John Field', email: 'john@mld.co.za', role: 'field', assignedBakkie: '1' },
  { id: '2', name: 'Sarah Office', email: 'sarah@mld.co.za', role: 'office' },
  { id: '3', name: 'Mike CEO', email: 'mike@mld.co.za', role: 'ceo' },
  { id: '4', name: 'Peter Field', email: 'peter@mld.co.za', role: 'field', assignedBakkie: '2' },
];

export const MOCK_BAKKIES: Bakkie[] = [
  { id: '1', name: 'Bakkie 1', registration: 'CA 123-456' },
  { id: '2', name: 'Bakkie 2', registration: 'CA 789-012' },
  { id: '3', name: 'Bakkie 3', registration: 'CA 345-678' },
];

export const MOCK_CLIENTS: Client[] = [
  { id: '1', name: 'Greenfields Estate', address: '12 Oak Lane, Paarl', phone: '021 555 1234', email: 'info@greenfields.co.za', createdDate: '2026-01-15' },
  { id: '2', name: 'Cape Winelands Hotel', address: '45 Vine Street, Stellenbosch', phone: '021 555 5678', email: 'manager@cwh.co.za', createdDate: '2026-02-01' },
  { id: '3', name: 'Table Mountain Residences', address: '8 Kloof Road, Cape Town', phone: '021 555 9012', email: 'admin@tmr.co.za', createdDate: '2026-02-20' },
];

export const MOCK_JOBS: Job[] = [
  { id: '1', clientId: '1', clientName: 'Greenfields Estate', bakkieId: '1', bakkieName: 'Bakkie 1', createdBy: '1', date: '2026-03-18', startTime: '08:00', endTime: '11:30', address: '12 Oak Lane, Paarl', description: 'Leak detection on main water line. Found leak at junction near pool pump.', status: 'Submitted', photoURLs: [] },
  { id: '2', clientId: '2', clientName: 'Cape Winelands Hotel', bakkieId: '1', bakkieName: 'Bakkie 1', createdBy: '1', date: '2026-03-18', startTime: '13:00', endTime: '15:00', address: '45 Vine Street, Stellenbosch', description: 'Routine inspection of irrigation system.', status: 'Submitted', photoURLs: [] },
  { id: '3', clientId: '3', clientName: 'Table Mountain Residences', bakkieId: '2', bakkieName: 'Bakkie 2', createdBy: '4', date: '2026-03-17', startTime: '09:00', endTime: '12:00', address: '8 Kloof Road, Cape Town', description: 'Underground pipe repair in unit 4B.', status: 'Submitted', photoURLs: [] },
];

export const MOCK_EXPENSES: Expense[] = [
  { id: '1', userId: '1', userName: 'John Field', bakkieId: '1', bakkieName: 'Bakkie 1', amount: 450, category: 'Materials', vatAmount: 67.5, receiptPhotoURL: '', date: '2026-03-18', approved: false },
  { id: '2', userId: '1', userName: 'John Field', bakkieId: '1', bakkieName: 'Bakkie 1', amount: 850, category: 'Fuel', vatAmount: 0, receiptPhotoURL: '', date: '2026-03-18', approved: true, approvedBy: '2' },
  { id: '3', userId: '4', userName: 'Peter Field', bakkieId: '2', bakkieName: 'Bakkie 2', amount: 1200, category: 'Materials', vatAmount: 180, receiptPhotoURL: '', date: '2026-03-17', approved: false },
];

export function calculateVAT(amount: number, category: string): number {
  if (category === 'Materials') return Math.round(amount * 0.15 * 100) / 100;
  return 0;
}
