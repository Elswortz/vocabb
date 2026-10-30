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
import { Controller, useForm, type Control } from "react-hook-form";
import type { ReactNode } from "react";

import type {
  DictionaryDefinition,
  DictionaryExample,
  DictionaryPartOfSpeech,
  DictionaryTranslation,
  DictionaryWordDetails,
} from "@/features/dictionary/types/dictionary.types";
import { useDictionaryLanguages } from "@/features/dictionary/hooks/useDictionaryLanguages";
import { useDictionaryPartsOfSpeech } from "@/features/dictionary/hooks/useDictionaryPartsOfSpeech";
import {
  editDictionaryDefinitionSchema,
  editDictionaryExampleSchema,
  editDictionaryTranslationSchema,
  editDictionaryWordSchema,
  type EditDictionaryDefinitionValues,
  type EditDictionaryExampleValues,
  type EditDictionaryTranslationValues,
  type EditDictionaryWordValues,
} from "@/features/dictionary/schemas/dictionaryEditor.schemas";
import { getDictionaryErrorMessage } from "@/features/dictionary/utils/getDictionaryErrorMessage";

interface EditorDialogProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onSubmit: () => void;
  isPending: boolean;
  error: string | null;
  children: ReactNode;
}

function EditorDialog({
  open,
  title,
  onClose,
  onSubmit,
  isPending,
  error,
  children,
}: EditorDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={isPending ? undefined : onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Stack
          component="form"
          id="dictionary-editor-form"
          spacing={2}
          sx={{ pt: 1 }}
          onSubmit={onSubmit}
        >
          {children}
          {error && <Alert severity="error">{error}</Alert>}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} disabled={isPending}>
          Cancel
        </Button>
        <Button
          type="submit"
          form="dictionary-editor-form"
          variant="contained"
          disabled={isPending}
        >
          {isPending ? <CircularProgress size={20} /> : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

interface WordEditorDialogProps {
  word: DictionaryWordDetails;
  open: boolean;
  onClose: () => void;
  onSave: (values: EditDictionaryWordValues) => Promise<unknown>;
  isPending: boolean;
}

export function WordEditorDialog({
  word,
  open,
  onClose,
  onSave,
  isPending,
}: WordEditorDialogProps) {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const languagesQuery = useDictionaryLanguages(open);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditDictionaryWordValues>({
    resolver: zodResolver(editDictionaryWordSchema),
    values: {
      word: word.word,
      pronunciation: word.pronunciation ?? "",
      language_id: word.language_id,
    },
  });

  const submit = handleSubmit(async (values) => {
    setSubmitError(null);
    try {
      await onSave({
        ...values,
        pronunciation: values.pronunciation || "",
      });
      onClose();
    } catch (error) {
      setSubmitError(getDictionaryErrorMessage(error));
    }
  });

  return (
    <EditorDialog
      open={open}
      title="Edit word"
      onClose={onClose}
      onSubmit={submit}
      isPending={isPending}
      error={submitError}
    >
      <TextField
        label="Word"
        fullWidth
        disabled={isPending}
        {...register("word")}
        error={Boolean(errors.word)}
        helperText={errors.word?.message}
      />
      <TextField
        label="Pronunciation"
        fullWidth
        disabled={isPending}
        {...register("pronunciation")}
        error={Boolean(errors.pronunciation)}
        helperText={errors.pronunciation?.message}
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
              languagesQuery.isPending || languagesQuery.isError || isPending
            }
            value={field.value}
            onChange={(event) => field.onChange(Number(event.target.value))}
            onBlur={field.onBlur}
            inputRef={field.ref}
            error={Boolean(errors.language_id)}
            helperText={
              errors.language_id?.message ??
              (languagesQuery.isPending
                ? "Loading languages..."
                : languagesQuery.isError
                  ? "Unable to load languages"
                  : "")
            }
          >
            {(languagesQuery.data ?? []).map((language) => (
              <MenuItem key={language.id} value={language.id}>
                {language.name}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
    </EditorDialog>
  );
}

interface DefinitionEditorDialogProps {
  definition?: DictionaryDefinition;
  open: boolean;
  onClose: () => void;
  onSave: (values: EditDictionaryDefinitionValues) => Promise<unknown>;
  isPending: boolean;
}

export function DefinitionEditorDialog({
  definition,
  open,
  onClose,
  onSave,
  isPending,
}: DefinitionEditorDialogProps) {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const partsQuery = useDictionaryPartsOfSpeech(open);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditDictionaryDefinitionValues>({
    resolver: zodResolver(editDictionaryDefinitionSchema),
    values: {
      definition: definition?.definition ?? "",
      part_of_speech_id: definition?.part_of_speech_id ?? 0,
    },
  });

  const submit = handleSubmit(async (values) => {
    setSubmitError(null);
    try {
      await onSave(values);
      onClose();
    } catch (error) {
      setSubmitError(getDictionaryErrorMessage(error));
    }
  });

  return (
    <EditorDialog
      open={open}
      title={definition ? "Edit definition" : "Add definition"}
      onClose={onClose}
      onSubmit={submit}
      isPending={isPending}
      error={submitError}
    >
      <PartOfSpeechSelect
        control={control}
        parts={partsQuery.data}
        loading={partsQuery.isPending}
        isError={partsQuery.isError}
        error={errors.part_of_speech_id?.message}
        disabled={isPending}
      />
      <TextField
        label="Definition"
        fullWidth
        multiline
        minRows={3}
        disabled={isPending}
        {...register("definition")}
        error={Boolean(errors.definition)}
        helperText={errors.definition?.message}
      />
    </EditorDialog>
  );
}

interface ExampleEditorDialogProps {
  example?: DictionaryExample;
  open: boolean;
  onClose: () => void;
  onSave: (values: EditDictionaryExampleValues) => Promise<unknown>;
  isPending: boolean;
}

export function ExampleEditorDialog({
  example,
  open,
  onClose,
  onSave,
  isPending,
}: ExampleEditorDialogProps) {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditDictionaryExampleValues>({
    resolver: zodResolver(editDictionaryExampleSchema),
    values: {
      example_text: example?.example_text ?? "",
      translation: example?.translation ?? "",
    },
  });

  const submit = handleSubmit(async (values) => {
    setSubmitError(null);
    try {
      await onSave(values);
      onClose();
    } catch (error) {
      setSubmitError(getDictionaryErrorMessage(error));
    }
  });

  return (
    <EditorDialog
      open={open}
      title={example ? "Edit example" : "Add example"}
      onClose={onClose}
      onSubmit={submit}
      isPending={isPending}
      error={submitError}
    >
      <TextField
        label="Example"
        fullWidth
        multiline
        minRows={2}
        disabled={isPending}
        {...register("example_text")}
        error={Boolean(errors.example_text)}
        helperText={errors.example_text?.message}
      />
      <TextField
        label="Translation (optional)"
        fullWidth
        multiline
        minRows={2}
        disabled={isPending}
        {...register("translation")}
        error={Boolean(errors.translation)}
        helperText={errors.translation?.message}
      />
    </EditorDialog>
  );
}

interface TranslationEditorDialogProps {
  translation?: DictionaryTranslation;
  open: boolean;
  onClose: () => void;
  onSave: (values: EditDictionaryTranslationValues) => Promise<unknown>;
  isPending: boolean;
}

export function TranslationEditorDialog({
  translation,
  open,
  onClose,
  onSave,
  isPending,
}: TranslationEditorDialogProps) {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const languagesQuery = useDictionaryLanguages(open);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditDictionaryTranslationValues>({
    resolver: zodResolver(editDictionaryTranslationSchema),
    values: {
      translation: translation?.translation ?? "",
      language_id: translation?.languages?.id ?? 0,
    },
  });

  const submit = handleSubmit(async (values) => {
    setSubmitError(null);
    try {
      await onSave(values);
      onClose();
    } catch (error) {
      setSubmitError(getDictionaryErrorMessage(error));
    }
  });

  return (
    <EditorDialog
      open={open}
      title={translation ? "Edit translation" : "Add translation"}
      onClose={onClose}
      onSubmit={submit}
      isPending={isPending}
      error={submitError}
    >
      <Controller
        name="language_id"
        control={control}
        render={({ field }) => (
          <TextField
            select
            label="Language"
            fullWidth
            disabled={
              languagesQuery.isPending || languagesQuery.isError || isPending
            }
            value={field.value}
            onChange={(event) => field.onChange(Number(event.target.value))}
            onBlur={field.onBlur}
            inputRef={field.ref}
            error={Boolean(errors.language_id)}
            helperText={
              errors.language_id?.message ??
              (languagesQuery.isPending
                ? "Loading languages..."
                : languagesQuery.isError
                  ? "Unable to load languages"
                  : "")
            }
          >
            {(languagesQuery.data ?? []).map((language) => (
              <MenuItem key={language.id} value={language.id}>
                {language.name}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
      <TextField
        label="Translation"
        fullWidth
        disabled={isPending}
        {...register("translation")}
        error={Boolean(errors.translation)}
        helperText={errors.translation?.message}
      />
    </EditorDialog>
  );
}

interface PartOfSpeechSelectProps {
  control: Control<EditDictionaryDefinitionValues>;
  parts?: DictionaryPartOfSpeech[];
  loading: boolean;
  isError: boolean;
  error?: string;
  disabled?: boolean;
}

function PartOfSpeechSelect({
  control,
  parts,
  loading,
  isError,
  error,
  disabled = false,
}: PartOfSpeechSelectProps) {
  return (
    <Controller
      name="part_of_speech_id"
      control={control}
      render={({ field }) => (
        <TextField
          select
          label="Part of speech"
          fullWidth
          disabled={loading || isError || disabled}
          value={field.value}
          onChange={(event) => field.onChange(Number(event.target.value))}
          onBlur={field.onBlur}
          inputRef={field.ref}
          error={Boolean(error || isError)}
          helperText={
            error ?? (isError ? "Unable to load parts of speech" : "")
          }
        >
          {(parts ?? []).map((part) => (
            <MenuItem key={part.id} value={part.id}>
              {part.name}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
}

interface DeleteDictionaryItemDialogProps {
  open: boolean;
  title: string;
  description: string;
  isPending: boolean;
  error: string | null;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteDictionaryItemDialog({
  open,
  title,
  description,
  isPending,
  error,
  onClose,
  onConfirm,
}: DeleteDictionaryItemDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={isPending ? undefined : onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <Alert severity="warning">{description}</Alert>
          {error && <Alert severity="error">{error}</Alert>}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} disabled={isPending}>
          Cancel
        </Button>
        <Button
          color="error"
          variant="contained"
          onClick={onConfirm}
          disabled={isPending}
        >
          {isPending ? <CircularProgress size={20} /> : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
