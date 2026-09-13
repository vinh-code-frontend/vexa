import axios, { AxiosError } from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  const accessToken = localStorage.getItem('accessToken');
  const csrfToken = await cookieStore.get('csrf-token');

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  if (csrfToken) {
    config.headers['X-CSRF-TOKEN'] = csrfToken;
  }

  return config;
});

api.interceptors.response.use((response) => {
  const data = response.data;

  // Login / refresh token returns accessToken
  if (data?.accessToken) {
    localStorage.setItem('accessToken', data.accessToken);
  }

  return response;
});

export type ErrorType<Error> = AxiosError<Error>;

export type BodyType<BodyData> = BodyData;
