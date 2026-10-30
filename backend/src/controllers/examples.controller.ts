import type { Request, Response } from "express";

import {
  createExample,
  updateExample,
  deleteExample,
} from "../services/examples.service.js";

export const createExampleController = async (_req: Request, res: Response) => {
  const {
    definition_id: definitionId,
    example_text: exampleText,
    translation,
  } = res.locals.body;

  const result = await createExample(definitionId, exampleText, translation);

  res.status(201).json(result);
};

export const updateExampleController = async (_req: Request, res: Response) => {
  const { id } = res.locals.params;
  const result = await updateExample(id, res.locals.body);

  res.json(result);
};

export const deleteExampleController = async (_req: Request, res: Response) => {
  const { id } = res.locals.params;
  await deleteExample(id);

  res.status(204).send();
};
