import { z } from "zod";

export const updateProfileSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "Username must contain at least 3 characters")
    .max(50, "Username must not exceed 50 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can contain only letters, numbers and underscores",
    )
    .optional(),

  display_name: z
    .string()
    .trim()
    .min(1, "Display name is required")
    .max(100, "Display name must not exceed 100 characters")
    .optional(),

  avatar_url: z.string().url("Invalid avatar URL").nullable().optional(),
});
