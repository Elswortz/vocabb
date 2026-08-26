import { Router } from "express";

import { getLanguagesController } from "../controllers/languages.controller.js";

const router = Router();

router.get("/", getLanguagesController);

export default router;
