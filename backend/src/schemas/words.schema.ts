import { z } from "zod";

export const getWordsQuerySchema = z.object({
  search: z.string().trim().optional(),

  language_id: z
    .string()
    .regex(/^\d+$/, "language_id must be a positive integer")
    .transform(Number)
    .refine((value) => value > 0, {
      message: "language_id must be greater than 0",
    })
    .optional(),

  page: z.coerce
    .number()
    .int("page must be an integer")
    .positive("page must be greater than 0")
    .default(1),

  limit: z.coerce
    .number()
    .int("limit must be an integer")
    .positive("limit must be greater than 0")
    .max(100, "limit must not exceed 100")
    .default(20),
});

export const createWordSchema = z
  .object({
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
  })
  .strict();

export const wordParamsSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, "id must be a positive integer")
    .transform(Number)
    .refine((value) => value > 0, {
      message: "id must be greater than 0",
    }),
});

export const updateWordSchema = z
  .object({
    word: z
      .string()
      .trim()
      .min(1, "Word is required")
      .max(255, "Word must not exceed 255 characters")
      .optional(),

    pronunciation: z.string().trim().nullable().optional(),

    audio_url: z.string().url("Invalid audio URL").nullable().optional(),

    language_id: z
      .number()
      .int("language_id must be an integer")
      .positive("language_id must be a positive integer")
      .optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });
