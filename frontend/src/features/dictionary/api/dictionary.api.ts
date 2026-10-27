import { apiClient } from "@/shared/api/client";

import type {
  DictionaryWordsResponse,
  GetDictionaryWordsParams,
  DictionaryWordDetails,
} from "../types/dictionary.types";

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
