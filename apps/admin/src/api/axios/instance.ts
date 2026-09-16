import axios, { AxiosError } from 'axios';

declare module 'axios' {
  interface AxiosRequestConfig {
    skipAuthRefresh?: boolean;
    _retry?: boolean;
  }
}

type TokenResponse = {
  accessToken?: string;
};

let refreshPromise: Promise<string> | null = null;
let authRefreshFailureHandler: (() => void) | null = null;

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

httpClient.interceptors.request.use(async (config) => {
  const accessToken = localStorage.getItem('accessToken');
  const csrfToken = typeof cookieStore === 'undefined' ? null : await cookieStore.get('csrf-token');

  if (accessToken && !config.skipAuthRefresh) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  if (csrfToken) {
    config.headers['X-CSRF-TOKEN'] = csrfToken;
  }

  return config;
});

httpClient.interceptors.response.use(
  (response) => {
    const data = response.data;

    if (data?.accessToken) {
      localStorage.setItem('accessToken', data.accessToken);
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
  return localStorage.getItem('accessToken');
}

export function clearAccessToken() {
  localStorage.removeItem('accessToken');
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
      .post<TokenResponse>('/auth/refresh', undefined, {
        skipAuthRefresh: true,
      })
      .then((response) => {
        const accessToken = response.data.accessToken;

        if (!accessToken) {
          throw new Error('Refresh response did not include an access token');
        }

        localStorage.setItem('accessToken', accessToken);
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
