import { Router } from "express";

import { createTranslationController } from "../controllers/translations.controller.js";

import { validate } from "../middleware/validate.js";

import { createTranslationSchema } from "../schemas/translations.schema.js";

const router = Router();

router.post(
  "/",
  validate(createTranslationSchema, "body"),
  createTranslationController,
);

export default router;
