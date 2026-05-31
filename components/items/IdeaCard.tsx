import { Pressable, StyleSheet, View } from "react-native";
import { Card, Chip, Text } from "react-native-paper";
import { IdeaNote } from "@/types";
import { radius, spacing } from "@/constants/theme";

interface Props {
  item: IdeaNote;
  onPress: () => void;
}

export function IdeaCard({ item, onPress }: Props) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button">
      <Card mode="contained" style={[styles.card, { backgroundColor: item.color }]}>
        <Card.Content>
          <Text variant="titleMedium" numberOfLines={2}>
            {item.title}
          </Text>
          <View style={styles.tags}>
            {item.tags.map((tag) => (
              <Chip compact key={tag} style={styles.chip}>
                {tag}
              </Chip>
            ))}
          </View>
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
  chip: {
    backgroundColor: "rgba(255,255,255,0.66)"
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginTop: spacing.md
  }
});
