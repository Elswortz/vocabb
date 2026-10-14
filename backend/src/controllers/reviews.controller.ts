import type { Request, Response } from "express";

import { reviewWord } from "../services/reviews.service.js";
import { getAuthContext } from "../utils/getAuthContext.js";

export const reviewWordController = async (_req: Request, res: Response) => {
  const { client } = getAuthContext(res);

  const result = await reviewWord(client, res.locals.body);

  res.status(201).json(result);
};
