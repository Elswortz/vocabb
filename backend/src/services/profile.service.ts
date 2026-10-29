import type { SupabaseClient } from "@supabase/supabase-js";

import { AppError } from "../errors/AppError.js";
import type { Profile, UserRole } from "../types/profile.types.js";

interface UpdateProfileData {
  username?: string;
  display_name?: string;
  avatar_url?: string | null;
}

export const getProfile = async (
  client: SupabaseClient,
  userId: string,
): Promise<Profile> => {
  const { data, error } = await client
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

export const getUserRole = async (
  client: SupabaseClient,
  userId: string,
): Promise<UserRole> => {
  const { data, error } = await client
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      throw new AppError("Profile not found", 404);
    }

    throw error;
  }

  if (data.role !== "admin" && data.role !== "user") {
    throw new AppError("Invalid profile role", 500);
  }

  return data.role;
};

export const updateProfile = async (
  client: SupabaseClient,
  userId: string,
  data: UpdateProfileData,
): Promise<Profile> => {
  const { data: profile, error } = await client
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
