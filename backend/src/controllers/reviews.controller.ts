import type { Request, Response } from "express";

import { reviewWord } from "../services/reviews.service.js";

export const reviewWordController = async (_req: Request, res: Response) => {
  const result = await reviewWord(res.locals.body);

  res.status(201).json(result);
};
