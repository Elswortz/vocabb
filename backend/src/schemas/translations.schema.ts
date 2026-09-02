import { z } from "zod";

export const createTranslationSchema = z.object({
  word_id: z.coerce.number().int().positive(),

  language_id: z.coerce.number().int().positive(),

  translation: z.string().trim().min(1, "Translation is required").max(500),
});
