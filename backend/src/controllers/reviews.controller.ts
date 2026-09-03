import type { Request, Response } from "express";

import { reviewWord } from "../services/reviews.service.js";

export const reviewWordController = async (_req: Request, res: Response) => {
  try {
    const userId = res.locals.user.id;
    const result = await reviewWord(userId, res.locals.body);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);

    if (error instanceof Error && "statusCode" in error) {
      const statusCode = Number(
        (error as Error & { statusCode: number }).statusCode,
      );

      res.status(statusCode).json({
        message: error.message,
      });

      return;
    }

    res.status(500).json({
      message: "Failed to review word",
    });
  }
};
