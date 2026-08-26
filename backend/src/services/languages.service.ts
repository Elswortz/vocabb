import { supabase } from "../db/supabase.js";
import type { Language } from "../types/language.js";

export const getLanguages = async (): Promise<Language[]> => {
  const { data, error } = await supabase
    .from("languages")
    .select("*")
    .order("name");

  if (error) {
    throw error;
  }

  return data as Language[];
};
