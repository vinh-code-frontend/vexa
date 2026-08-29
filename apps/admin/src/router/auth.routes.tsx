import LoginPage from '@/pages/auth/LoginPage';
import type { RouteObject } from 'react-router';

export const authRoutes: RouteObject[] = [
  {
    path: 'login',
    element: <LoginPage />,
  },
];
