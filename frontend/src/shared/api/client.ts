import axios, { type InternalAxiosRequestConfig } from "axios";
import { tokenStorage } from "./tokenStorage";
import { authEvents } from "./authEvents";

interface RefreshResponse {
  user: {
    id: string;
    email: string;
  };
  session: {
    access_token: string;
    expires_at: number;
  } | null;
}

type RetryConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const refreshClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const accessToken = tokenStorage.get();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  if (!refreshPromise) {
    refreshPromise = refreshClient
      .post<RefreshResponse>("auth/refresh")
      .then(({ data }) => {
        const token = data.session?.access_token ?? null;
        if (token) {
          tokenStorage.set(token);
        } else {
          tokenStorage.clear();
          authEvents.notifyFailure();
        }
        return token;
      })
      .catch(() => {
        tokenStorage.clear();
        authEvents.notifyFailure();
        return null;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    if (!axios.isAxiosError(error) || !error.config) {
      return Promise.reject(error);
    }

    const config = error.config as RetryConfig;

    if (
      error.response?.status !== 401 ||
      config._retry ||
      config.url?.includes("/auth/refresh") ||
      config.url?.includes("/auth/login") ||
      config.url?.includes("/auth/register")
    ) {
      return Promise.reject(error);
    }

    config._retry = true;

    const token = await refreshAccessToken();

    if (!token) {
      return Promise.reject(error);
    }

    config.headers.Authorization = `Bearer ${token}`;

    return apiClient(config);
  },
);
