export interface AuthUser {
  id: string;
  email: string;
}

export interface AuthSession {
  access_token: string;
  refresh_token: string;
  expires_at: number;
}

export interface PublicAuthSession {
  access_token: string;
  expires_at: number;
}

export interface AuthResponse {
  user: AuthUser;
  session: AuthSession | null;
}

export interface PublicAuthResponse {
  user: AuthUser;
  session: PublicAuthSession | null;
}
