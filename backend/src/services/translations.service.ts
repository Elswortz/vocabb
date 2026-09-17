import { supabaseAdmin } from "../db/supabase.js";

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
    throw error;
  }

  return data;
};
