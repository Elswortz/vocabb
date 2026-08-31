import { supabase } from "../db/supabase.js";
import { AppError } from "../errors/AppError.js";

export const getUserWords = async (
  userId: string,
  page: number,
  limit: number,
) => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await supabase
    .from("user_words")
    .select(
      `
        id,
        created_at,
        words (
          id,
          word,
          pronunciation,
          audio_url,
          languages (
            id,
            code,
            name
          )
        ),
        word_progress (
          status,
          review_count,
          correct_count,
          incorrect_count,
          last_reviewed_at,
          next_review_at
        )
      `,
      { count: "exact" },
    )
    .eq("user_id", userId)
    .order("created_at", {
      ascending: false,
    })
    .range(from, to);

  if (error) {
    throw error;
  }

  return {
    data,
    total: count ?? 0,
  };
};

export const getUserWordById = async (userId: string, id: number) => {
  const { data, error } = await supabase
    .from("user_words")
    .select(
      `
      id,
      word_id,
      created_at,
      words (
        id,
        word,
        pronunciation,
        audio_url,
        language_id
      )
    `,
    )
    .eq("id", id)
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    throw new AppError("User word not found", 404);
  }

  return data;
};

export const createUserWord = async (userId: string, wordId: number) => {
  const { data, error } = await supabase.rpc("add_user_word", {
    p_user_id: userId,
    p_word_id: wordId,
  });

  if (error) {
    if (error.code === "23505") {
      throw new AppError("Word already exists in your vocabulary", 409);
    }

    throw error;
  }

  return data;
};

export const deleteUserWord = async (userId: string, id: number) => {
  const { data, error } = await supabase
    .from("user_words")
    .delete()
    .eq("id", id)
    .eq("user_id", userId)
    .select("id")
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    throw new AppError("User word not found", 404);
  }
};
