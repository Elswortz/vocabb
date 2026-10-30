import { z } from "zod";

export const createDefinitionSchema = z
  .object({
    word_id: z.number().int().positive(),
    part_of_speech_id: z.number().int().positive(),
    definition: z.string().trim().min(1),
  })
  .strict();

export const definitionParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const updateDefinitionSchema = z
  .object({
    part_of_speech_id: z.number().int().positive().optional(),
    definition: z.string().trim().min(1).optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });
