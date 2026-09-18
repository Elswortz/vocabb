import type { Request, Response } from "express";

import { getLanguages } from "../services/languages.service.js";

export const getLanguagesController = async (_req: Request, res: Response) => {
  const languages = await getLanguages();

  res.json(languages);
};
