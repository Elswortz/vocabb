import { Router } from "express";

import { authMiddleware } from "../middleware/auth.js";

import { createTranslationController } from "../controllers/translations.controller.js";

import { validate } from "../middleware/validate.js";

import { createTranslationSchema } from "../schemas/translations.schema.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  validate(createTranslationSchema, "body"),
  createTranslationController,
);

export default router;
