import { createContext } from "react";
import type { AuthUser } from "../types/auth.types";

export interface AuthContextValue {
  user: AuthUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuth: (user: AuthUser, accessToken: string) => void;
  clearAuth: () => void;
  setIsLoading: (value: boolean) => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
