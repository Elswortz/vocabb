import { z } from "zod";

export const getWordsQuerySchema = z.object({
  search: z.string().trim().optional(),

  language_id: z
    .string()
    .regex(/^\d+$/, "language_id must be a positive integer")
    .transform(Number)
    .optional(),

  page: z
    .string()
    .regex(/^\d+$/, "page must be a positive integer")
    .transform(Number)
    .refine((value) => value >= 1, {
      message: "page must be greater than 0",
    })
    .optional(),

  limit: z
    .string()
    .regex(/^\d+$/, "limit must be a positive integer")
    .transform(Number)
    .refine((value) => value >= 1 && value <= 100, {
      message: "limit must be between 1 and 100",
    })
    .optional(),
});

export const createWordSchema = z.object({
  word: z
    .string()
    .trim()
    .min(1, "Word is required")
    .max(255, "Word must not exceed 255 characters"),

  pronunciation: z
    .string()
    .trim()
    .max(255, "Pronunciation must not exceed 255 characters")
    .nullable()
    .optional(),

  audio_url: z.string().url("Invalid audio URL").nullable().optional(),

  language_id: z.number().int().positive(),
});

export const wordParamsSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, "id must be a positive integer")
    .transform(Number)
    .refine((value) => value > 0, {
      message: "id must be greater than 0",
    }),
});

export const updateWordSchema = z.object({
  word: z
    .string()
    .trim()
    .min(1, "Word is required")
    .max(255, "Word must not exceed 255 characters")
    .optional(),

  pronunciation: z
    .string()
    .trim()
    .max(255, "Pronunciation must not exceed 255 characters")
    .nullable()
    .optional(),

  audio_url: z.string().url("Invalid audio URL").nullable().optional(),

  language_id: z.number().int().positive().optional(),
});
