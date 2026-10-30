import { Router } from "express";

import { authMiddleware } from "../middleware/auth.js";

import { requireAdmin } from "../middleware/requireAdmin.js";

import {
  createDefinitionController,
  updateDefinitionController,
  deleteDefinitionController,
} from "../controllers/definitions.controller.js";

import { validate } from "../middleware/validate.js";

import {
  createDefinitionSchema,
  definitionParamsSchema,
  updateDefinitionSchema,
} from "../schemas/definitions.schema.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  requireAdmin,
  validate(createDefinitionSchema, "body"),
  createDefinitionController,
);

router.patch(
  "/:id",
  authMiddleware,
  requireAdmin,
  validate(definitionParamsSchema, "params"),
  validate(updateDefinitionSchema, "body"),
  updateDefinitionController,
);

router.delete(
  "/:id",
  authMiddleware,
  requireAdmin,
  validate(definitionParamsSchema, "params"),
  deleteDefinitionController,
);

export default router;
