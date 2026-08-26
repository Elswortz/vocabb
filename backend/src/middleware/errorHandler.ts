import type { NextFunction, Request, Response } from "express";

import { AppError } from "../errors/AppError.js";

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.error(error);

  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      message: error.message,
    });

    return;
  }

  res.status(500).json({
    message: "Internal server error",
  });
};
