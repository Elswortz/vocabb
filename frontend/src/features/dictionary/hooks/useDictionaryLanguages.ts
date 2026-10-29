import { useQuery } from "@tanstack/react-query";

import { getDictionaryLanguages } from "@/features/dictionary/api/dictionary.api";

export function useDictionaryLanguages(enabled = true) {
  return useQuery({
    queryKey: ["dictionary", "languages"],
    queryFn: getDictionaryLanguages,
    enabled,
  });
}
