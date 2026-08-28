import { Router } from "express";

import {
  registerController,
  loginController,
  getCurrentUserController,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/register", validate(registerSchema, "body"), registerController);
router.post("/login", validate(loginSchema, "body"), loginController);
router.get("/me", authMiddleware, getCurrentUserController);

export default router;
