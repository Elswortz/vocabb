import { Paper, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import type { DictionaryWordWithTranslation } from "../types/dictionary.types";

import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import IconButton from "@mui/material/IconButton";

import { useSpeechSynthesis } from "@/shared/hooks/useSpeechSynthesis";

interface DictionaryWordCardProps {
  word: DictionaryWordWithTranslation;
}

export function DictionaryWordCard({ word }: DictionaryWordCardProps) {
  const navigate = useNavigate();
  const { speak, isSupported, isSpeaking } = useSpeechSynthesis();
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
        <Stack
          direction="row"
          spacing={1}
          sx={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {word.word}
          </Typography>

          {isSupported && (
            <IconButton
              aria-label={`Play pronunciation of ${word.word}`}
              title="Listen to pronunciation"
              size="small"
              onClick={(event) => {
                event.stopPropagation();
                speak(word.word);
              }}
              sx={{ flexShrink: 0 }}
            >
              <VolumeUpIcon color={isSpeaking ? "primary" : "inherit"} />
            </IconButton>
          )}
        </Stack>

        {word.pronunciation ? (
          <Typography variant="body2" color="text.secondary">
            {word.pronunciation}
          </Typography>
        ) : (
          <Typography variant="body2" color="text.disabled">
            Pronunciation unavailable
          </Typography>
        )}

        {word.translations?.length > 0 && (
          <Typography variant="body2" color="text.secondary">
            {word.translations
              .slice(0, 2)
              .map((translation) => translation.translation)
              .join(", ")}
          </Typography>
        )}
      </Stack>
    </Paper>
  );
}
