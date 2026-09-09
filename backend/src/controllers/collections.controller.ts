import type { Request, Response } from "express";
import {
  createCollection,
  getCollections,
  getCollectionById,
  addWordToCollection,
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
