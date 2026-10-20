import { useCallback, useState, useEffect, type ReactNode } from "react";
import { AuthContext } from "./auth-context";
import { authEvents } from "@/shared/api/authEvents";
import type { AuthUser } from "../types/auth.types";
import { tokenStorage } from "@/shared/api/tokenStorage";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const setAuth = useCallback((nextUser: AuthUser, token: string) => {
    setUser(nextUser);
    setAccessToken(token);
    tokenStorage.set(token);
  }, []);

  const clearAuth = useCallback(() => {
    setUser(null);
    setAccessToken(null);
    tokenStorage.clear();
  }, []);

  useEffect(() => {
    authEvents.setHandler(clearAuth);

    return () => {
      authEvents.clearHandler();
    };
  }, [clearAuth]);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isAuthenticated: Boolean(user && accessToken),
        isLoading,
        setAuth,
        clearAuth,
        setIsLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
