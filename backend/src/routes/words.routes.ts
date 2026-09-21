import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

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

router.post(
  "/",
  authMiddleware,
  requireAdmin,
  validate(createWordSchema, "body"),
  createWordController,
);

router.patch(
  "/:id",
  authMiddleware,
  requireAdmin,
  validate(wordParamsSchema, "params"),
  validate(updateWordSchema, "body"),
  updateWordController,
);

router.delete(
  "/:id",
  authMiddleware,
  requireAdmin,
  validate(wordParamsSchema, "params"),
  deleteWordController,
);

export default router;
