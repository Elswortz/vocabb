import { Router } from "express";

import { authMiddleware } from "../middleware/auth.js";

import { createDefinitionController } from "../controllers/definitions.controller.js";

import { validate } from "../middleware/validate.js";

import { createDefinitionSchema } from "../schemas/definitions.schema.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  validate(createDefinitionSchema, "body"),
  createDefinitionController,
);

export default router;
