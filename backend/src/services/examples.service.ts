import { supabaseAdmin } from "../db/supabase.js";

export const createExample = async (
  definitionId: number,
  exampleText: string,
  translation?: string,
) => {
  const { data, error } = await supabaseAdmin
    .from("examples")
    .insert({
      definition_id: definitionId,
      example_text: exampleText,
      translation: translation ?? null,
    })
    .select(
      `
      id,
      definition_id,
      example_text,
      translation,
      created_at
    `,
    )
    .single();

  if (error) {
    throw error;
  }

  return data;
};
