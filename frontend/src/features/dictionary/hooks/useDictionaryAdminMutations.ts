import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  createDictionaryDefinition,
  createDictionaryExample,
  createDictionaryTranslation,
  deleteDictionaryDefinition,
  deleteDictionaryExample,
  deleteDictionaryTranslation,
  deleteDictionaryWord,
  updateDictionaryDefinition,
  updateDictionaryExample,
  updateDictionaryTranslation,
  updateDictionaryWord,
} from "@/features/dictionary/api/dictionary.api";
import type {
  CreateDictionaryDefinitionData,
  CreateDictionaryExampleData,
  CreateDictionaryTranslationData,
  UpdateDictionaryDefinitionData,
  UpdateDictionaryExampleData,
  UpdateDictionaryTranslationData,
  UpdateDictionaryWordData,
} from "@/features/dictionary/types/dictionary.types";
import { dictionaryKeys } from "@/features/dictionary/hooks/useDictionaryWords";
import { dictionaryWordKeys } from "@/features/dictionary/hooks/useDictionaryWord";

export function useDictionaryAdminMutations(wordId: number) {
  const queryClient = useQueryClient();

  const invalidateWord = async () => {
    await Promise.all([
      queryClient.invalidateQueries({
        queryKey: dictionaryWordKeys.detail(wordId),
      }),
      queryClient.invalidateQueries({
        queryKey: dictionaryKeys.all,
      }),
    ]);
  };

  const options = { onSuccess: invalidateWord };

  return {
    updateWord: useMutation({
      mutationFn: (changes: UpdateDictionaryWordData) =>
        updateDictionaryWord(wordId, changes),
      ...options,
    }),
    deleteWord: useMutation({
      mutationFn: () => deleteDictionaryWord(wordId),
      ...options,
    }),
    createDefinition: useMutation({
      mutationFn: (definition: CreateDictionaryDefinitionData) =>
        createDictionaryDefinition(definition),
      ...options,
    }),
    updateDefinition: useMutation({
      mutationFn: ({
        id,
        changes,
      }: {
        id: number;
        changes: UpdateDictionaryDefinitionData;
      }) => updateDictionaryDefinition(id, changes),
      ...options,
    }),
    deleteDefinition: useMutation({
      mutationFn: (id: number) => deleteDictionaryDefinition(id),
      ...options,
    }),
    createExample: useMutation({
      mutationFn: (example: CreateDictionaryExampleData) =>
        createDictionaryExample(example),
      ...options,
    }),
    updateExample: useMutation({
      mutationFn: ({
        id,
        changes,
      }: {
        id: number;
        changes: UpdateDictionaryExampleData;
      }) => updateDictionaryExample(id, changes),
      ...options,
    }),
    deleteExample: useMutation({
      mutationFn: (id: number) => deleteDictionaryExample(id),
      ...options,
    }),
    createTranslation: useMutation({
      mutationFn: (translation: CreateDictionaryTranslationData) =>
        createDictionaryTranslation(translation),
      ...options,
    }),
    updateTranslation: useMutation({
      mutationFn: ({
        id,
        changes,
      }: {
        id: number;
        changes: UpdateDictionaryTranslationData;
      }) => updateDictionaryTranslation(id, changes),
      ...options,
    }),
    deleteTranslation: useMutation({
      mutationFn: (id: number) => deleteDictionaryTranslation(id),
      ...options,
    }),
  };
}
