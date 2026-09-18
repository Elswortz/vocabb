import { supabase } from "../db/supabase.js";
import { AppError } from "../errors/AppError.js";
import { mapAuthError } from "../errors/mapAuthError.js";

import type {
  AuthResponse,
  AuthSession,
  AuthUser,
} from "../types/auth.types.js";

interface RegisterData {
  email: string;
  password: string;
  username: string;
  display_name: string;
}

interface LoginData {
  email: string;
  password: string;
}

const formatUser = (user: { id: string; email?: string }): AuthUser => {
  if (!user.email) {
    throw new AppError("User email is missing", 500);
  }

  return {
    id: user.id,
    email: user.email,
  };
};

const formatSession = (
  session: {
    access_token: string;
    refresh_token: string;
    expires_at?: number;
  } | null,
): AuthSession | null => {
  if (!session) {
    return null;
  }

  return {
    access_token: session.access_token,
    refresh_token: session.refresh_token,
    expires_at: session.expires_at ?? 0,
  };
};

export const registerUser = async ({
  email,
  password,
  username,
  display_name,
}: RegisterData): Promise<AuthResponse> => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
        display_name,
      },
    },
  });

  if (error) {
    throw mapAuthError(error);
  }

  if (!data.user) {
    throw new AppError("Failed to create user", 500);
  }

  return {
    user: formatUser(data.user),
    session: formatSession(data.session),
  };
};

export const loginUser = async ({
  email,
  password,
}: LoginData): Promise<AuthResponse> => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw mapAuthError(error);
  }

  if (!data.user) {
    throw new AppError("Failed to authenticate user", 500);
  }

  return {
    user: formatUser(data.user),
    session: formatSession(data.session),
  };
};

export const getCurrentUser = async (token: string): Promise<AuthUser> => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);

  if (error || !user) {
    throw new AppError("Invalid or expired token", 401);
  }

  return formatUser(user);
};
