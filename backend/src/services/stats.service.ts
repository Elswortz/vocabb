import type { SupabaseClient } from "@supabase/supabase-js";

export const getStats = async (client: SupabaseClient) => {
  const { data, error } = await client.rpc("get_user_stats");

  if (error) {
    throw error;
  }

  return data?.[0] ?? null;
};

export const getUserActivity = async (client: SupabaseClient, days: number) => {
  const { data, error } = await client.rpc("get_user_activity", {
    p_days: days,
  });

  if (error) {
    throw error;
  }

  return data ?? [];
};

export const getUserStreak = async (
  client: SupabaseClient,
  dailyGoal: number = 20,
) => {
  const { data, error } = await client.rpc("get_user_streak", {
    p_daily_goal: dailyGoal,
  });

  if (error) {
    throw error;
  }

  return data?.[0] ?? null;
};
