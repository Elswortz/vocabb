import { Router } from "express";
import {
  createCollectionController,
  getCollectionsController,
  getCollectionByIdController,
  addWordToCollectionController,
  getCollectionWordsController,
  removeWordFromCollectionController,
  updateCollectionController,
  deleteCollectionController,
} from "../controllers/collections.controller.js";
import { authMiddleware } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import {
  createCollectionSchema,
  getCollectionsQuerySchema,
  collectionParamsSchema,
  addCollectionWordSchema,
  getCollectionWordsQuerySchema,
  collectionWordParamsSchema,
  updateCollectionSchema,
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
  "/:id/words",
  authMiddleware,
  validate(collectionParamsSchema, "params"),
  validate(getCollectionWordsQuerySchema, "query"),
  getCollectionWordsController,
);

router.post(
  "/:id/words",
  authMiddleware,
  validate(collectionParamsSchema, "params"),
  validate(addCollectionWordSchema, "body"),
  addWordToCollectionController,
);

router.delete(
  "/:id/words/:wordId",
  authMiddleware,
  validate(collectionWordParamsSchema, "params"),
  removeWordFromCollectionController,
);

router.get(
  "/:id",
  authMiddleware,
  validate(collectionParamsSchema, "params"),
  getCollectionByIdController,
);

router.patch(
  "/:id",
  authMiddleware,
  validate(collectionParamsSchema, "params"),
  validate(updateCollectionSchema, "body"),
  updateCollectionController,
);

router.delete(
  "/:id",
  authMiddleware,
  validate(collectionParamsSchema, "params"),
  deleteCollectionController,
);

export default router;
