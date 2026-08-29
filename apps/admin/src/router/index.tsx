import { createBrowserRouter } from 'react-router';
import NotFoundPage from '@/pages/errors/NotFoundPage';
import AuthLayout from '@/layouts/AuthLayout';
import { adminRoutes } from './admin.routes';
import MainLayout from '@/layouts/MainLayout';
import { authRoutes } from './auth.routes';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: adminRoutes,
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: authRoutes,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
