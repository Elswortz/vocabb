import type { Response } from "express";
import type { SupabaseClient, User } from "@supabase/supabase-js";

import { AppError } from "../errors/AppError.js";

interface AuthContext {
  user: User;
  client: SupabaseClient;
}

export const getAuthContext = (res: Response): AuthContext => {
  const user = res.locals.user;
  const client = res.locals.supabase;

  if (!user || !client) {
    throw new AppError("Unauthorized", 401);
  }

  return {
    user,
    client,
  };
};
