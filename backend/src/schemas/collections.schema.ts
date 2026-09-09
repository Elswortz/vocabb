import { z } from "zod";

export const createCollectionSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  description: z.string().trim().max(500).optional(),
});

export type CreateCollectionInput = z.infer<typeof createCollectionSchema>;

export const getCollectionsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),

  limit: z.coerce.number().int().min(1).max(50).default(20),
});

export const collectionParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const addCollectionWordSchema = z.object({
  word_id: z.coerce.number().int().positive(),
});
