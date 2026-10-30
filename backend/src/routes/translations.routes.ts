import { Router } from "express";

import { authMiddleware } from "../middleware/auth.js";

import { requireAdmin } from "../middleware/requireAdmin.js";

import {
  createTranslationController,
  updateTranslationController,
  deleteTranslationController,
} from "../controllers/translations.controller.js";

import { validate } from "../middleware/validate.js";

import {
  createTranslationSchema,
  translationParamsSchema,
  updateTranslationSchema,
} from "../schemas/translations.schema.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  requireAdmin,
  validate(createTranslationSchema, "body"),
  createTranslationController,
);

router.patch(
  "/:id",
  authMiddleware,
  requireAdmin,
  validate(translationParamsSchema, "params"),
  validate(updateTranslationSchema, "body"),
  updateTranslationController,
);

router.delete(
  "/:id",
  authMiddleware,
  requireAdmin,
  validate(translationParamsSchema, "params"),
  deleteTranslationController,
);

export default router;
