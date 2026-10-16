import type { CookieOptions } from "express";

export const REFRESH_COOKIE_NAME = "vocabb_refresh";

const isProduction = process.env.NODE_ENV === "production";

const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

export const refreshCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: "lax",
  path: "/api/auth",
  maxAge: SEVEN_DAYS,
};
