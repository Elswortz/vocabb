import { Router } from "express";

import { getPartsOfSpeechController } from "../controllers/parts-of-speech.controller.js";

const router = Router();

router.get("/", getPartsOfSpeechController);

export default router;
