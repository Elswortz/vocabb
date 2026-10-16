import type { Response } from "express";

import {
  REFRESH_COOKIE_NAME,
  refreshCookieOptions,
} from "../config/authCookie.js";

export const setRefreshCookie = (res: Response, refreshToken: string): void => {
  res.cookie(REFRESH_COOKIE_NAME, refreshToken, refreshCookieOptions);
};

export const clearRefreshCookie = (res: Response): void => {
  const { maxAge: _maxAge, ...clearOptions } = refreshCookieOptions;

  res.clearCookie(REFRESH_COOKIE_NAME, clearOptions);
};
