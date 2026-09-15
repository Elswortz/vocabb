import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import {
  getStatsController,
  getUserActivityController,
  getUserStreakController,
} from "../controllers/stats.controller.js";
import { getActivityQuerySchema } from "../schemas/stats.schema.js";
import { validate } from "../middleware/validate.js";

const router = Router();

router.get("/", authMiddleware, getStatsController);
router.get(
  "/activity",
  authMiddleware,
  validate(getActivityQuerySchema, "query"),
  getUserActivityController,
);
router.get("/streak", authMiddleware, getUserStreakController);

export default router;
