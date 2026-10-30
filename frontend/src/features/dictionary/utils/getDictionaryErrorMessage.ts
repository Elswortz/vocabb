import axios from "axios";

interface ApiErrorResponse {
  message?: string;
}

export function getDictionaryErrorMessage(error: unknown): string {
  if (!axios.isAxiosError<ApiErrorResponse>(error)) {
    return "Something went wrong. Please try again.";
  }

  if (!error.response) {
    return "Unable to connect to the server. Check your connection and try again.";
  }

  return (
    error.response.data?.message ??
    "Unable to complete this action. Please try again."
  );
}
