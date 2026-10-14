import { createClient } from "@supabase/supabase-js";

import { env } from "../config/env.js";

const serverAuthOptions = {
  persistSession: false,
  autoRefreshToken: false,
  detectSessionInUrl: false,
};

export const supabase = createClient(env.supabaseUrl, env.supabaseKey, {
  auth: serverAuthOptions,
});

export const supabaseAdmin = createClient(
  env.supabaseUrl,
  env.supabaseServiceRoleKey,
  {
    auth: serverAuthOptions,
  },
);

export const createAuthSupabaseClient = () => {
  return createClient(env.supabaseUrl, env.supabaseKey, {
    auth: serverAuthOptions,
  });
};

export const createUserSupabaseClient = (accessToken: string) => {
  return createClient(env.supabaseUrl, env.supabaseKey, {
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
    auth: serverAuthOptions,
  });
};
