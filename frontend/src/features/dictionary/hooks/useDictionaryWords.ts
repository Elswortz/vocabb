import { useQuery } from "@tanstack/react-query";
import { getDictionaryWords } from "../api/dictionary.api";
import type { GetDictionaryWordsParams } from "../types/dictionary.types";

export const dictionaryKeys = {
  all: ["dictionary"] as const,
  lists: () => [...dictionaryKeys.all, "list"] as const,
  list: (params: GetDictionaryWordsParams) =>
    [...dictionaryKeys.lists(), params] as const,
};

export function useDictionaryWords(params: GetDictionaryWordsParams = {}) {
  return useQuery({
    queryKey: dictionaryKeys.list(params),
    queryFn: () => getDictionaryWords(params),
  });
}
