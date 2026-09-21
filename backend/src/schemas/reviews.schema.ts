import { z } from "zod";

export const createReviewSchema = z
  .object({
    user_word_id: z.number().int().positive(),
    is_correct: z.boolean(),
    review_type: z.enum([
      "flashcard",
      "multiple_choice",
      "typing",
      "translation",
    ]),
    response_time_ms: z
      .number()
      .int("response_time_ms must be an integer")
      .nonnegative("response_time_ms cannot be negative")
      .max(3_600_000, "response_time_ms must not exceed 1 hour")
      .nullable()
      .optional(),
  })
  .strict();

export type CreateReviewInput = z.infer<typeof createReviewSchema>;
