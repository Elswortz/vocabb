import { useQuery } from "@tanstack/react-query";
import { getDictionaryWordById } from "../api/dictionary.api";

export const dictionaryWordKeys = {
  all: ["dictionary", "detail"] as const,
  detail: (id: number) => [...dictionaryWordKeys.all, id] as const,
};

export function useDictionaryWord(id: number) {
  return useQuery({
    queryKey: dictionaryWordKeys.detail(id),
    queryFn: () => getDictionaryWordById(id),
    enabled: Number.isInteger(id) && id > 0,
  });
}
