import { Router } from "express";

import { authMiddleware } from "../middleware/auth.js";

import { requireAdmin } from "../middleware/requireAdmin.js";

import { createExampleController } from "../controllers/examples.controller.js";

import { validate } from "../middleware/validate.js";

import { createExampleSchema } from "../schemas/examples.schema.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  requireAdmin,
  validate(createExampleSchema, "body"),
  createExampleController,
);

export default router;
