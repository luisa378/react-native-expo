import { Pressable, StyleSheet, View } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";
import { Note } from "@/types";
import { formatDate } from "@/utils/date";
import { radius, spacing } from "@/constants/theme";

interface Props {
  item: Note;
  onPress: () => void;
}

export function NoteCard({ item, onPress }: Props) {
  const theme = useTheme();

  return (
    <Pressable onPress={onPress} accessibilityRole="button">
      <Card mode="outlined" style={[styles.card, { borderColor: theme.colors.outline }]}>
        <Card.Content>
          <View style={styles.header}>
            <Text variant="titleMedium" numberOfLines={1} style={styles.title}>
              {item.title}
            </Text>
            <Text variant="labelSmall">{formatDate(item.updatedAt)}</Text>
          </View>
          <Text variant="bodyMedium" numberOfLines={3} style={styles.preview}>
            {item.content}
          </Text>
        </Card.Content>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.md,
    marginBottom: spacing.md
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.md,
    justifyContent: "space-between"
  },
  preview: {
    marginTop: spacing.sm
  },
  title: {
    flex: 1
  }
});
