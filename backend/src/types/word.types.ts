import { Translation } from "./translation.types.js";

export interface Word {
  id: number;
  word: string;
  pronunciation: string | null;
  audio_url: string | null;
  language_id: number;
  created_at: string;
  updated_at: string;
}

export interface WordWithTranslation extends Word {
  translations: Translation[];
}

export interface GetWordsParams {
  search?: string;
  languageId?: number;
  page: number;
  limit: number;
}

export interface GetWordsResult {
  data: WordWithTranslation[];
  total: number;
}

export interface CreateWordData {
  word: string;
  pronunciation?: string | null;
  audio_url?: string | null;
  language_id: number;
}

export interface UpdateWordData {
  word?: string;
  pronunciation?: string | null;
  audio_url?: string | null;
  language_id?: number;
}
