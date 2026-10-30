import { useQuery } from "@tanstack/react-query";

import { getDictionaryPartsOfSpeech } from "@/features/dictionary/api/dictionary.api";

export function useDictionaryPartsOfSpeech(enabled = true) {
  return useQuery({
    queryKey: ["dictionary", "parts-of-speech"],
    queryFn: getDictionaryPartsOfSpeech,
    enabled,
  });
}
