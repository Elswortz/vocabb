import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.string().trim().email("Invalid email"),

    password: z.string().min(8, "Password must contain at least 8 characters"),

    username: z
      .string()
      .trim()
      .min(3, "Username must contain at least 3 characters")
      .max(50, "Username must not exceed 50 characters")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can contain only letters, numbers and underscores",
      ),

    display_name: z
      .string()
      .trim()
      .min(1, "Display name is required")
      .max(100, "Display name must not exceed 100 characters"),
  })
  .strict();

export const loginSchema = z
  .object({
    email: z.string().trim().email("Invalid email"),

    password: z.string().min(1, "Password is required"),
  })
  .strict();
