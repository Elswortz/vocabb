import { z } from "zod";

export const createUserWordSchema = z.object({
  word_id: z.number().int().positive(),
});

export const userWordParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const getUserWordsQuerySchema = z.object({
  search: z.string().trim().min(1).optional(),

  page: z.coerce.number().int().positive().default(1),

  limit: z.coerce.number().int().positive().max(100).default(20),
});
