export interface DictionaryWord {
  id: number;
  word: string;
  pronunciation: string | null;
  audio_url: string | null;
  language_id: number;
  created_at: string;
  updated_at: string;
  translations: DictionaryTranslation[];
}

export interface DictionaryWordWithTranslation extends DictionaryWord {
  translations: DictionaryTranslation[];
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
  data: DictionaryWordWithTranslation[];
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

export interface CreateDictionaryDefinitionData {
  word_id: number;
  part_of_speech_id: number;
  definition: string;
}

export interface UpdateDictionaryDefinitionData {
  part_of_speech_id?: number;
  definition?: string;
}

export interface CreateDictionaryExampleData {
  definition_id: number;
  example_text: string;
  translation?: string | null;
}

export interface UpdateDictionaryExampleData {
  example_text?: string;
  translation?: string | null;
}

export interface CreateDictionaryTranslationData {
  word_id: number;
  language_id: number;
  translation: string;
}

export interface UpdateDictionaryTranslationData {
  language_id?: number;
  translation?: string;
}

export interface DictionaryExample {
  id: number;
  example_text: string;
  translation: string | null;
  created_at: string;
}

export interface DictionaryDefinition {
  id: number;
  part_of_speech_id: number;
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

export interface CreateDictionaryWordData {
  word: string;
  language_id: number;
  pronunciation?: string | null;
  audio_url?: string | null;
}

export interface UpdateDictionaryWordData {
  word?: string;
  language_id?: number;
  pronunciation?: string | null;
  audio_url?: string | null;
}
