import { Navigate, Outlet } from 'react-router';

import AuthLoading from '@/components/AuthLoading';
import { useAuth } from '@/providers/AuthProvider';

const GuestRoute = () => {
  const { status } = useAuth();

  if (status === 'initializing') {
    return <AuthLoading />;
  }

  if (status === 'authenticated') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default GuestRoute;
