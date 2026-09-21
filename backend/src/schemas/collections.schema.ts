import { z } from "zod";

export const createCollectionSchema = z
  .object({
    name: z.string().trim().min(1),
    description: z.string().trim().nullable().optional(),
  })
  .strict();

export type CreateCollectionInput = z.infer<typeof createCollectionSchema>;

export const getCollectionsQuerySchema = z.object({
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

export const collectionParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const collectionWordParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
  wordId: z.coerce.number().int().positive(),
});

export const addCollectionWordSchema = z.object({
  word_id: z.coerce.number().int().positive(),
});

export const getCollectionWordsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),

  limit: z.coerce.number().int().min(1).max(50).default(20),
});

export const updateCollectionSchema = z
  .object({
    name: z.string().trim().min(1, "Collection name is required").optional(),
    description: z.string().trim().nullable().optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

export type UpdateCollectionInput = z.infer<typeof updateCollectionSchema>;
