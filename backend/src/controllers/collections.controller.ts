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

  const result = await createCollection(userId, name, description);

  res.status(201).json(result);
};

export const getCollectionsController = async (
  _req: Request,
  res: Response,
) => {
  const userId = res.locals.user.id;

  const { page, limit } = res.locals.query;

  const result = await getCollections(userId, page, limit);

  res.json(result);
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

  const result = await addWordToCollection(userId, collectionId, wordId);

  res.status(201).json(result);
};

export const getCollectionWordsController = async (
  _req: Request,
  res: Response,
) => {
  const userId = res.locals.user.id;

  const { id: collectionId } = res.locals.params;

  const { page, limit } = res.locals.query;

  const result = await getCollectionWords(userId, collectionId, page, limit);

  res.json(result);
};

export const removeWordFromCollectionController = async (
  _req: Request,
  res: Response,
) => {
  const userId = res.locals.user.id;

  const { id: collectionId, wordId } = res.locals.params;

  const result = await removeWordFromCollection(userId, collectionId, wordId);

  res.json(result);
};

export const updateCollectionController = async (
  _req: Request,
  res: Response,
) => {
  const userId = res.locals.user.id;

  const { id: collectionId } = res.locals.params;
  const data = res.locals.body;

  const result = await updateCollection(userId, collectionId, data);

  res.json(result);
};

export const deleteCollectionController = async (
  _req: Request,
  res: Response,
) => {
  const userId = res.locals.user.id;
  const { id: collectionId } = res.locals.params;

  const result = await deleteCollection(userId, collectionId);

  res.json(result);
};
