import { createContext, useContext, useEffect, useState, type PropsWithChildren } from 'react';

import {
  clearAccessToken,
  getAccessToken,
  httpClient,
  isAccessTokenExpired,
  refreshAccessToken,
  registerAuthRefreshFailureHandler,
} from '@/api/axios/instance';

export type AuthStatus = 'initializing' | 'authenticated' | 'unauthenticated';

export type AuthUser = Record<string, unknown>;

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

export function AuthProvider({ children }: PropsWithChildren) {
  const [status, setStatus] = useState<AuthStatus>('initializing');
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    let mounted = true;

    const handleRefreshFailure = () => {
      clearAccessToken();
      setUser(null);
      setStatus('unauthenticated');
    };

    const unregisterRefreshFailureHandler = registerAuthRefreshFailureHandler(handleRefreshFailure);

    const initializeAuth = async () => {
      const accessToken = getAccessToken();

      if (!accessToken) {
        if (mounted) {
          setStatus('unauthenticated');
        }
        return;
      }

      try {
        if (isAccessTokenExpired(accessToken)) {
          await refreshAccessToken();
        }

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
    };
  }, []);

  const login = async (credentials: LoginCredentials) => {
    const response = await httpClient.post<LoginResponse>('/auth/login', credentials, {
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
