import { z } from "zod";

export const createExampleSchema = z
  .object({
    definition_id: z.number().int().positive(),
    example_text: z.string().trim().min(1),
    translation: z.string().trim().nullable().optional(),
  })
  .strict();
