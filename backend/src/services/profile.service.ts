import { supabase } from "../db/supabase.js";
import { AppError } from "../errors/AppError.js";

import type { Profile } from "../types/profile.types.js";

interface UpdateProfileData {
  username?: string;
  display_name?: string;
  avatar_url?: string | null;
}

export const getProfile = async (userId: string): Promise<Profile> => {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, username, display_name, avatar_url, role")
    .eq("id", userId)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      throw new AppError("Profile not found", 404);
    }

    throw error;
  }

  return data;
};

export const updateProfile = async (
  userId: string,
  data: UpdateProfileData,
): Promise<Profile> => {
  const { data: profile, error } = await supabase
    .from("profiles")
    .update(data)
    .eq("id", userId)
    .select("id, username, display_name, avatar_url, role")
    .single();

  if (error) {
    if (error.code === "23505") {
      throw new AppError("Username already exists", 409);
    }

    if (error.code === "PGRST116") {
      throw new AppError("Profile not found", 404);
    }

    throw error;
  }

  return profile;
};
