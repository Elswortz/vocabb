export interface DictionaryWord {
  id: number;
  word: string;
  pronunciation: string | null;
  audio_url: string | null;
  language_id: number;
  created_at: string;
  updated_at: string;
}

export interface DictionaryPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface DictionaryWordsResponse {
  data: DictionaryWord[];
  meta: DictionaryPagination;
}

export interface GetDictionaryWordsParams {
  search?: string;
  language_id?: number;
  page?: number;
  limit?: number;
}

export interface DictionaryLanguage {
  id: number;
  code: string;
  name: string;
}

export interface DictionaryPartOfSpeech {
  id: number;
  name: string;
}

export interface DictionaryExample {
  id: number;
  example_text: string;
  translation: string | null;
  created_at: string;
}

export interface DictionaryDefinition {
  id: number;
  definition: string;
  created_at: string;
  parts_of_speech: DictionaryPartOfSpeech | null;
  examples: DictionaryExample[];
}

export interface DictionaryTranslation {
  id: number;
  translation: string;
  languages: DictionaryLanguage | null;
}

export interface DictionaryWordDetails extends DictionaryWord {
  languages: DictionaryLanguage | null;
  definitions: DictionaryDefinition[];
  translations: DictionaryTranslation[];
}
