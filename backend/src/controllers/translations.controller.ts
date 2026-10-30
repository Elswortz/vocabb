import type { Request, Response } from "express";

import {
  createTranslation,
  updateTranslation,
  deleteTranslation,
} from "../services/translations.service.js";

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

export const updateTranslationController = async (
  _req: Request,
  res: Response,
) => {
  const { id } = res.locals.params;
  const result = await updateTranslation(id, res.locals.body);

  res.json(result);
};

export const deleteTranslationController = async (
  _req: Request,
  res: Response,
) => {
  const { id } = res.locals.params;
  await deleteTranslation(id);

  res.status(204).send();
};
