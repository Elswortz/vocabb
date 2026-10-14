import type { Request, Response } from "express";

import {
  getStats,
  getUserActivity,
  getUserStreak,
} from "../services/stats.service.js";

import { getAuthContext } from "../utils/getAuthContext.js";

export const getStatsController = async (_req: Request, res: Response) => {
  const { client } = getAuthContext(res);

  const result = await getStats(client);

  res.json(result);
};

export const getUserActivityController = async (
  _req: Request,
  res: Response,
) => {
  const { client } = getAuthContext(res);
  const { days } = res.locals.query;

  const result = await getUserActivity(client, days);

  res.json({
    data: result,
    meta: {
      days,
    },
  });
};

export const getUserStreakController = async (_req: Request, res: Response) => {
  const { client } = getAuthContext(res);

  const result = await getUserStreak(client);

  res.json(result);
};
