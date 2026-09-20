import { Navigate, Outlet, useLocation } from 'react-router';

import { useAuth } from '@/providers/AuthProvider';
import { Spin } from 'antd';

const ProtectedRoute = () => {
  const { status } = useAuth();
  const location = useLocation();

  if (status === 'initializing') {
    return <Spin fullscreen />;
  }

  if (status === 'unauthenticated') {
    const redirectTo = `${location.pathname}${location.search}${location.hash}`;

    return <Navigate to={`/auth/login?redirectTo=${encodeURIComponent(redirectTo)}`} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
