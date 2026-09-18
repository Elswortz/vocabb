import type { AuthError } from "@supabase/supabase-js";
import { AppError } from "./AppError.js";

export const mapAuthError = (error: AuthError): AppError => {
  switch (error.code) {
    case "invalid_credentials":
      return new AppError("Invalid email or password", 401);

    case "email_not_confirmed":
      return new AppError("Email is not confirmed", 401);

    case "email_exists":
    case "user_already_exists":
      return new AppError("User with this email already exists", 409);

    case "weak_password":
      return new AppError("Password is too weak", 400);

    case "email_address_invalid":
      return new AppError("Invalid email address", 400);

    case "validation_failed":
      return new AppError("Invalid authentication data", 400);

    case "over_request_rate_limit":
    case "over_email_send_rate_limit":
      return new AppError("Too many requests. Please try again later", 429);

    default:
      return new AppError("Authentication failed", 500);
  }
};
