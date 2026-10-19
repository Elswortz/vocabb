import { apiClient } from "@/shared/api/client";

import type {
  AuthResponse,
  AuthUser,
  LoginRequest,
  RegisterRequest,
} from "../types/auth.types";

export const register = async (
  data: RegisterRequest,
): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>("/auth/register", data);

  return response.data;
};

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>("/auth/login", data);

  return response.data;
};

export const getCurrentUser = async (): Promise<{ user: AuthUser }> => {
  const response = await apiClient.get<{ user: AuthUser }>("/auth/me");

  return response.data;
};

export const refreshSession = async (): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>("/auth/refresh");

  return response.data;
};

export const logout = async (): Promise<void> => {
  await apiClient.post("/auth/logout");
};
