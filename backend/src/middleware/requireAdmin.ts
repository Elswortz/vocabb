import type { NextFunction, Request, Response } from "express";

import { AppError } from "../errors/AppError.js";
import { getAuthContext } from "../utils/getAuthContext.js";

export const requireAdmin = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { user, client } = getAuthContext(res);

    const { data: profile, error } = await client
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
