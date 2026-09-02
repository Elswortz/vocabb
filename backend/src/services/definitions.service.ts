import { supabase } from "../db/supabase.js";
import { AppError } from "../errors/AppError.js";

export const createDefinition = async (
  wordId: number,
  partOfSpeechId: number,
  definition: string,
) => {
  const { data, error } = await supabase
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
    throw error;
  }

  return data;
};
