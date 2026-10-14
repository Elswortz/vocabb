import type { Request, Response } from "express";

import { getProfile, updateProfile } from "../services/profile.service.js";
import { getAuthContext } from "../utils/getAuthContext.js";

export const getProfileController = async (_req: Request, res: Response) => {
  const { user, client } = getAuthContext(res);

  const profile = await getProfile(client, user.id);

  res.json(profile);
};

export const updateProfileController = async (_req: Request, res: Response) => {
  const { user, client } = getAuthContext(res);

  const profile = await updateProfile(client, user.id, res.locals.body);

  res.json(profile);
};
