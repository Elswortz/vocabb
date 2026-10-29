import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import { useCreateDictionaryWord } from "@/features/dictionary/hooks/useCreateDictionaryWord";
import { useDictionaryLanguages } from "@/features/dictionary/hooks/useDictionaryLanguages";
import {
  createDictionaryWordSchema,
  type CreateDictionaryWordFormValues,
} from "@/features/dictionary/schemas/createDictionaryWord.schema";

interface CreateDictionaryWordDialogProps {
  open: boolean;
  onClose: () => void;
}

export function CreateDictionaryWordDialog({
  open,
  onClose,
}: CreateDictionaryWordDialogProps) {
  const [submitError, setSubmitError] = useState(false);
  const languagesQuery = useDictionaryLanguages(open);
  const createWordMutation = useCreateDictionaryWord();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateDictionaryWordFormValues>({
    resolver: zodResolver(createDictionaryWordSchema),
    defaultValues: {
      word: "",
      language_id: 0,
      pronunciation: "",
    },
  });

  const handleClose = () => {
    if (createWordMutation.isPending) {
      return;
    }

    reset();
    setSubmitError(false);
    createWordMutation.reset();
    onClose();
  };

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError(false);

    try {
      await createWordMutation.mutateAsync({
        word: values.word,
        language_id: values.language_id,
        pronunciation: values.pronunciation || undefined,
      });

      reset();
      onClose();
    } catch {
      setSubmitError(true);
    }
  });

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      aria-labelledby="create-word-dialog-title"
    >
      <DialogTitle id="create-word-dialog-title">
        Create dictionary word
      </DialogTitle>

      <DialogContent>
        <Stack
          component="form"
          id="create-dictionary-word-form"
          spacing={2}
          sx={{ pt: 1 }}
          onSubmit={onSubmit}
        >
          {languagesQuery.isPending ? (
            <Stack sx={{ alignItems: "center", py: 2 }}>
              <CircularProgress size={24} aria-label="Loading languages" />
            </Stack>
          ) : languagesQuery.isError ? (
            <Alert
              severity="error"
              action={
                <Button
                  color="inherit"
                  size="small"
                  onClick={() => void languagesQuery.refetch()}
                >
                  Retry
                </Button>
              }
            >
              Unable to load languages. Please try again.
            </Alert>
          ) : (
            <>
              {languagesQuery.data.length === 0 && (
                <Alert severity="error">
                  No languages are available. A word cannot be created yet.
                </Alert>
              )}

              <TextField
                label="Word"
                autoFocus
                fullWidth
                disabled={createWordMutation.isPending}
                {...register("word")}
                error={Boolean(errors.word)}
                helperText={errors.word?.message}
              />

              <Controller
                name="language_id"
                control={control}
                render={({ field }) => (
                  <TextField
                    select
                    label="Language"
                    fullWidth
                    disabled={
                      createWordMutation.isPending ||
                      languagesQuery.data.length === 0
                    }
                    value={field.value}
                    onChange={(event) =>
                      field.onChange(Number(event.target.value))
                    }
                    onBlur={field.onBlur}
                    inputRef={field.ref}
                    error={Boolean(errors.language_id)}
                    helperText={errors.language_id?.message}
                  >
                    {languagesQuery.data.map((language) => (
                      <MenuItem key={language.id} value={language.id}>
                        {language.name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />

              <TextField
                label="Pronunciation (optional)"
                fullWidth
                disabled={createWordMutation.isPending}
                {...register("pronunciation")}
                error={Boolean(errors.pronunciation)}
                helperText={errors.pronunciation?.message}
              />
            </>
          )}

          {submitError && (
            <Alert severity="error">
              Unable to create the word. Please check the details and try again.
            </Alert>
          )}
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClose} disabled={createWordMutation.isPending}>
          Cancel
        </Button>
        <Button
          type="submit"
          form="create-dictionary-word-form"
          variant="contained"
          disabled={
            createWordMutation.isPending ||
            languagesQuery.isPending ||
            languagesQuery.isError ||
            languagesQuery.data?.length === 0
          }
        >
          {createWordMutation.isPending ? "Creating..." : "Create word"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
