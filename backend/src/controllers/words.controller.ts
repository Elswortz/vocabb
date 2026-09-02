import type { Request, Response } from "express";
import { AppError } from "../errors/AppError.js";

import {
  getWordById,
  getWords,
  createWord,
  updateWord,
  deleteWord,
} from "../services/words.service.js";

export const getWordsController = async (_req: Request, res: Response) => {
  const {
    search,
    language_id: languageId,
    page = 1,
    limit = 20,
  } = res.locals.query;

  const result = await getWords({
    search,
    languageId,
    page,
    limit,
  });

  const totalPages = Math.ceil(result.total / limit);

  res.json({
    data: result.data,
    meta: {
      page,
      limit,
      total: result.total,
      totalPages,
      hasNext: page < totalPages,
      hasPrevious: page > 1,
    },
  });
};

export const getWordByIdController = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    throw new AppError("Invalid word id", 400);
  }

  const word = await getWordById(id);

  res.json(word);
};

export const createWordController = async (_req: Request, res: Response) => {
  const word = await createWord(res.locals.body);

  res.status(201).json(word);
};

export const updateWordController = async (_req: Request, res: Response) => {
  const { id } = res.locals.params;

  const word = await updateWord(id, res.locals.body);

  res.json(word);
};

export const deleteWordController = async (_req: Request, res: Response) => {
  const { id } = res.locals.params;

  await deleteWord(id);

  res.status(204).send();
};
