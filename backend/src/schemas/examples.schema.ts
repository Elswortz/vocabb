import { z } from "zod";

export const createExampleSchema = z
  .object({
    definition_id: z.number().int().positive(),
    example_text: z.string().trim().min(1),
    translation: z.string().trim().nullable().optional(),
  })
  .strict();

export const exampleParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const updateExampleSchema = z
  .object({
    example_text: z.string().trim().min(1).optional(),
    translation: z.string().trim().nullable().optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });
