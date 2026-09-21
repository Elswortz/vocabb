import { z } from "zod";

export const createDefinitionSchema = z
  .object({
    word_id: z.number().int().positive(),
    part_of_speech_id: z.number().int().positive(),
    definition: z.string().trim().min(1),
  })
  .strict();
