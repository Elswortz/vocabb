import { supabase } from "../db/supabase.js";

export const getStats = async (userId: string) => {
  const { data, error } = await supabase.rpc("get_user_stats", {
    p_user_id: userId,
  });

  if (error) {
    throw error;
  }

  return data?.[0] ?? null;
};

export const getUserActivity = async (userId: string, days: number) => {
  const { data, error } = await supabase.rpc("get_user_activity", {
    p_user_id: userId,
    p_days: days,
  });

  if (error) {
    throw error;
  }

  return data ?? [];
};

export const getUserStreak = async (userId: string, dailyGoal: number = 20) => {
  const { data, error } = await supabase.rpc("get_user_streak", {
    p_user_id: userId,
    p_daily_goal: dailyGoal,
  });

  if (error) {
    throw error;
  }

  return data?.[0] ?? null;
};
