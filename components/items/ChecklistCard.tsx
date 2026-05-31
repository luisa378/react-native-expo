import { Pressable, StyleSheet, View } from "react-native";
import { Card, ProgressBar, Text, useTheme } from "react-native-paper";
import { ChecklistNote } from "@/types";
import { radius, spacing } from "@/constants/theme";

interface Props {
  item: ChecklistNote;
  onPress: () => void;
}

export function ChecklistCard({ item, onPress }: Props) {
  const theme = useTheme();
  const completed = item.items.filter((task) => task.isCompleted).length;
  const progress = item.items.length ? completed / item.items.length : 0;

  return (
    <Pressable onPress={onPress} accessibilityRole="button">
      <Card mode="outlined" style={[styles.card, { borderColor: theme.colors.outline }]}>
        <Card.Content>
          <View style={styles.header}>
            <Text variant="titleMedium" numberOfLines={1} style={styles.title}>
              {item.title}
            </Text>
            <Text variant="labelMedium">
              {completed}/{item.items.length}
            </Text>
          </View>
          <ProgressBar progress={progress} style={styles.progress} />
          <Text variant="bodySmall" numberOfLines={2} style={styles.preview}>
            {item.items.map((task) => task.text).join(" · ")}
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
  progress: {
    borderRadius: radius.sm,
    height: 8,
    marginTop: spacing.md
  },
  title: {
    flex: 1
  }
});
