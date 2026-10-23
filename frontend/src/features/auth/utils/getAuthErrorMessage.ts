import axios from "axios";

interface ApiErrorResponse {
  message?: string;
  error?: string;
}

export function getAuthErrorMessage(
  error: unknown,
  fallback = "Something went wrong. Please try again.",
): string {
  if (!axios.isAxiosError<ApiErrorResponse>(error)) {
    return fallback;
  }

  if (!error.response) {
    return "Unable to connect to the server. Check your internet connection and try again.";
  }

  const status = error.response.status;
  const message = error.response.data?.message ?? error.response.data?.error;

  if (status === 400 || status === 401) {
    return "Invalid email or password. Please check your credentials and try again.";
  }

  if (status === 403) {
    return "Access denied. Please check your account status.";
  }

  if (status === 409) {
    return "An account with these details already exists.";
  }

  if (status >= 500) {
    return "The server is temporarily unavailable. Please try again later.";
  }

  if (message && status >= 400) {
    return message;
  }

  return fallback;
}
