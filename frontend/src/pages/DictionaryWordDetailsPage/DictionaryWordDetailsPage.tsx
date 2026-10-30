import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { useNavigate, useParams } from "react-router";

import { useAuth } from "@/features/auth/hooks/useAuth";
import {
  DeleteDictionaryItemDialog,
  DefinitionEditorDialog,
  ExampleEditorDialog,
  TranslationEditorDialog,
  WordEditorDialog,
} from "@/features/dictionary/components/DictionaryEditorDialogs";
import { useDictionaryAdminMutations } from "@/features/dictionary/hooks/useDictionaryAdminMutations";
import { useDictionaryWord } from "@/features/dictionary/hooks/useDictionaryWord";
import type {
  DictionaryDefinition,
  DictionaryExample,
  DictionaryTranslation,
} from "@/features/dictionary/types/dictionary.types";
import { getDictionaryErrorMessage } from "@/features/dictionary/utils/getDictionaryErrorMessage";
import { useSpeechSynthesis } from "@/shared/hooks/useSpeechSynthesis";

type EditorState =
  | { type: "word" }
  | { type: "definition"; definition?: DictionaryDefinition }
  | {
      type: "example";
      definitionId: number;
      example?: DictionaryExample;
    }
  | { type: "translation"; translation?: DictionaryTranslation }
  | null;

type DeleteState =
  | { type: "word"; id: number }
  | { type: "definition"; id: number }
  | { type: "example"; id: number }
  | { type: "translation"; id: number }
  | null;

export function DictionaryWordDetailsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { speak, isSupported, isSpeaking } = useSpeechSynthesis();
  const { wordId } = useParams<{ wordId: string }>();
  const id = Number(wordId);
  const isValidId = Number.isInteger(id) && id > 0;
  const wordQuery = useDictionaryWord(id);
  const mutations = useDictionaryAdminMutations(id);
  const [editor, setEditor] = useState<EditorState>(null);
  const [itemToDelete, setItemToDelete] = useState<DeleteState>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const isAdmin = user?.role === "admin";

  if (!isValidId) {
    return <Alert severity="error">Invalid word ID.</Alert>;
  }

  if (wordQuery.isPending) {
    return (
      <Stack sx={{ alignItems: "center", py: 8 }}>
        <CircularProgress />
      </Stack>
    );
  }

  if (wordQuery.isError || !wordQuery.data) {
    return (
      <Stack spacing={2} sx={{ maxWidth: 760, mx: "auto", width: "100%" }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/dictionary")}
          sx={{ alignSelf: "flex-start" }}
        >
          Back to Dictionary
        </Button>
        <Alert
          severity="error"
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => void wordQuery.refetch()}
            >
              Retry
            </Button>
          }
        >
          Failed to load word details. Please try again.
        </Alert>
      </Stack>
    );
  }

  const word = wordQuery.data;
  const selectedDelete = itemToDelete;
  const deleteMutation = selectedDelete
    ? mutations[
        selectedDelete.type === "word"
          ? "deleteWord"
          : selectedDelete.type === "definition"
            ? "deleteDefinition"
            : selectedDelete.type === "example"
              ? "deleteExample"
              : "deleteTranslation"
      ]
    : null;

  const handleDelete = async () => {
    if (!selectedDelete) {
      return;
    }

    setDeleteError(null);
    try {
      if (selectedDelete.type === "word") {
        await mutations.deleteWord.mutateAsync();
        navigate("/dictionary", { replace: true });
        return;
      }

      if (selectedDelete.type === "definition") {
        await mutations.deleteDefinition.mutateAsync(selectedDelete.id);
      } else if (selectedDelete.type === "example") {
        await mutations.deleteExample.mutateAsync(selectedDelete.id);
      } else {
        await mutations.deleteTranslation.mutateAsync(selectedDelete.id);
      }

      setItemToDelete(null);
    } catch (error) {
      setDeleteError(getDictionaryErrorMessage(error));
    }
  };

  return (
    <Stack spacing={{ xs: 2.5, md: 3.5 }} sx={{ maxWidth: 920, mx: "auto" }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/dictionary")}
        sx={{ alignSelf: "flex-start" }}
      >
        Back to Dictionary
      </Button>

      <Card
        variant="outlined"
        sx={{
          borderRadius: 4,
          background:
            "linear-gradient(135deg, rgba(25, 118, 210, 0.08), rgba(25, 118, 210, 0.015))",
        }}
      >
        <CardContent
          sx={{
            p: { xs: 2.5, sm: 4 },
            "&:last-child": { pb: { xs: 2.5, sm: 4 } },
          }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{
              alignItems: { sm: "flex-start" },
              justifyContent: "space-between",
            }}
          >
            <Stack spacing={1.5}>
              <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                <Typography
                  component="h1"
                  variant="h3"
                  sx={{ fontWeight: 750, overflowWrap: "anywhere" }}
                >
                  {word.word}
                </Typography>
                {isSupported && (
                  <IconButton
                    aria-label={`Listen to pronunciation of ${word.word}`}
                    onClick={() => speak(word.word)}
                    color={isSpeaking ? "primary" : "default"}
                  >
                    <VolumeUpIcon />
                  </IconButton>
                )}
              </Stack>

              <Stack
                direction="row"
                spacing={1}
                sx={{ flexWrap: "wrap", gap: 1 }}
              >
                {word.pronunciation && (
                  <Chip label={word.pronunciation} variant="outlined" />
                )}
                {word.languages && (
                  <Chip label={word.languages.name} color="primary" />
                )}
              </Stack>
            </Stack>

            {isAdmin && (
              <Stack direction="row" spacing={1} sx={{ flexShrink: 0 }}>
                <Button
                  variant="outlined"
                  startIcon={<EditOutlinedIcon />}
                  onClick={() => setEditor({ type: "word" })}
                >
                  Edit word
                </Button>
                <IconButton
                  aria-label="Delete word"
                  title="Delete word"
                  color="error"
                  onClick={() => setItemToDelete({ type: "word", id: word.id })}
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
            )}
          </Stack>
        </CardContent>
      </Card>

      <Card variant="outlined" sx={{ borderRadius: 4 }}>
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <SectionHeading
            title="Definitions"
            count={word.definitions.length}
            isAdmin={isAdmin}
            onAdd={() => setEditor({ type: "definition" })}
          />

          {word.definitions.length === 0 ? (
            <EmptySection message="No definitions have been added yet." />
          ) : (
            <Stack spacing={2} sx={{ mt: 2.5 }}>
              {word.definitions.map((definition) => (
                <Card
                  key={definition.id}
                  variant="outlined"
                  sx={{ borderRadius: 3, bgcolor: "background.default" }}
                >
                  <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
                    <Stack spacing={2}>
                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={1.5}
                        sx={{
                          alignItems: { sm: "flex-start" },
                          justifyContent: "space-between",
                        }}
                      >
                        <Stack spacing={1}>
                          {definition.parts_of_speech && (
                            <Chip
                              label={definition.parts_of_speech.name}
                              size="small"
                              color="primary"
                              variant="outlined"
                              sx={{ alignSelf: "flex-start" }}
                            />
                          )}
                          <Typography sx={{ lineHeight: 1.7 }}>
                            {definition.definition}
                          </Typography>
                        </Stack>

                        {isAdmin && (
                          <ItemActions
                            label="definition"
                            onEdit={() =>
                              setEditor({ type: "definition", definition })
                            }
                            onDelete={() =>
                              setItemToDelete({
                                type: "definition",
                                id: definition.id,
                              })
                            }
                          />
                        )}
                      </Stack>

                      <Divider />
                      <SectionHeading
                        title="Examples"
                        count={definition.examples.length}
                        compact
                        isAdmin={isAdmin}
                        onAdd={() =>
                          setEditor({
                            type: "example",
                            definitionId: definition.id,
                          })
                        }
                      />

                      {definition.examples.length === 0 ? (
                        <Typography variant="body2" color="text.secondary">
                          No examples yet.
                        </Typography>
                      ) : (
                        <Stack spacing={1}>
                          {definition.examples.map((example) => (
                            <Box
                              key={example.id}
                              sx={{
                                px: 2,
                                py: 1.5,
                                borderLeft: 3,
                                borderColor: "primary.light",
                                borderRadius: "0 12px 12px 0",
                                bgcolor: "action.hover",
                              }}
                            >
                              <Stack
                                direction={{ xs: "column", sm: "row" }}
                                spacing={1}
                                sx={{
                                  alignItems: { sm: "flex-start" },
                                  justifyContent: "space-between",
                                }}
                              >
                                <Stack spacing={0.5}>
                                  <Typography>
                                    {example.example_text}
                                  </Typography>
                                  {example.translation && (
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                    >
                                      {example.translation}
                                    </Typography>
                                  )}
                                </Stack>
                                {isAdmin && (
                                  <ItemActions
                                    label="example"
                                    onEdit={() =>
                                      setEditor({
                                        type: "example",
                                        definitionId: definition.id,
                                        example,
                                      })
                                    }
                                    onDelete={() =>
                                      setItemToDelete({
                                        type: "example",
                                        id: example.id,
                                      })
                                    }
                                  />
                                )}
                              </Stack>
                            </Box>
                          ))}
                        </Stack>
                      )}
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          )}
        </CardContent>
      </Card>

      <Card variant="outlined" sx={{ borderRadius: 4 }}>
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <SectionHeading
            title="Translations"
            count={word.translations.length}
            isAdmin={isAdmin}
            onAdd={() => setEditor({ type: "translation" })}
          />

          {word.translations.length === 0 ? (
            <EmptySection message="No translations have been added yet." />
          ) : (
            <Stack spacing={1.25} sx={{ mt: 2.5 }}>
              {word.translations.map((translation) => (
                <Card
                  key={translation.id}
                  variant="outlined"
                  sx={{ borderRadius: 3, bgcolor: "background.default" }}
                >
                  <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                    <Stack
                      direction="row"
                      spacing={2}
                      sx={{
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Stack spacing={0.5}>
                        <Typography sx={{ fontWeight: 600 }}>
                          {translation.translation}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {translation.languages?.name ??
                            "Language unavailable"}
                        </Typography>
                      </Stack>
                      {isAdmin && (
                        <ItemActions
                          label="translation"
                          onEdit={() =>
                            setEditor({ type: "translation", translation })
                          }
                          onDelete={() =>
                            setItemToDelete({
                              type: "translation",
                              id: translation.id,
                            })
                          }
                        />
                      )}
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          )}
        </CardContent>
      </Card>

      {isAdmin && (
        <>
          {editor?.type === "word" && (
            <WordEditorDialog
              word={word}
              open
              isPending={mutations.updateWord.isPending}
              onClose={() => setEditor(null)}
              onSave={(values) =>
                mutations.updateWord.mutateAsync({
                  word: values.word,
                  language_id: values.language_id,
                  pronunciation: values.pronunciation || null,
                })
              }
            />
          )}
          {editor?.type === "definition" && (
            <DefinitionEditorDialog
              definition={editor.definition}
              open
              isPending={
                editor.definition
                  ? mutations.updateDefinition.isPending
                  : mutations.createDefinition.isPending
              }
              onClose={() => setEditor(null)}
              onSave={(values) =>
                editor.definition
                  ? mutations.updateDefinition.mutateAsync({
                      id: editor.definition.id,
                      changes: values,
                    })
                  : mutations.createDefinition.mutateAsync({
                      word_id: word.id,
                      ...values,
                    })
              }
            />
          )}
          {editor?.type === "example" && (
            <ExampleEditorDialog
              example={editor.example}
              open
              isPending={
                editor.example
                  ? mutations.updateExample.isPending
                  : mutations.createExample.isPending
              }
              onClose={() => setEditor(null)}
              onSave={(values) =>
                editor.example
                  ? mutations.updateExample.mutateAsync({
                      id: editor.example.id,
                      changes: {
                        example_text: values.example_text,
                        translation: values.translation || null,
                      },
                    })
                  : mutations.createExample.mutateAsync({
                      definition_id: editor.definitionId,
                      example_text: values.example_text,
                      translation: values.translation || undefined,
                    })
              }
            />
          )}
          {editor?.type === "translation" && (
            <TranslationEditorDialog
              translation={editor.translation}
              open
              isPending={
                editor.translation
                  ? mutations.updateTranslation.isPending
                  : mutations.createTranslation.isPending
              }
              onClose={() => setEditor(null)}
              onSave={(values) =>
                editor.translation
                  ? mutations.updateTranslation.mutateAsync({
                      id: editor.translation.id,
                      changes: values,
                    })
                  : mutations.createTranslation.mutateAsync({
                      word_id: word.id,
                      ...values,
                    })
              }
            />
          )}

          <DeleteDictionaryItemDialog
            open={Boolean(itemToDelete)}
            title={getDeleteTitle(itemToDelete)}
            description={getDeleteDescription(itemToDelete)}
            isPending={deleteMutation?.isPending ?? false}
            error={deleteError}
            onClose={() => {
              setItemToDelete(null);
              setDeleteError(null);
            }}
            onConfirm={() => void handleDelete()}
          />
        </>
      )}
    </Stack>
  );
}

interface SectionHeadingProps {
  title: string;
  count: number;
  isAdmin: boolean;
  onAdd: () => void;
  compact?: boolean;
}

function SectionHeading({
  title,
  count,
  isAdmin,
  onAdd,
  compact = false,
}: SectionHeadingProps) {
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{ alignItems: "center", justifyContent: "space-between" }}
    >
      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <Typography
          component={compact ? "h3" : "h2"}
          variant={compact ? "subtitle1" : "h5"}
          sx={{ fontWeight: 700 }}
        >
          {title}
        </Typography>
        <Chip label={count} size="small" variant="outlined" />
      </Stack>
      {isAdmin && (
        <Button
          size={compact ? "small" : "medium"}
          startIcon={<AddIcon />}
          onClick={onAdd}
        >
          Add
        </Button>
      )}
    </Stack>
  );
}

function EmptySection({ message }: { message: string }) {
  return (
    <Box
      sx={{
        mt: 2.5,
        p: 2.5,
        borderRadius: 3,
        textAlign: "center",
        bgcolor: "action.hover",
      }}
    >
      <Typography color="text.secondary">{message}</Typography>
    </Box>
  );
}

function ItemActions({
  label,
  onEdit,
  onDelete,
}: {
  label: string;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <Stack direction="row" spacing={0.5} sx={{ flexShrink: 0 }}>
      <IconButton
        size="small"
        aria-label={`Edit ${label}`}
        title={`Edit ${label}`}
        onClick={onEdit}
      >
        <EditOutlinedIcon fontSize="small" />
      </IconButton>
      <IconButton
        size="small"
        color="error"
        aria-label={`Delete ${label}`}
        title={`Delete ${label}`}
        onClick={onDelete}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Stack>
  );
}

function getDeleteTitle(item: DeleteState): string {
  if (!item) return "Delete item";
  return `Delete ${item.type}`;
}

function getDeleteDescription(item: DeleteState): string {
  if (item?.type === "definition") {
    return "Delete this definition? Definitions with examples cannot be removed until those examples are deleted.";
  }
  if (item?.type === "word") {
    return "Delete this word permanently? Related dictionary content may also be affected by database constraints.";
  }
  if (item?.type === "example") {
    return "Delete this example permanently?";
  }
  if (item?.type === "translation") {
    return "Delete this translation permanently?";
  }
  return "This action cannot be undone.";
}
