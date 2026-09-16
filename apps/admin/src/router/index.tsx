import { createBrowserRouter } from 'react-router';
import NotFoundPage from '@/pages/errors/NotFoundPage';
import AuthLayout from '@/layouts/AuthLayout';
import { adminRoutes } from './admin.routes';
import MainLayout from '@/layouts/MainLayout';
import { authRoutes } from './auth.routes';
import ProtectedRoute from './ProtectedRoute';
import GuestRoute from './GuestRoute';

export const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <MainLayout />,
        children: adminRoutes,
      },
    ],
  },
  {
    element: <GuestRoute />,
    children: [
      {
        path: '/auth',
        element: <AuthLayout />,
        children: authRoutes,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
