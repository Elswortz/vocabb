import { supabase } from "../db/supabase.js";
import type { Profile } from "../types/profile.types.js";

interface UpdateProfileData {
  username?: string;
  display_name?: string;
  avatar_url?: string | null;
}

export const getProfile = async (userId: string): Promise<Profile> => {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, username, display_name, avatar_url")
    .eq("id", userId)
    .single();

  if (error) {
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
    .select("id, username, display_name, avatar_url")
    .single();

  if (error) {
    throw error;
  }

  return profile;
};
