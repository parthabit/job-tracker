import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FullPageSpinner } from '../ui/Spinner';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <FullPageSpinner />;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children;
}
