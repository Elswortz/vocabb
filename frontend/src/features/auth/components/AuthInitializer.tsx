import { useEffect, useRef, type ReactNode } from "react";

import { refreshSession } from "../api/auth.api";
import { useAuth } from "../hooks/useAuth";

interface AuthInitializerProps {
  children: ReactNode;
}

export function AuthInitializer({ children }: AuthInitializerProps) {
  const { setAuth, clearAuth, setIsLoading } = useAuth();
  const hasStarted = useRef(false);

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    const initializeAuth = async () => {
      try {
        const response = await refreshSession();

        if (response.session) {
          setAuth(response.user, response.session.access_token);
        } else {
          clearAuth();
        }
      } catch {
        clearAuth();
      } finally {
        setIsLoading(false);
      }
    };

    void initializeAuth();
  }, [setAuth, clearAuth, setIsLoading]);

  return children;
}
