export interface AuthUser {
  id: string;
  email: string;
}

export interface AuthSession {
  access_token: string;
  expires_at: number;
}

export interface AuthResponse {
  user: AuthUser;
  session: AuthSession | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  username: string;
  display_name: string;
}
