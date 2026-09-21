import { z } from "zod";

export const createUserWordSchema = z
  .object({
    word_id: z.number().int().positive(),
  })
  .strict();

export const userWordParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const getUserWordsQuerySchema = z.object({
  search: z.string().trim().min(1).optional(),

  page: z.coerce
    .number()
    .int("page must be an integer")
    .positive("page must be greater than 0")
    .default(1),

  limit: z.coerce
    .number()
    .int("limit must be an integer")
    .positive("limit must be greater than 0")
    .max(100, "limit must not exceed 100")
    .default(20),
});

export const getReviewWordsQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(50).default(20),

  new_limit: z.coerce.number().int().min(0).max(20).default(5),
});
