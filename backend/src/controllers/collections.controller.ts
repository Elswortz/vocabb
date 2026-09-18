import type { Request, Response } from "express";

import {
  createCollection,
  getCollections,
  getCollectionById,
  addWordToCollection,
  getCollectionWords,
  removeWordFromCollection,
  updateCollection,
  deleteCollection,
} from "../services/collections.service.js";

export const createCollectionController = async (
  _req: Request,
  res: Response,
) => {
  const userId = res.locals.user.id;
  const { name, description } = res.locals.body;

  const collection = await createCollection(userId, name, description);

  res.status(201).json(collection);
};

export const getCollectionsController = async (
  _req: Request,
  res: Response,
) => {
  const userId = res.locals.user.id;
  const { page, limit } = res.locals.query;

  const result = await getCollections(userId, page, limit);

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

export const getCollectionByIdController = async (
  _req: Request,
  res: Response,
) => {
  const userId = res.locals.user.id;
  const { id } = res.locals.params;

  const collection = await getCollectionById(userId, id);

  res.json(collection);
};

export const addWordToCollectionController = async (
  _req: Request,
  res: Response,
) => {
  const userId = res.locals.user.id;
  const { id: collectionId } = res.locals.params;
  const { word_id: wordId } = res.locals.body;

  const collectionWord = await addWordToCollection(
    userId,
    collectionId,
    wordId,
  );

  res.status(201).json(collectionWord);
};

export const getCollectionWordsController = async (
  _req: Request,
  res: Response,
) => {
  const userId = res.locals.user.id;
  const { id: collectionId } = res.locals.params;
  const { page, limit } = res.locals.query;

  const result = await getCollectionWords(userId, collectionId, page, limit);

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

export const removeWordFromCollectionController = async (
  _req: Request,
  res: Response,
) => {
  const userId = res.locals.user.id;
  const { id: collectionId, wordId } = res.locals.params;

  await removeWordFromCollection(userId, collectionId, wordId);

  res.status(204).send();
};

export const updateCollectionController = async (
  _req: Request,
  res: Response,
) => {
  const userId = res.locals.user.id;
  const { id: collectionId } = res.locals.params;

  const collection = await updateCollection(
    userId,
    collectionId,
    res.locals.body,
  );

  res.json(collection);
};

export const deleteCollectionController = async (
  _req: Request,
  res: Response,
) => {
  const userId = res.locals.user.id;
  const { id: collectionId } = res.locals.params;

  await deleteCollection(userId, collectionId);

  res.status(204).send();
};
