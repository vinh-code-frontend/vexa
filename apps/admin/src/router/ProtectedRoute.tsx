import { Navigate, Outlet, useLocation } from 'react-router';

import AuthLoading from '@/components/AuthLoading';
import { useAuth } from '@/providers/AuthProvider';

const ProtectedRoute = () => {
  const { status } = useAuth();
  const location = useLocation();

  if (status === 'initializing') {
    return <AuthLoading />;
  }

  if (status === 'unauthenticated') {
    const redirectTo = `${location.pathname}${location.search}${location.hash}`;

    return <Navigate to={`/auth/login?redirectTo=${encodeURIComponent(redirectTo)}`} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
