import { supabaseAdmin } from "../db/supabase.js";
import { AppError } from "../errors/AppError.js";

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
    if (error.code === "23503") {
      throw new AppError("Definition not found", 404);
    }

    throw error;
  }

  return data;
};

export const updateExample = async (
  id: number,
  changes: {
    example_text?: string;
    translation?: string | null;
  },
) => {
  const { data, error } = await supabaseAdmin
    .from("examples")
    .update(changes)
    .eq("id", id)
    .select(
      `
      id,
      definition_id,
      example_text,
      translation,
      created_at
    `,
    )
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    throw new AppError("Example not found", 404);
  }

  return data;
};

export const deleteExample = async (id: number): Promise<void> => {
  const { data, error } = await supabaseAdmin
    .from("examples")
    .delete()
    .eq("id", id)
    .select("id")
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    throw new AppError("Example not found", 404);
  }
};
