import { supabaseAdmin } from "../db/supabase.js";
import { AppError } from "../errors/AppError.js";

export const createTranslation = async (
  wordId: number,
  languageId: number,
  translation: string,
) => {
  const { data, error } = await supabaseAdmin
    .from("translations")
    .insert({
      word_id: wordId,
      language_id: languageId,
      translation,
    })
    .select(
      `
      id,
      word_id,
      language_id,
      translation,
      languages (
        id,
        code,
        name
      )
    `,
    )
    .single();

  if (error) {
    if (error.code === "23503") {
      throw new AppError("Word or language not found", 404);
    }

    if (error.code === "23505") {
      throw new AppError("Translation already exists", 409);
    }

    throw error;
  }

  return data;
};

export const updateTranslation = async (
  id: number,
  changes: {
    language_id?: number;
    translation?: string;
  },
) => {
  const { data, error } = await supabaseAdmin
    .from("translations")
    .update(changes)
    .eq("id", id)
    .select(
      `
      id,
      word_id,
      language_id,
      translation,
      languages (
        id,
        code,
        name
      )
    `,
    )
    .maybeSingle();

  if (error) {
    if (error.code === "23503") {
      throw new AppError("Language not found", 404);
    }

    if (error.code === "23505") {
      throw new AppError("Translation already exists", 409);
    }

    throw error;
  }

  if (!data) {
    throw new AppError("Translation not found", 404);
  }

  return data;
};

export const deleteTranslation = async (id: number): Promise<void> => {
  const { data, error } = await supabaseAdmin
    .from("translations")
    .delete()
    .eq("id", id)
    .select("id")
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    throw new AppError("Translation not found", 404);
  }
};
