import { useQuery } from "@tanstack/react-query";
import { getDictionaryWordById } from "../api/dictionary.api";

export function useDictionaryWord(id: number) {
  return useQuery({
    queryKey: ["dictionary", "detail", id],
    queryFn: () => getDictionaryWordById(id),
    enabled: Number.isInteger(id) && id > 0,
  });
}
