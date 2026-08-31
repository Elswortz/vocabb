import { Router } from "express";

import {
  getUserWordsController,
  getUserWordByIdController,
  createUserWordController,
  deleteUserWordController,
} from "../controllers/user-words.controller.js";

import { authMiddleware } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";

import {
  createUserWordSchema,
  userWordParamsSchema,
  getUserWordsQuerySchema,
} from "../schemas/user-word.schema.js";

const router = Router();

router.use(authMiddleware);

router.get(
  "/",
  validate(getUserWordsQuerySchema, "query"),
  getUserWordsController,
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
