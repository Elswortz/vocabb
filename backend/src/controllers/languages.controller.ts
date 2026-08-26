import type { Request, Response } from "express";

import { getLanguages } from "../services/languages.service.js";

export const getLanguagesController = async (_req: Request, res: Response) => {
  try {
    const languages = await getLanguages();

    res.json(languages);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch languages",
    });
  }
};
