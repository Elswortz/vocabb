import { Router } from "express";

import {
  getProfileController,
  updateProfileController,
} from "../controllers/profile.controller.js";

import { authMiddleware } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";

import { updateProfileSchema } from "../schemas/profile.schema.js";

const router = Router();

router.get("/", authMiddleware, getProfileController);

router.patch(
  "/",
  authMiddleware,
  validate(updateProfileSchema, "body"),
  updateProfileController,
);

export default router;
