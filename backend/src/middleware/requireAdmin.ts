import type { NextFunction, Request, Response } from "express";
import { supabase } from "../db/supabase.js";
import { AppError } from "../errors/AppError.js";

export const requireAdmin = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = res.locals.user;

    if (!user) {
      throw new AppError("Unauthorized", 401);
    }

    const { data: profile, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        throw new AppError("Profile not found", 404);
      }

      throw error;
    }

    if (profile.role !== "admin") {
      throw new AppError("Admin access required", 403);
    }

    next();
  } catch (error) {
    next(error);
  }
};
