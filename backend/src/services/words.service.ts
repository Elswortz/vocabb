import { supabase } from "../db/supabase.js";
import type { Word } from "../types/word.js";
import { AppError } from "../errors/AppError.js";

interface GetWordsParams {
  search?: string;
  languageId?: number;
  page: number;
  limit: number;
}

interface GetWordsResult {
  data: Word[];
  total: number;
}

interface CreateWordData {
  word: string;
  pronunciation?: string | null;
  audio_url?: string | null;
  language_id: number;
}

interface UpdateWordData {
  word?: string;
  pronunciation?: string | null;
  audio_url?: string | null;
  language_id?: number;
}

export const getWords = async ({
  search,
  languageId,
  page,
  limit,
}: GetWordsParams): Promise<GetWordsResult> => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("words")
    .select("*", { count: "exact" })
    .order("id", { ascending: true })
    .range(from, to);

  if (search) {
    query = query.ilike("word", `%${search}%`);
  }

  if (languageId !== undefined) {
    query = query.eq("language_id", languageId);
  }

  const { data, error, count } = await query;

  if (error) {
    throw error;
  }

  return {
    data: data as Word[],
    total: count ?? 0,
  };
};

export const getWordById = async (id: number): Promise<Word | null> => {
  const { data, error } = await supabase
    .from("words")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data as Word | null;
};

export const createWord = async (wordData: CreateWordData): Promise<Word> => {
  const { data, error } = await supabase
    .from("words")
    .insert(wordData)
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      throw new AppError("Word already exists for this language", 409);
    }

    throw error;
  }

  return data as Word;
};

export const updateWord = async (
  id: number,
  wordData: UpdateWordData,
): Promise<Word> => {
  const { data, error } = await supabase
    .from("words")
    .update(wordData)
    .eq("id", id)
    .select()
    .maybeSingle();

  if (error) {
    if (error.code === "23505") {
      throw new AppError("Word already exists for this language", 409);
    }

    throw error;
  }

  if (!data) {
    throw new AppError("Word not found", 404);
  }

  return data as Word;
};

export const deleteWord = async (id: number): Promise<void> => {
  const { data, error } = await supabase
    .from("words")
    .delete()
    .eq("id", id)
    .select("id")
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    throw new AppError("Word not found", 404);
  }
};
