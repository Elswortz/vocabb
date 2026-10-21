import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../hooks/useAuth";
import { login, register, logout } from "./auth.api";
import type { LoginRequest, RegisterRequest } from "../types/auth.types";

export function useLoginMutation() {
  const { setAuth } = useAuth();

  return useMutation({
    mutationFn: (data: LoginRequest) => login(data),

    onSuccess: (response) => {
      if (response.session) {
        setAuth(response.user, response.session.access_token);
      }
    },
  });
}

export function useRegisterMutation() {
  const { setAuth } = useAuth();

  return useMutation({
    mutationFn: (data: RegisterRequest) => register(data),

    onSuccess: (response) => {
      if (response.session) {
        setAuth(response.user, response.session.access_token);
      }
    },
  });
}

export function useLogoutMutation() {
  const { clearAuth } = useAuth();

  return useMutation({
    mutationFn: logout,

    onSettled: () => {
      clearAuth();
    },
  });
}
