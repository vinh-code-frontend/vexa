import type { RouteObject } from 'react-router';

import {
  ForgotPasswordPage,
  LoginPage,
  ResetLinkSentPage,
  ResetPwdSuccessPage,
  SetNewPwdPage,
} from '@/features/auth';

export const authRoutes: RouteObject[] = [
  {
    path: 'login',
    element: <LoginPage />,
  },
  {
    path: 'forgot-password',
    element: <ForgotPasswordPage />,
  },
  {
    path: 'reset-token',
    element: <SetNewPwdPage />,
  },
  {
    path: 'reset-link-sent',
    element: <ResetLinkSentPage />,
  },
  {
    path: 'reset-pwd-success',
    element: <ResetPwdSuccessPage />,
  },
];
