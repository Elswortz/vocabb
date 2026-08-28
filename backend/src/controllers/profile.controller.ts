import type { Request, Response } from "express";

import { getProfile, updateProfile } from "../services/profile.service.js";

export const getProfileController = async (_req: Request, res: Response) => {
  const userId = res.locals.user.id;

  const profile = await getProfile(userId);

  res.json(profile);
};

export const updateProfileController = async (_req: Request, res: Response) => {
  const userId = res.locals.user.id;

  const profile = await updateProfile(userId, res.locals.body);

  res.json(profile);
};
