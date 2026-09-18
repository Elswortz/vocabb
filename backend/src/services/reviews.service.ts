import { supabase } from "../db/supabase.js";
import { AppError } from "../errors/AppError.js";
import type { CreateReviewInput } from "../schemas/reviews.schema.js";

export const reviewWord = async (data: CreateReviewInput) => {
  const { data: result, error } = await supabase.rpc("review_word", {
    p_user_word_id: data.user_word_id,
    p_is_correct: data.is_correct,
    p_review_type: data.review_type,
    p_response_time_ms: data.response_time_ms ?? null,
  });

  if (error) {
    if (error.message === "User word not found") {
      throw new AppError("User word not found", 404);
    }

    if (error.message === "Invalid review type") {
      throw new AppError("Invalid review type", 400);
    }

    if (error.message === "Response time cannot be negative") {
      throw new AppError("Response time cannot be negative", 400);
    }

    throw new AppError("Failed to review word", 500);
  }

  return result?.[0] ?? null;
};
