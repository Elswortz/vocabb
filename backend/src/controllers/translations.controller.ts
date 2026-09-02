import type { Request, Response } from "express";

import { createTranslation } from "../services/translations.service.js";

export const createTranslationController = async (
  _req: Request,
  res: Response,
) => {
  const {
    word_id: wordId,
    language_id: languageId,
    translation,
  } = res.locals.body;

  const result = await createTranslation(wordId, languageId, translation);

  res.status(201).json(result);
};
