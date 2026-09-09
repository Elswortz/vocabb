import { Router } from "express";
import {
  createCollectionController,
  getCollectionsController,
  getCollectionByIdController,
  addWordToCollectionController,
} from "../controllers/collections.controller.js";
import { authMiddleware } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import {
  createCollectionSchema,
  getCollectionsQuerySchema,
  collectionParamsSchema,
  addCollectionWordSchema,
} from "../schemas/collections.schema.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  validate(createCollectionSchema, "body"),
  createCollectionController,
);

router.get(
  "/",
  authMiddleware,
  validate(getCollectionsQuerySchema, "query"),
  getCollectionsController,
);

router.get(
  "/:id",
  authMiddleware,
  validate(collectionParamsSchema, "params"),
  getCollectionByIdController,
);

router.post(
  "/:id/words",
  authMiddleware,
  validate(collectionParamsSchema, "params"),
  validate(addCollectionWordSchema, "body"),
  addWordToCollectionController,
);

export default router;
