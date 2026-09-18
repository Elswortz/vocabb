import type { Request, Response } from "express";

import {
  getStats,
  getUserActivity,
  getUserStreak,
} from "../services/stats.service.js";

export const getStatsController = async (_req: Request, res: Response) => {
  const result = await getStats();

  res.json(result);
};

export const getUserActivityController = async (
  _req: Request,
  res: Response,
) => {
  const { days } = res.locals.query;

  const result = await getUserActivity(days);

  res.json({
    data: result,
    meta: {
      days,
    },
  });
};

export const getUserStreakController = async (_req: Request, res: Response) => {
  const result = await getUserStreak();

  res.json(result);
};
