import type { SupabaseClient } from "@supabase/supabase-js";
import { AppError } from "../errors/AppError.js";
import type { UpdateCollectionInput } from "../schemas/collections.schema.js";

export const createCollection = async (
  client: SupabaseClient,
  userId: string,
  name: string,
  description?: string,
) => {
  const { data, error } = await client
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
    if (error.code === "23505") {
      throw new AppError("Collection with this name already exists", 409);
    }

    throw error;
  }

  return data;
};

export const getCollections = async (
  client: SupabaseClient,
  userId: string,
  page: number,
  limit: number,
) => {
  const offset = (page - 1) * limit;

  const { data, error, count } = await client
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

  return {
    data,
    total: count ?? 0,
  };
};

export const getCollectionById = async (
  client: SupabaseClient,
  userId: string,
  collectionId: number,
) => {
  const { data, error } = await client
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
  client: SupabaseClient,
  userId: string,
  collectionId: number,
  wordId: number,
) => {
  const { data: collection, error: collectionError } = await client
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

  const { data: word, error: wordError } = await client
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

  const { data, error } = await client
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

export const getCollectionWords = async (
  client: SupabaseClient,
  userId: string,
  collectionId: number,
  page: number,
  limit: number,
) => {
  const offset = (page - 1) * limit;

  const { data: collection, error: collectionError } = await client
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

  const { data, error, count } = await client
    .from("collection_words")
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
        )
      `,
      { count: "exact" },
    )
    .eq("collection_id", collection.id)
    .order("created_at", {
      ascending: false,
    })
    .range(offset, offset + limit - 1);

  if (error) {
    throw error;
  }

  return {
    data,
    total: count ?? 0,
  };
};

export const removeWordFromCollection = async (
  client: SupabaseClient,
  userId: string,
  collectionId: number,
  wordId: number,
): Promise<void> => {
  const { data: collection, error: collectionError } = await client
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

  const { data, error } = await client
    .from("collection_words")
    .delete()
    .eq("collection_id", collection.id)
    .eq("word_id", wordId)
    .select("id")
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    throw new AppError("Word not found in collection", 404);
  }
};

export const updateCollection = async (
  client: SupabaseClient,
  userId: string,
  collectionId: number,
  data: UpdateCollectionInput,
) => {
  const { data: collection, error: collectionError } = await client
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

  const { data: updatedCollection, error } = await client
    .from("collections")
    .update({
      ...(data.name !== undefined && {
        name: data.name,
      }),
      ...(data.description !== undefined && {
        description: data.description,
      }),
      updated_at: new Date().toISOString(),
    })
    .eq("id", collection.id)
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
    if (error.code === "23505") {
      throw new AppError("Collection with this name already exists", 409);
    }

    throw error;
  }

  return updatedCollection;
};

export const deleteCollection = async (
  client: SupabaseClient,
  userId: string,
  collectionId: number,
): Promise<void> => {
  const { data, error } = await client
    .from("collections")
    .delete()
    .eq("id", collectionId)
    .eq("user_id", userId)
    .select("id")
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    throw new AppError("Collection not found", 404);
  }
};
