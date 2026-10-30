import type { Request, Response } from "express";

import {
  createDefinition,
  updateDefinition,
  deleteDefinition,
} from "../services/definitions.service.js";

export const createDefinitionController = async (
  _req: Request,
  res: Response,
) => {
  const {
    word_id: wordId,
    part_of_speech_id: partOfSpeechId,
    definition,
  } = res.locals.body;

  const result = await createDefinition(wordId, partOfSpeechId, definition);

  res.status(201).json(result);
};

export const updateDefinitionController = async (
  _req: Request,
  res: Response,
) => {
  const { id } = res.locals.params;
  const result = await updateDefinition(id, res.locals.body);

  res.json(result);
};

export const deleteDefinitionController = async (
  _req: Request,
  res: Response,
) => {
  const { id } = res.locals.params;
  await deleteDefinition(id);

  res.status(204).send();
};
