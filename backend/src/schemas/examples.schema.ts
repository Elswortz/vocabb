import { z } from "zod";

export const createExampleSchema = z.object({
  definition_id: z.coerce.number().int().positive(),

  example_text: z.string().trim().min(1, "Example text is required").max(1000),

  translation: z.string().trim().max(1000).optional(),
});
