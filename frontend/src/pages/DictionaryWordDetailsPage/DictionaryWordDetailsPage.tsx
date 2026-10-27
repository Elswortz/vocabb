import {
  Alert,
  Box,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import { useParams, useNavigate } from "react-router";
import { useDictionaryWord } from "@/features/dictionary/hooks/useDictionaryWord";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export function DictionaryWordDetailsPage() {
  const navigate = useNavigate();
  const { wordId } = useParams<{ wordId: string }>();
  const id = Number(wordId);

  const isValidId = Number.isInteger(id) && id > 0;
  const { data, isPending, isError } = useDictionaryWord(id);

  if (!isValidId) {
    return <Alert severity="error">Invalid word ID.</Alert>;
  }

  if (isPending) {
    return (
      <Stack sx={{ alignItems: "center", py: 6 }}>
        <CircularProgress />
      </Stack>
    );
  }

  if (isError || !data) {
    return (
      <Alert severity="error">
        Failed to load word details. Please try again later.
      </Alert>
    );
  }

  return (
    <Stack spacing={4}>
      <Button
        variant="text"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/dictionary")}
        sx={{ alignSelf: "flex-start" }}
      >
        Back to Dictionary
      </Button>
      <Box>
        <Typography variant="h3" sx={{ fontWeight: 700 }}>
          {data.word}
        </Typography>

        {data.pronunciation && (
          <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>
            {data.pronunciation}
          </Typography>
        )}

        {data.languages && (
          <Typography color="text.secondary" sx={{ mt: 1 }}>
            {data.languages.name}
          </Typography>
        )}
      </Box>

      <Divider />

      <Box>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Definitions
        </Typography>

        {data.definitions.length === 0 ? (
          <Typography color="text.secondary">
            No definitions available yet.
          </Typography>
        ) : (
          <Stack spacing={2}>
            {data.definitions.map((definition) => (
              <Paper
                key={definition.id}
                variant="outlined"
                sx={{ p: 2.5, borderRadius: 3 }}
              >
                <Stack spacing={1.5}>
                  {definition.parts_of_speech && (
                    <Typography
                      variant="body2"
                      color="primary.main"

                      sx={{ fontWeight: 600 }}
                    >
                      {definition.parts_of_speech.name}
                    </Typography>
                  )}

                  <Typography>{definition.definition}</Typography>

                  {definition.examples.length > 0 && (
                    <Stack spacing={1}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Examples
                      </Typography>

                      {definition.examples.map((example) => (
                        <Box
                          key={example.id}
                          sx={{
                            pl: 2,
                            borderLeft: 2,
                            borderColor: "divider",
                          }}
                        >
                          <Typography>{example.example_text}</Typography>

                          {example.translation && (
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ mt: 0.5 }}
                            >
                              {example.translation}
                            </Typography>
                          )}
                        </Box>
                      ))}
                    </Stack>
                  )}
                </Stack>
              </Paper>
            ))}
          </Stack>
        )}
      </Box>

      <Box>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Translations
        </Typography>

        {data.translations.length === 0 ? (
          <Typography color="text.secondary">
            No translations available yet.
          </Typography>
        ) : (
          <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
            {data.translations.map((translation) => (
              <Paper
                key={translation.id}
                variant="outlined"
                sx={{ px: 2, py: 1, borderRadius: 2 }}
              >
                <Typography sx={{ fontWeight: 500 }}>
                  {translation.translation}
                </Typography>

                {translation.languages && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: "block" }}
                  >
                    {translation.languages.name}
                  </Typography>
                )}
              </Paper>
            ))}
          </Stack>
        )}
      </Box>
    </Stack>
  );
}
