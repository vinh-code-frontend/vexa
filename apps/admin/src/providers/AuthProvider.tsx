import { createContext, useContext, useEffect, useState, type PropsWithChildren } from 'react';

import {
  clearAccessToken,
  getAccessToken,
  getAuthSession,
  httpClient,
  isAccessTokenExpired,
  registerAuthSessionChangeHandler,
  refreshAccessToken,
  registerAuthRefreshFailureHandler,
} from '@/api/axios/instance';
import type { UserResponse } from '@/api/generated/model';

export type AuthStatus = 'initializing' | 'authenticated' | 'unauthenticated';

export type AuthUser = UserResponse;

type LoginCredentials = {
  username: string;
  password: string;
};

type LoginResponse = {
  accessToken?: string;
  user?: AuthUser;
};

type AuthContextValue = {
  status: AuthStatus;
  user: AuthUser | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  refreshAccessToken: typeof refreshAccessToken;
};

const AuthContext = createContext<AuthContextValue | null>(null);

// A valid, non-expired token means no refresh call is needed, so skip the initializing/spin state entirely.
const hasValidAccessToken = () => {
  const accessToken = getAuthSession()?.accessToken ?? getAccessToken();
  return !!accessToken && !isAccessTokenExpired(accessToken);
};

export function AuthProvider({ children }: PropsWithChildren) {
  const [status, setStatus] = useState<AuthStatus>(() =>
    hasValidAccessToken() ? 'authenticated' : 'initializing',
  );
  const [user, setUser] = useState<AuthUser | null>(() => getAuthSession()?.user ?? null);

  useEffect(() => {
    let mounted = true;

    const handleSessionChange = (session: ReturnType<typeof getAuthSession>) => {
      if (!mounted) {
        return;
      }

      setUser(session?.user ?? null);

      if (!session) {
        setStatus('unauthenticated');
      }
    };

    const handleRefreshFailure = () => {
      clearAccessToken();
      setUser(null);
      setStatus('unauthenticated');
    };

    const unregisterRefreshFailureHandler = registerAuthRefreshFailureHandler(handleRefreshFailure);
    const unregisterSessionChangeHandler = registerAuthSessionChangeHandler(handleSessionChange);

    const initializeAuth = async () => {
      // Already resolved synchronously during the initial render, no refresh call needed.
      if (hasValidAccessToken()) {
        return;
      }

      try {
        await refreshAccessToken();

        if (mounted) {
          setStatus('authenticated');
        }
      } catch {
        if (mounted) {
          setUser(null);
          setStatus('unauthenticated');
        }
      }
    };

    void initializeAuth();

    return () => {
      mounted = false;
      unregisterRefreshFailureHandler();
      unregisterSessionChangeHandler();
    };
  }, []);

  const login = async (credentials: LoginCredentials) => {
    const response = await httpClient.post<LoginResponse>('/admin/auth/login', credentials, {
      skipAuthRefresh: true,
    });

    if (!response.data.accessToken && !getAccessToken()) {
      throw new Error('Login response did not include an access token');
    }

    setUser(response.data.user ?? null);
    setStatus('authenticated');
  };

  const logout = () => {
    clearAccessToken();
    setUser(null);
    setStatus('unauthenticated');
  };

  return (
    <AuthContext.Provider value={{ status, user, login, logout, refreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
