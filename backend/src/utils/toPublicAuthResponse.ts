import type { AuthResponse, PublicAuthResponse } from "../types/auth.types.js";

export const toPublicAuthResponse = (
  result: AuthResponse,
): PublicAuthResponse => {
  return {
    user: result.user,
    session: result.session
      ? {
          access_token: result.session.access_token,
          expires_at: result.session.expires_at,
        }
      : null,
  };
};
