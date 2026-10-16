import type { Request, Response } from "express";

import {
  registerUser,
  loginUser,
  getCurrentUser,
} from "../services/auth.service.js";

import { AppError } from "../errors/AppError.js";

export const registerController = async (_req: Request, res: Response) => {
  const result = await registerUser(res.locals.body);
  res.status(201).json(result);
};

export const loginController = async (_req: Request, res: Response) => {
  const result = await loginUser(res.locals.body);
  res.json(result);
};

export const getCurrentUserController = async (
  _req: Request,
  res: Response,
) => {
  const token = res.locals.accessToken;

  if (!token) {
    throw new AppError("Unauthorized", 401);
  }

  const user = await getCurrentUser(token);

  res.json({
    user,
  });
};
