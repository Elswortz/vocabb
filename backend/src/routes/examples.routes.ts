import { Router } from "express";

import { authMiddleware } from "../middleware/auth.js";

import { requireAdmin } from "../middleware/requireAdmin.js";

import {
  createExampleController,
  updateExampleController,
  deleteExampleController,
} from "../controllers/examples.controller.js";

import { validate } from "../middleware/validate.js";

import {
  createExampleSchema,
  exampleParamsSchema,
  updateExampleSchema,
} from "../schemas/examples.schema.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  requireAdmin,
  validate(createExampleSchema, "body"),
  createExampleController,
);

router.patch(
  "/:id",
  authMiddleware,
  requireAdmin,
  validate(exampleParamsSchema, "params"),
  validate(updateExampleSchema, "body"),
  updateExampleController,
);

router.delete(
  "/:id",
  authMiddleware,
  requireAdmin,
  validate(exampleParamsSchema, "params"),
  deleteExampleController,
);

export default router;
