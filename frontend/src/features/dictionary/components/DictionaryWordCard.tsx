import { Paper, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import type { DictionaryWord } from "../types/dictionary.types";

interface DictionaryWordCardProps {
  word: DictionaryWord;
}

export function DictionaryWordCard({ word }: DictionaryWordCardProps) {
  const navigate = useNavigate();
  return (
    <Paper
      component="div"
      variant="outlined"
      onClick={() => navigate(`/dictionary/${word.id}`)}
      sx={{
        p: 2.5,
        borderRadius: 3,
        cursor: "pointer",
        transition: "border-color 150ms ease, box-shadow 150ms ease",
        "&:hover": {
          borderColor: "primary.main",
          boxShadow: 1,
        },
      }}
    >
      <Stack spacing={1}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {word.word}
        </Typography>

        {word.pronunciation ? (
          <Typography variant="body2" color="text.secondary">
            {word.pronunciation}
          </Typography>
        ) : (
          <Typography variant="body2" color="text.disabled">
            Pronunciation unavailable
          </Typography>
        )}
      </Stack>
    </Paper>
  );
}
