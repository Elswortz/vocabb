import type { Request, Response } from "express";

import {
  getUserWords,
  getUserWordById,
  createUserWord,
  deleteUserWord,
} from "../services/user-words.service.js";

export const getUserWordsController = async (_req: Request, res: Response) => {
  const userId = res.locals.user.id;

  const { search, page, limit } = res.locals.query;

  const result = await getUserWords(userId, search, page, limit);

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

export const getUserWordByIdController = async (
  _req: Request,
  res: Response,
) => {
  const userId = res.locals.user.id;
  const { id } = res.locals.params;

  const word = await getUserWordById(userId, id);

  res.json(word);
};

export const createUserWordController = async (
  _req: Request,
  res: Response,
) => {
  const userId = res.locals.user.id;
  const { word_id: wordId } = res.locals.body;

  const word = await createUserWord(userId, wordId);

  res.status(201).json(word);
};

export const deleteUserWordController = async (
  _req: Request,
  res: Response,
) => {
  const userId = res.locals.user.id;
  const id = Number(res.locals.params.id);

  await deleteUserWord(userId, id);

  res.status(204).send();
};
