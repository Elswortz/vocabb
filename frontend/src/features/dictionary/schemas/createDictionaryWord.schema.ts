import { z } from "zod";

export const createDictionaryWordSchema = z
  .object({
    word: z
      .string()
      .trim()
      .min(1, "Word is required")
      .max(255, "Word must not exceed 255 characters"),
    language_id: z.number().int().positive("Select a language"),
    pronunciation: z
      .string()
      .trim()
      .max(255, "Pronunciation must not exceed 255 characters"),
  })
  .strict();

export type CreateDictionaryWordFormValues = z.infer<
  typeof createDictionaryWordSchema
>;
