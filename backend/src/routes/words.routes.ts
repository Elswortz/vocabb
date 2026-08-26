import { Router } from "express";

import {
  createWordController,
  getWordByIdController,
  getWordsController,
  updateWordController,
  deleteWordController,
} from "../controllers/words.controller.js";

import { validate } from "../middleware/validate.js";
import {
  getWordsQuerySchema,
  createWordSchema,
  wordParamsSchema,
  updateWordSchema,
} from "../schemas/words.schema.js";

const router = Router();

router.get("/", validate(getWordsQuerySchema, "query"), getWordsController);

router.get("/:id", validate(wordParamsSchema, "params"), getWordByIdController);

router.post("/", validate(createWordSchema, "body"), createWordController);

router.patch(
  "/:id",
  validate(wordParamsSchema, "params"),
  validate(updateWordSchema, "body"),
  updateWordController,
);

router.delete(
  "/:id",
  validate(wordParamsSchema, "params"),
  deleteWordController,
);

export default router;
