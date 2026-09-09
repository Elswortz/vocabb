import { Router } from "express";

import {
  getUserWordsController,
  getUserWordByIdController,
  createUserWordController,
  deleteUserWordController,
  getReviewWordsController,
} from "../controllers/user-words.controller.js";

import { authMiddleware } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";

import {
  createUserWordSchema,
  userWordParamsSchema,
  getUserWordsQuerySchema,
  getReviewWordsQuerySchema,
} from "../schemas/user-word.schema.js";

const router = Router();

router.use(authMiddleware);

router.get(
  "/",
  validate(getUserWordsQuerySchema, "query"),
  getUserWordsController,
);

router.get(
  "/review",
  validate(getReviewWordsQuerySchema, "query"),
  getReviewWordsController,
);

router.get(
  "/:id",
  validate(userWordParamsSchema, "params"),
  getUserWordByIdController,
);

router.post(
  "/",
  validate(createUserWordSchema, "body"),
  createUserWordController,
);

router.delete(
  "/:id",
  validate(userWordParamsSchema, "params"),
  deleteUserWordController,
);

export default router;
