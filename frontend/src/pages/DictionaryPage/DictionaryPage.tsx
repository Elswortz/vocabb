import { useState } from "react";
import {
  Alert,
  CircularProgress,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useDictionaryWords } from "@/features/dictionary/hooks/useDictionaryWords";
import { useDebounce } from "@/shared/hooks/useDebounce";

import { DictionaryWordCard } from "@/features/dictionary/components/DictionaryWordCard";

export function DictionaryPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search.trim());

  const { data, isPending, isError, isFetching } = useDictionaryWords({
    search: debouncedSearch || undefined,
    page,
    limit: 20,
  });

  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <Typography variant="h4">Dictionary</Typography>
        <Typography color="text.secondary">
          Find English words and explore their meanings.
        </Typography>
      </Stack>

      <TextField
        fullWidth
        label="Search words"
        placeholder="Enter a word..."
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
          setPage(1);
        }}
        slotProps={{
          htmlInput: {
            "aria-label": "Search dictionary words",
          },
        }}
      />

      {isPending ? (
        <Stack sx={{ alignItems: "center", py: 6 }}>
          <CircularProgress />
        </Stack>
      ) : isError ? (
        <Alert severity="error">
          Failed to load dictionary. Please try again later.
        </Alert>
      ) : (
        <Stack spacing={2}>
          <Stack direction="row" sx={{ alignItems: "center" }} spacing={1}>
            <Typography color="text.secondary">
              {data.meta.total} {data.meta.total === 1 ? "word" : "words"}
              {debouncedSearch ? " found" : " available"}
            </Typography>

            {isFetching && <CircularProgress size={16} />}
          </Stack>

          {data.data.length === 0 ? (
            <Typography color="text.secondary">
              No words found. Try another search.
            </Typography>
          ) : (
            data.data.map((word) => (
              <DictionaryWordCard key={word.id} word={word} />
            ))
          )}

          {data.meta.totalPages > 1 && (
            <Stack sx={{ alignItems: "center", pt: 2 }}>
              <Pagination
                count={data.meta.totalPages}
                page={page}
                onChange={(_, nextPage) => setPage(nextPage)}
                color="primary"
                showFirstButton
                showLastButton
                disabled={isFetching}
                aria-label="Dictionary pages"
              />
            </Stack>
          )}
        </Stack>
      )}
    </Stack>
  );
}
