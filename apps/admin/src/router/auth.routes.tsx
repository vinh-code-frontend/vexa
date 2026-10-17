import { LoginPage } from '@/features/auth';
import type { RouteObject } from 'react-router';

export const authRoutes: RouteObject[] = [
  {
    path: 'login',
    element: <LoginPage />,
  },
];
