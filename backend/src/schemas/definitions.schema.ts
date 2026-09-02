import { z } from "zod";

export const createDefinitionSchema = z.object({
  word_id: z.coerce.number().int().positive(),

  part_of_speech_id: z.coerce.number().int().positive(),

  definition: z.string().trim().min(1, "Definition is required").max(1000),
});
