import { Router } from "express";

import { createExampleController } from "../controllers/examples.controller.js";

import { validate } from "../middleware/validate.js";

import { createExampleSchema } from "../schemas/examples.schema.js";

const router = Router();

router.post(
  "/",
  validate(createExampleSchema, "body"),
  createExampleController,
);

export default router;
