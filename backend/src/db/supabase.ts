import { createClient } from "@supabase/supabase-js";

import { env } from "../config/env.js";

export const supabase = createClient(env.supabaseUrl, env.supabaseKey);

export const supabaseAdmin = createClient(
  env.supabaseUrl,
  env.supabaseServiceRoleKey,
);

export const createUserSupabaseClient = (accessToken: string) => {
  return createClient(env.supabaseUrl, env.supabaseKey, {
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
};
