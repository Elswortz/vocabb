import { z } from "zod";

export const editDictionaryWordSchema = z.object({
  word: z.string().trim().min(1, "Word is required").max(255),
  language_id: z.number().int().positive("Select a language"),
  pronunciation: z.string().trim().max(255),
});

export const editDictionaryDefinitionSchema = z.object({
  part_of_speech_id: z.number().int().positive("Select a part of speech"),
  definition: z.string().trim().min(1, "Definition is required"),
});

export const editDictionaryExampleSchema = z.object({
  example_text: z.string().trim().min(1, "Example is required"),
  translation: z.string().trim(),
});

export const editDictionaryTranslationSchema = z.object({
  language_id: z.number().int().positive("Select a language"),
  translation: z.string().trim().min(1, "Translation is required"),
});

export type EditDictionaryWordValues = z.infer<typeof editDictionaryWordSchema>;
export type EditDictionaryDefinitionValues = z.infer<
  typeof editDictionaryDefinitionSchema
>;
export type EditDictionaryExampleValues = z.infer<
  typeof editDictionaryExampleSchema
>;
export type EditDictionaryTranslationValues = z.infer<
  typeof editDictionaryTranslationSchema
>;
