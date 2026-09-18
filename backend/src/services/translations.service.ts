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
