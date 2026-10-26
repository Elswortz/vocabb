import axios from "axios";

interface ApiErrorResponse {
  message?: string;
  error?: string;
}

type AuthErrorContext = "login" | "register";

export function getAuthErrorMessage(
  error: unknown,
  context: AuthErrorContext,
  fallback = "Something went wrong. Please try again.",
): string {
  if (!axios.isAxiosError<ApiErrorResponse>(error)) {
    return fallback;
  }

  if (!error.response) {
    return "Unable to connect to the server. Check your internet connection and try again.";
  }

  const status = error.response.status;

  if (status === 400) {
    return context === "login"
      ? "Invalid email or password. Please check your credentials and try again."
      : "Please check your registration details and try again.";
  }

  if (status === 401) {
    return "Invalid email or password. Please check your credentials and try again.";
  }

  if (status === 403) {
    return "Access denied. Please check your account status.";
  }

  if (status === 409) {
    return context === "register"
      ? "An account with this email or username already exists."
      : "This action conflicts with the current account state.";
  }

  if (status === 429) {
    return "Too many attempts. Please wait a moment and try again.";
  }

  if (status >= 500) {
    return "The server is temporarily unavailable. Please try again later.";
  }

  return fallback;
}
