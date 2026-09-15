import type { Request, Response } from "express";
import {
  getStats,
  getUserActivity,
  getUserStreak,
} from "../services/stats.service.js";

export const getStatsController = async (_req: Request, res: Response) => {
  const userId = res.locals.user.id;

  const result = await getStats(userId);

  res.json(result);
};

export const getUserActivityController = async (
  _req: Request,
  res: Response,
) => {
  const userId = res.locals.user.id;

  const { days } = res.locals.query;

  const result = await getUserActivity(userId, days);

  res.json({
    data: result,
    meta: {
      days,
    },
  });
};

export const getUserStreakController = async (_req: Request, res: Response) => {
  const userId = res.locals.user.id;

  const result = await getUserStreak(userId);

  res.json(result);
};
