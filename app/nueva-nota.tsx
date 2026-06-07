import { useMemo, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import * as Haptics from "expo-haptics";
import { Button, HelperText, SegmentedButtons, Text, TextInput } from "react-native-paper";
import { ideaColors, spacing } from "@/constants/theme";
import { useNotesStore } from "@/store/notesStore";
import { ContentType } from "@/types";
import { checklistSchema, ideaSchema, noteSchema } from "@/validation/schemas";

type Errors = Partial<Record<"title" | "content" | "items" | "tags", string>>;

function splitValues(value: string) {
  return value
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function NewContentModal() {
  const params = useLocalSearchParams<{ type?: ContentType }>();
  const initialType = params.type ?? "note";
  const [type, setType] = useState<ContentType>(initialType);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [items, setItems] = useState("");
  const [tags, setTags] = useState("");
  const [color, setColor] = useState(ideaColors[0]);
  const [errors, setErrors] = useState<Errors>({});

  const addNote = useNotesStore((state) => state.addNote);
  const addChecklist = useNotesStore((state) => state.addChecklist);
  const addIdea = useNotesStore((state) => state.addIdea);

  const helper = useMemo(() => {
    if (type === "note") return "Texto libre para capturar informacion con contexto.";
    if (type === "checklist") return "Una tarea por linea para crear una lista accionable.";
    return "Etiquetas separadas por comas para encontrar la idea rapido.";
  }, [type]);

  const handleSubmit = async () => {
    setErrors({});

    if (type === "note") {
      const result = noteSchema.safeParse({ title, content });
      if (!result.success) {
        setErrors({
          title: result.error.flatten().fieldErrors.title?.[0],
          content: result.error.flatten().fieldErrors.content?.[0]
        });
        return;
      }
      await addNote(result.data);
    }

    if (type === "checklist") {
      const result = checklistSchema.safeParse({ title, items: splitValues(items) });
      if (!result.success) {
        setErrors({
          title: result.error.flatten().fieldErrors.title?.[0],
          items: result.error.flatten().fieldErrors.items?.[0]
        });
        return;
      }
      await addChecklist(result.data);
    }

    if (type === "idea") {
      const result = ideaSchema.safeParse({ title, tags: splitValues(tags), color });
      if (!result.success) {
        setErrors({
          title: result.error.flatten().fieldErrors.title?.[0],
          tags: result.error.flatten().fieldErrors.tags?.[0]
        });
        return;
      }
      await addIdea(result.data);
    }

    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboard}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text variant="headlineSmall">Nuevo contenido</Text>
        <Text variant="bodyMedium" style={styles.helper}>
          {helper}
        </Text>

        <SegmentedButtons
          value={type}
          onValueChange={(value) => setType(value as ContentType)}
          buttons={[
            { value: "note", label: "Nota", icon: "note-text-outline" },
            { value: "checklist", label: "Tareas", icon: "format-list-checks" },
            { value: "idea", label: "Idea", icon: "lightbulb-on-outline" }
          ]}
          style={styles.segmented}
        />

        <TextInput label="Titulo" value={title} onChangeText={setTitle} mode="outlined" />
        <HelperText type="error" visible={Boolean(errors.title)}>
          {errors.title}
        </HelperText>

        {type === "note" && (
          <>
            <TextInput
              label="Contenido"
              value={content}
              onChangeText={setContent}
              mode="outlined"
              multiline
              numberOfLines={6}
            />
            <HelperText type="error" visible={Boolean(errors.content)}>
              {errors.content}
            </HelperText>
          </>
        )}

        {type === "checklist" && (
          <>
            <TextInput
              label="Tareas"
              value={items}
              onChangeText={setItems}
              mode="outlined"
              multiline
              numberOfLines={6}
            />
            <HelperText type="error" visible={Boolean(errors.items)}>
              {errors.items}
            </HelperText>
          </>
        )}

        {type === "idea" && (
          <>
            <TextInput label="Etiquetas" value={tags} onChangeText={setTags} mode="outlined" />
            <HelperText type="error" visible={Boolean(errors.tags)}>
              {errors.tags}
            </HelperText>
            <View style={styles.swatches}>
              {ideaColors.map((item) => (
                <Button
                  key={item}
                  mode={color === item ? "contained" : "outlined"}
                  onPress={() => setColor(item)}
                  style={[styles.swatch, { backgroundColor: item }]}
                >
                  {color === item ? "✓" : ""}
                </Button>
              ))}
            </View>
          </>
        )}

        <View style={styles.actions}>
          <Button mode="outlined" onPress={() => router.back()}>
            Cancelar
          </Button>
          <Button icon="content-save-outline" mode="contained" onPress={handleSubmit}>
            Guardar
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  actions: {
    flexDirection: "row",
    gap: spacing.md,
    justifyContent: "flex-end",
    marginTop: spacing.xl
  },
  container: {
    padding: spacing.lg
  },
  helper: {
    marginTop: spacing.sm
  },
  keyboard: {
    flex: 1
  },
  segmented: {
    marginVertical: spacing.lg
  },
  swatch: {
    borderRadius: 8,
    minWidth: 48
  },
  swatches: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginTop: spacing.sm
  }
});
