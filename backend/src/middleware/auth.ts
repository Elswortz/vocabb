import type { NextFunction, Request, Response } from "express";
import { supabase } from "../db/supabase.js";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({
        message: "Authorization header is required",
      });

      return;
    }

    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
      res.status(401).json({
        message: "Invalid authorization format",
      });

      return;
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      res.status(401).json({
        message: "Invalid or expired token",
      });

      return;
    }

    res.locals.user = user;
    res.locals.accessToken = token;

    next();
  } catch (error) {
    next(error);
  }
};
