import { apiClient } from "@/shared/api/client";

import type {
  DictionaryWordsResponse,
  GetDictionaryWordsParams,
  DictionaryWordDetails,
  DictionaryDefinition,
  DictionaryExample,
  DictionaryTranslation,
  CreateDictionaryWordData,
  DictionaryWord,
  DictionaryLanguage,
  DictionaryPartOfSpeech,
  CreateDictionaryDefinitionData,
  UpdateDictionaryDefinitionData,
  CreateDictionaryExampleData,
  UpdateDictionaryExampleData,
  CreateDictionaryTranslationData,
  UpdateDictionaryTranslationData,
  UpdateDictionaryWordData,
} from "../types/dictionary.types";

export const getDictionaryPartsOfSpeech = async (): Promise<
  DictionaryPartOfSpeech[]
> => {
  const { data } =
    await apiClient.get<DictionaryPartOfSpeech[]>("/parts-of-speech");

  return data;
};

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

export const updateDictionaryWord = async (
  id: number,
  changes: UpdateDictionaryWordData,
): Promise<DictionaryWord> => {
  const { data } = await apiClient.patch<DictionaryWord>(
    `/words/${id}`,
    changes,
  );

  return data;
};

export const deleteDictionaryWord = async (id: number): Promise<void> => {
  await apiClient.delete(`/words/${id}`);
};

export const createDictionaryDefinition = async (
  definition: CreateDictionaryDefinitionData,
): Promise<DictionaryDefinition> => {
  const { data } = await apiClient.post<DictionaryDefinition>(
    "/definitions",
    definition,
  );

  return data;
};

export const updateDictionaryDefinition = async (
  id: number,
  changes: UpdateDictionaryDefinitionData,
): Promise<DictionaryDefinition> => {
  const { data } = await apiClient.patch<DictionaryDefinition>(
    `/definitions/${id}`,
    changes,
  );

  return data;
};

export const deleteDictionaryDefinition = async (id: number): Promise<void> => {
  await apiClient.delete(`/definitions/${id}`);
};

export const createDictionaryExample = async (
  example: CreateDictionaryExampleData,
): Promise<DictionaryExample> => {
  const { data } = await apiClient.post<DictionaryExample>(
    "/examples",
    example,
  );

  return data;
};

export const updateDictionaryExample = async (
  id: number,
  changes: UpdateDictionaryExampleData,
): Promise<DictionaryExample> => {
  const { data } = await apiClient.patch<DictionaryExample>(
    `/examples/${id}`,
    changes,
  );

  return data;
};

export const deleteDictionaryExample = async (id: number): Promise<void> => {
  await apiClient.delete(`/examples/${id}`);
};

export const createDictionaryTranslation = async (
  translation: CreateDictionaryTranslationData,
): Promise<DictionaryTranslation> => {
  const { data } = await apiClient.post<DictionaryTranslation>(
    "/translations",
    translation,
  );

  return data;
};

export const updateDictionaryTranslation = async (
  id: number,
  changes: UpdateDictionaryTranslationData,
): Promise<DictionaryTranslation> => {
  const { data } = await apiClient.patch<DictionaryTranslation>(
    `/translations/${id}`,
    changes,
  );

  return data;
};

export const deleteDictionaryTranslation = async (
  id: number,
): Promise<void> => {
  await apiClient.delete(`/translations/${id}`);
};
