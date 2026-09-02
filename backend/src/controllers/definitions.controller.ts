import type { Request, Response } from "express";

import { createDefinition } from "../services/definitions.service.js";

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
