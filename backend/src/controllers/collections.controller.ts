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

import { getAuthContext } from "../utils/getAuthContext.js";

export const createCollectionController = async (
  _req: Request,
  res: Response,
) => {
  const { user, client } = getAuthContext(res);
  const { name, description } = res.locals.body;

  const collection = await createCollection(client, user.id, name, description);

  res.status(201).json(collection);
};

export const getCollectionsController = async (
  _req: Request,
  res: Response,
) => {
  const { user, client } = getAuthContext(res);
  const { page, limit } = res.locals.query;

  const result = await getCollections(client, user.id, page, limit);

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
  const { user, client } = getAuthContext(res);
  const { id } = res.locals.params;

  const collection = await getCollectionById(client, user.id, id);

  res.json(collection);
};

export const addWordToCollectionController = async (
  _req: Request,
  res: Response,
) => {
  const { user, client } = getAuthContext(res);
  const { id: collectionId } = res.locals.params;
  const { word_id: wordId } = res.locals.body;

  const collectionWord = await addWordToCollection(
    client,
    user.id,
    collectionId,
    wordId,
  );

  res.status(201).json(collectionWord);
};

export const getCollectionWordsController = async (
  _req: Request,
  res: Response,
) => {
  const { user, client } = getAuthContext(res);
  const { id: collectionId } = res.locals.params;
  const { page, limit } = res.locals.query;

  const result = await getCollectionWords(
    client,
    user.id,
    collectionId,
    page,
    limit,
  );

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
  const { user, client } = getAuthContext(res);
  const { id: collectionId, wordId } = res.locals.params;

  await removeWordFromCollection(client, user.id, collectionId, wordId);

  res.status(204).send();
};

export const updateCollectionController = async (
  _req: Request,
  res: Response,
) => {
  const { user, client } = getAuthContext(res);
  const { id: collectionId } = res.locals.params;

  const collection = await updateCollection(
    client,
    user.id,
    collectionId,
    res.locals.body,
  );

  res.json(collection);
};

export const deleteCollectionController = async (
  _req: Request,
  res: Response,
) => {
  const { user, client } = getAuthContext(res);
  const { id: collectionId } = res.locals.params;

  await deleteCollection(client, user.id, collectionId);

  res.status(204).send();
};
