import type { Request, Response } from "express";

import { getPartsOfSpeech } from "../services/parts-of-speech.service.js";

export const getPartsOfSpeechController = async (
  _req: Request,
  res: Response,
) => {
  const partsOfSpeech = await getPartsOfSpeech();

  res.json(partsOfSpeech);
};
