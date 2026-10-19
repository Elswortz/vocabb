import type { Request, Response } from "express";
import { setRefreshCookie, clearRefreshCookie } from "../utils/authCookie.js";
import { toPublicAuthResponse } from "../utils/toPublicAuthResponse.js";
import { REFRESH_COOKIE_NAME } from "../config/authCookie.js";

import {
  registerUser,
  loginUser,
  getCurrentUser,
  refreshUser,
} from "../services/auth.service.js";

import { AppError } from "../errors/AppError.js";

export const registerController = async (_req: Request, res: Response) => {
  const result = await registerUser(res.locals.body);

  if (result.session) {
    setRefreshCookie(res, result.session.refresh_token);
  }

  res.status(201).json(toPublicAuthResponse(result));
};

export const loginController = async (_req: Request, res: Response) => {
  const result = await loginUser(res.locals.body);

  if (result.session) {
    setRefreshCookie(res, result.session.refresh_token);
  }

  res.json(toPublicAuthResponse(result));
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

export const refreshController = async (req: Request, res: Response) => {
  const refreshToken = req.cookies?.[REFRESH_COOKIE_NAME];

  if (!refreshToken) {
    clearRefreshCookie(res);

    throw new AppError("Refresh token is required", 401);
  }

  let result;

  try {
    result = await refreshUser(refreshToken);
  } catch (error) {
    if (error instanceof AppError && error.statusCode === 401) {
      clearRefreshCookie(res);
    }
    throw error;
  }

  if (!result.session) {
    clearRefreshCookie(res);

    throw new AppError("Failed to refresh session", 401);
  }

  setRefreshCookie(res, result.session.refresh_token);

  res.json(toPublicAuthResponse(result));
};

export const logoutController = async (_req: Request, res: Response) => {
  clearRefreshCookie(res);

  res.status(204).send();
};
