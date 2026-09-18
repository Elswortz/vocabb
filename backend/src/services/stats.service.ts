import { supabase } from "../db/supabase.js";

export const getStats = async () => {
  const { data, error } = await supabase.rpc("get_user_stats");

  if (error) {
    throw error;
  }

  return data?.[0] ?? null;
};

export const getUserActivity = async (days: number) => {
  const { data, error } = await supabase.rpc("get_user_activity", {
    p_days: days,
  });

  if (error) {
    throw error;
  }

  return data ?? [];
};

export const getUserStreak = async (dailyGoal: number = 20) => {
  const { data, error } = await supabase.rpc("get_user_streak", {
    p_daily_goal: dailyGoal,
  });

  if (error) {
    throw error;
  }

  return data?.[0] ?? null;
};
