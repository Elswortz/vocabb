import { apiClient } from "@/shared/api/client";

import type {
  DictionaryWordsResponse,
  GetDictionaryWordsParams,
  DictionaryWordDetails,
  CreateDictionaryWordData,
  DictionaryWord,
  DictionaryLanguage,
} from "../types/dictionary.types";

export const getDictionaryLanguages = async (): Promise<
  DictionaryLanguage[]
> => {
  const { data } = await apiClient.get<DictionaryLanguage[]>("/languages");

  return data;
};

export const getDictionaryWords = async (
  params: GetDictionaryWordsParams = {},
): Promise<DictionaryWordsResponse> => {
  const { data } = await apiClient.get<DictionaryWordsResponse>("/words", {
    params,
  });

  return data;
};

export const getDictionaryWordById = async (
  id: number,
): Promise<DictionaryWordDetails> => {
  const { data } = await apiClient.get<DictionaryWordDetails>(`/words/${id}`);

  return data;
};

export const createDictionaryWord = async (
  wordData: CreateDictionaryWordData,
): Promise<DictionaryWord> => {
  const { data } = await apiClient.post<DictionaryWord>("/words", wordData);

  return data;
};
