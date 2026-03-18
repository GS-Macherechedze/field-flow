import { Navigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth-context';

export default function Index() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  switch (user.role) {
    case 'field': return <Navigate to="/field" replace />;
    case 'office': return <Navigate to="/office" replace />;
    case 'ceo': return <Navigate to="/office" replace />;
    default: return <Navigate to="/login" replace />;
  }
}
