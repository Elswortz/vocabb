import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createDictionaryWord } from "@/features/dictionary/api/dictionary.api";
import type { CreateDictionaryWordData } from "@/features/dictionary/types/dictionary.types";
import { dictionaryKeys } from "@/features/dictionary/hooks/useDictionaryWords";

export function useCreateDictionaryWord() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (wordData: CreateDictionaryWordData) =>
      createDictionaryWord(wordData),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: dictionaryKeys.all,
      });
    },
  });
}
