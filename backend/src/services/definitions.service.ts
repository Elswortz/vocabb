import { supabaseAdmin } from "../db/supabase.js";
import { AppError } from "../errors/AppError.js";

export const createDefinition = async (
  wordId: number,
  partOfSpeechId: number,
  definition: string,
) => {
  const { data, error } = await supabaseAdmin
    .from("definitions")
    .insert({
      word_id: wordId,
      part_of_speech_id: partOfSpeechId,
      definition,
    })
    .select(
      `
      id,
      word_id,
      part_of_speech_id,
      definition,
      created_at,
      parts_of_speech (
        id,
        name
      )
    `,
    )
    .single();

  if (error) {
    if (error.code === "23503") {
      throw new AppError("Word or part of speech not found", 404);
    }

    throw error;
  }

  return data;
};

export const updateDefinition = async (
  id: number,
  changes: {
    part_of_speech_id?: number;
    definition?: string;
  },
) => {
  const { data, error } = await supabaseAdmin
    .from("definitions")
    .update(changes)
    .eq("id", id)
    .select(
      `
      id,
      word_id,
      part_of_speech_id,
      definition,
      created_at,
      parts_of_speech (
        id,
        name
      )
    `,
    )
    .maybeSingle();

  if (error) {
    if (error.code === "23503") {
      throw new AppError("Part of speech not found", 404);
    }

    throw error;
  }

  if (!data) {
    throw new AppError("Definition not found", 404);
  }

  return data;
};

export const deleteDefinition = async (id: number): Promise<void> => {
  const { data, error } = await supabaseAdmin
    .from("definitions")
    .delete()
    .eq("id", id)
    .select("id")
    .maybeSingle();

  if (error) {
    if (error.code === "23503") {
      throw new AppError("Cannot delete definition while it has examples", 409);
    }

    throw error;
  }

  if (!data) {
    throw new AppError("Definition not found", 404);
  }
};
