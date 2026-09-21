import { z } from "zod";

export const createTranslationSchema = z
  .object({
    word_id: z.number().int().positive(),
    language_id: z.number().int().positive(),
    translation: z.string().trim().min(1),
  })
  .strict();
