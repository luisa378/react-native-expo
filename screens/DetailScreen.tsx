import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import * as Haptics from "expo-haptics";
import { Button, Checkbox, Chip, Divider, Text, useTheme } from "react-native-paper";
import { spacing } from "@/constants/theme";
import { useNotesStore } from "@/store/notesStore";
import { ContentType, isChecklist, isIdea, isNote } from "@/types";
import { formatDate } from "@/utils/date";

interface Props {
  type: ContentType;
}

export function DetailScreen({ type }: Props) {
  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useTheme();
  const item = useNotesStore((state) => state.findContent(type, id));
  const deleteContent = useNotesStore((state) => state.deleteContent);
  const toggleChecklistItem = useNotesStore((state) => state.toggleChecklistItem);

  if (!item) {
    return (
      <View style={styles.center}>
        <Text variant="titleMedium">Contenido no encontrado</Text>
        <Button mode="contained" onPress={() => router.back()}>
          Volver
        </Button>
      </View>
    );
  }

  const handleDelete = () => {
    Alert.alert("Eliminar", "Esta accion no se puede deshacer.", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: async () => {
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          await deleteContent(type, item.id);
          router.back();
        }
      }
    ]);
  };

  const handleToggle = async (itemId: string) => {
    await toggleChecklistItem(item.id, itemId);
    if (isChecklist(item)) {
      const pendingAfterToggle = item.items.filter((task) =>
        task.id === itemId ? task.isCompleted : !task.isCompleted
      );
      if (pendingAfterToggle.length === 0) {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button icon="arrow-left" onPress={() => router.back()} style={styles.back}>
        Volver
      </Button>
      <Text variant="headlineSmall">{item.title}</Text>
      <Text variant="bodySmall" style={styles.date}>
        Actualizado {formatDate(item.updatedAt)}
      </Text>
      <Divider style={styles.divider} />

      {isNote(item) && <Text variant="bodyLarge">{item.content}</Text>}

      {isChecklist(item) && (
        <View style={styles.tasks}>
          {item.items.map((task) => (
            <Checkbox.Item
              key={task.id}
              label={task.text}
              status={task.isCompleted ? "checked" : "unchecked"}
              onPress={() => handleToggle(task.id)}
              position="leading"
              labelStyle={task.isCompleted ? styles.completed : undefined}
            />
          ))}
        </View>
      )}

      {isIdea(item) && (
        <View style={[styles.idea, { backgroundColor: item.color }]}>
          <Text variant="titleMedium">Etiquetas</Text>
          <View style={styles.tags}>
            {item.tags.map((tag) => (
              <Chip key={tag}>{tag}</Chip>
            ))}
          </View>
        </View>
      )}

      <Button
        icon="delete-outline"
        mode="outlined"
        textColor={theme.colors.error}
        onPress={handleDelete}
        style={styles.delete}
      >
        Eliminar
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  back: {
    alignSelf: "flex-start"
  },
  center: {
    alignItems: "center",
    flex: 1,
    gap: spacing.md,
    justifyContent: "center",
    padding: spacing.xl
  },
  completed: {
    textDecorationLine: "line-through"
  },
  container: {
    padding: spacing.lg
  },
  date: {
    marginTop: spacing.xs
  },
  delete: {
    marginTop: spacing.xxl
  },
  divider: {
    marginVertical: spacing.lg
  },
  idea: {
    borderRadius: 8,
    padding: spacing.lg
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginTop: spacing.md
  },
  tasks: {
    gap: spacing.sm
  }
});
