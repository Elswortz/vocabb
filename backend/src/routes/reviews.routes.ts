import { Router } from "express";

import { reviewWordController } from "../controllers/reviews.controller.js";
import { validate } from "../middleware/validate.js";
import { createReviewSchema } from "../schemas/reviews.schema.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  validate(createReviewSchema, "body"),
  reviewWordController,
);

export default router;
