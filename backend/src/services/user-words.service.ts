import type { SupabaseClient } from "@supabase/supabase-js";

import { AppError } from "../errors/AppError.js";

export const getUserWords = async (
  client: SupabaseClient,
  userId: string,
  search: string | undefined,
  page: number,
  limit: number,
) => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = client
    .from("user_words")
    .select(
      `
      id,
      created_at,
      words!inner (
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
    .eq("user_id", userId);

  if (search) {
    query = query.ilike("words.word", `%${search}%`);
  }

  const { data, error, count } = await query
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

export const getUserWordById = async (
  client: SupabaseClient,
  userId: string,
  userWordId: number,
) => {
  const { data, error } = await client
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
        ),
        definitions (
          id,
          definition,
          parts_of_speech (
            id,
            name
          ),
          examples (
            id,
            example_text,
            translation
          )
        ),
        translations (
          id,
          translation,
          languages (
            id,
            code,
            name
          )
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
    )
    .eq("id", userWordId)
    .eq("user_id", userId)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      throw new AppError("User word not found", 404);
    }

    throw error;
  }

  return data;
};

export const createUserWord = async (
  client: SupabaseClient,
  wordId: number,
) => {
  const { data, error } = await client.rpc("add_user_word", {
    p_word_id: wordId,
  });

  if (error) {
    if (error.code === "23505") {
      throw new AppError("Word already exists in your vocabulary", 409);
    }

    if (error.code === "23503") {
      throw new AppError("Word not found", 404);
    }

    throw error;
  }

  return data;
};

export const deleteUserWord = async (
  client: SupabaseClient,
  userId: string,
  userWordId: number,
): Promise<void> => {
  const { data, error } = await client
    .from("user_words")
    .delete()
    .eq("id", userWordId)
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

export const getReviewWords = async (
  client: SupabaseClient,
  userId: string,
  limit: number,
  newLimit: number,
) => {
  const now = new Date().toISOString();

  const { data: dueWords, error: dueError } = await client
    .from("user_words")
    .select(
      `
      id,
      created_at,
      words!inner (
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
      word_progress!inner (
        status,
        learning_step,
        review_count,
        correct_count,
        incorrect_count,
        last_reviewed_at,
        next_review_at
      )
    `,
    )
    .eq("user_id", userId)
    .lte("word_progress.next_review_at", now)
    .order("next_review_at", {
      foreignTable: "word_progress",
      ascending: true,
    })
    .limit(limit);

  if (dueError) {
    throw dueError;
  }

  const remainingLimit = limit - (dueWords?.length ?? 0);
  const newWordsLimit = Math.min(newLimit, remainingLimit);

  if (newWordsLimit === 0) {
    return dueWords ?? [];
  }

  const { data: newWords, error: newError } = await client
    .from("user_words")
    .select(
      `
      id,
      created_at,
      words!inner (
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
        learning_step,
        review_count,
        correct_count,
        incorrect_count,
        last_reviewed_at,
        next_review_at
      )
    `,
    )
    .eq("user_id", userId)
    .is("word_progress", null)
    .order("created_at", {
      ascending: true,
    })
    .limit(newWordsLimit);

  if (newError) {
    throw newError;
  }

  return [...(dueWords ?? []), ...(newWords ?? [])];
};
