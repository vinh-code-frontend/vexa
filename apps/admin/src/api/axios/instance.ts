import axios, { AxiosError } from 'axios';

declare module 'axios' {
  interface AxiosRequestConfig {
    skipAuthRefresh?: boolean;
    _retry?: boolean;
  }
}

export type AuthUser = Record<string, unknown>;

type TokenResponse = {
  accessToken?: string;
  user?: AuthUser;
};

export type AuthSession = {
  accessToken: string;
  user: AuthUser | null;
};

const AUTH_SESSION_STORAGE_KEY = 'authSession';
const LEGACY_ACCESS_TOKEN_STORAGE_KEY = 'accessToken';

let refreshPromise: Promise<string> | null = null;
let authRefreshFailureHandler: (() => void) | null = null;
let authSessionChangeHandler: ((session: AuthSession | null) => void) | null = null;

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

httpClient.interceptors.request.use(async (config) => {
  const accessToken = getAccessToken();
  const csrfToken = typeof cookieStore === 'undefined' ? null : await cookieStore.get('csrf-token');

  if (accessToken && !config.skipAuthRefresh) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  if (csrfToken?.value) {
    config.headers['X-CSRF-TOKEN'] = decodeURIComponent(csrfToken.value);
  }

  return config;
});

httpClient.interceptors.response.use(
  (response) => {
    const data = response.data;

    if (data?.accessToken) {
      updateAuthSession({ accessToken: data.accessToken, user: data.user });
    }

    return response;
  },
  async (error: AxiosError) => {
    const config = error.config;

    if (
      error.response?.status !== 401 ||
      !config ||
      config.skipAuthRefresh ||
      config._retry ||
      !getAccessToken()
    ) {
      return Promise.reject(error);
    }

    config._retry = true;

    try {
      const accessToken = await refreshAccessToken();
      config.headers.Authorization = `Bearer ${accessToken}`;
      return httpClient(config);
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
  },
);

export function getAccessToken() {
  return getAuthSession()?.accessToken ?? null;
}

export function clearAccessToken() {
  localStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
  localStorage.removeItem(LEGACY_ACCESS_TOKEN_STORAGE_KEY);
  authSessionChangeHandler?.(null);
}

export function getAuthSession(): AuthSession | null {
  const storedSession = localStorage.getItem(AUTH_SESSION_STORAGE_KEY);

  if (storedSession) {
    try {
      const session = JSON.parse(storedSession) as Partial<AuthSession>;

      if (typeof session.accessToken === 'string' && session.accessToken) {
        return {
          accessToken: session.accessToken,
          user: session.user ?? null,
        };
      }
    } catch {
      localStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
    }
  }

  const legacyAccessToken = localStorage.getItem(LEGACY_ACCESS_TOKEN_STORAGE_KEY);

  if (!legacyAccessToken) {
    return null;
  }

  const session = { accessToken: legacyAccessToken, user: null } satisfies AuthSession;
  saveAuthSession(session);
  localStorage.removeItem(LEGACY_ACCESS_TOKEN_STORAGE_KEY);
  return session;
}

export function saveAuthSession(session: AuthSession) {
  localStorage.setItem(AUTH_SESSION_STORAGE_KEY, JSON.stringify(session));
  authSessionChangeHandler?.(session);
}

export function updateAuthSession(update: Partial<AuthSession>) {
  const currentSession = getAuthSession();

  if (!currentSession && !update.accessToken) {
    return;
  }

  saveAuthSession({
    accessToken: update.accessToken ?? currentSession!.accessToken,
    user: update.user !== undefined ? update.user : currentSession?.user ?? null,
  });
}

export function registerAuthSessionChangeHandler(handler: (session: AuthSession | null) => void) {
  authSessionChangeHandler = handler;

  return () => {
    if (authSessionChangeHandler === handler) {
      authSessionChangeHandler = null;
    }
  };
}

export function isAccessTokenExpired(accessToken: string) {
  try {
    const encodedPayload = accessToken.split('.')[1];

    if (!encodedPayload) {
      return true;
    }

    const payload = JSON.parse(atob(encodedPayload.replaceAll('-', '+').replaceAll('_', '/'))) as {
      exp?: unknown;
    };

    return typeof payload.exp !== 'number' || payload.exp <= Date.now() / 1000;
  } catch {
    return true;
  }
}

export function registerAuthRefreshFailureHandler(handler: () => void) {
  authRefreshFailureHandler = handler;

  return () => {
    if (authRefreshFailureHandler === handler) {
      authRefreshFailureHandler = null;
    }
  };
}

export function refreshAccessToken() {
  if (!refreshPromise) {
    refreshPromise = httpClient
      .post<TokenResponse>('/admin/auth/refresh', undefined, {
        skipAuthRefresh: true,
      })
      .then((response) => {
        const accessToken = response.data.accessToken;

        if (!accessToken) {
          throw new Error('Refresh response did not include an access token');
        }

        updateAuthSession({ accessToken, user: response.data.user });
        return accessToken;
      })
      .catch((error) => {
        clearAccessToken();
        authRefreshFailureHandler?.();
        throw error;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}

export type ErrorType<Error> = AxiosError<Error>;

export type BodyType<BodyData> = BodyData;
