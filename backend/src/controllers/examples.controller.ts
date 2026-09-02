import type { Request, Response } from "express";

import { createExample } from "../services/examples.service.js";

export const createExampleController = async (_req: Request, res: Response) => {
  const {
    definition_id: definitionId,
    example_text: exampleText,
    translation,
  } = res.locals.body;

  const result = await createExample(definitionId, exampleText, translation);

  res.status(201).json(result);
};
