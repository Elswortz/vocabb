import { z } from "zod";

export const createReviewSchema = z.object({
  user_word_id: z.number().int().positive(),
  is_correct: z.boolean(),
  review_type: z.enum([
    "flashcard",
    "multiple_choice",
    "typing",
    "translation",
  ]),
  response_time_ms: z.number().int().nonnegative().nullable().optional(),
});

export type CreateReviewInput = z.infer<typeof createReviewSchema>;
