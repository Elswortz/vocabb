import { z } from "zod";

export const createTranslationSchema = z
  .object({
    word_id: z.number().int().positive(),
    language_id: z.number().int().positive(),
    translation: z.string().trim().min(1),
  })
  .strict();

export const translationParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const updateTranslationSchema = z
  .object({
    language_id: z.number().int().positive().optional(),
    translation: z.string().trim().min(1).optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });
