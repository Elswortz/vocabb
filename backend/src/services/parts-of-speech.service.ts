import { supabase } from "../db/supabase.js";

export interface PartOfSpeech {
  id: number;
  name: string;
}

export const getPartsOfSpeech = async (): Promise<PartOfSpeech[]> => {
  const { data, error } = await supabase
    .from("parts_of_speech")
    .select("id, name")
    .order("name");

  if (error) {
    throw error;
  }

  return data;
};
