import type { Request, Response } from "express";

import {
  getWordById,
  getWords,
  createWord,
  updateWord,
  deleteWord,
} from "../services/words.service.js";

export const getWordsController = async (_req: Request, res: Response) => {
  try {
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
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch words",
    });
  }
};

export const getWordByIdController = async (_req: Request, res: Response) => {
  try {
    const { id } = res.locals.params;

    const word = await getWordById(id);

    if (!word) {
      res.status(404).json({
        message: "Word not found",
      });
      return;
    }

    res.json(word);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch word",
    });
  }
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
