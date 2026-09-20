import { Navigate, Outlet } from 'react-router';

import { useAuth } from '@/providers/AuthProvider';
import { Spin } from 'antd';

const GuestRoute = () => {
  const { status } = useAuth();

  if (status === 'initializing') {
    return <Spin fullscreen />;
  }

  if (status === 'authenticated') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default GuestRoute;
