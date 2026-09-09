import { supabase } from "../db/supabase.js";
import { AppError } from "../errors/AppError.js";

export const createCollection = async (
  userId: string,
  name: string,
  description?: string,
) => {
  const { data, error } = await supabase
    .from("collections")
    .insert({
      user_id: userId,
      name,
      description: description ?? null,
    })
    .select(
      `
      id,
      name,
      description,
      created_at,
      updated_at
    `,
    )
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const getCollections = async (
  userId: string,
  page: number,
  limit: number,
) => {
  const offset = (page - 1) * limit;

  const { data, error, count } = await supabase
    .from("collections")
    .select(
      `
        id,
        name,
        description,
        created_at,
        updated_at
      `,
      { count: "exact" },
    )
    .eq("user_id", userId)
    .order("created_at", {
      ascending: false,
    })
    .range(offset, offset + limit - 1);

  if (error) {
    throw error;
  }

  const total = count ?? 0;
  const totalPages = Math.ceil(total / limit);

  return {
    data,
    meta: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrevious: page > 1,
    },
  };
};

export const getCollectionById = async (
  userId: string,
  collectionId: number,
) => {
  const { data, error } = await supabase
    .from("collections")
    .select(
      `
      id,
      name,
      description,
      created_at,
      updated_at
    `,
    )
    .eq("id", collectionId)
    .eq("user_id", userId)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      throw new AppError("Collection not found", 404);
    }

    throw error;
  }

  return data;
};

export const addWordToCollection = async (
  userId: string,
  collectionId: number,
  wordId: number,
) => {
  const { data: collection, error: collectionError } = await supabase
    .from("collections")
    .select("id")
    .eq("id", collectionId)
    .eq("user_id", userId)
    .single();

  if (collectionError) {
    if (collectionError.code === "PGRST116") {
      throw new AppError("Collection not found", 404);
    }

    throw collectionError;
  }

  const { data: word, error: wordError } = await supabase
    .from("words")
    .select("id")
    .eq("id", wordId)
    .single();

  if (wordError) {
    if (wordError.code === "PGRST116") {
      throw new AppError("Word not found", 404);
    }

    throw wordError;
  }

  const { data, error } = await supabase
    .from("collection_words")
    .insert({
      collection_id: collection.id,
      word_id: word.id,
    })
    .select(
      `
      id,
      collection_id,
      word_id,
      created_at
    `,
    )
    .single();

  if (error) {
    if (error.code === "23505") {
      throw new AppError("Word already exists in collection", 409);
    }

    throw error;
  }

  return data;
};
