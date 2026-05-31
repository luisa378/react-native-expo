import { StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button, Text, useTheme } from "react-native-paper";
import { spacing } from "@/constants/theme";

interface Props {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  actionLabel: string;
  onAction: () => void;
}

export function EmptyState({ icon, title, actionLabel, onAction }: Props) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name={icon} size={40} color={theme.colors.primary} />
      <Text variant="titleMedium" style={styles.title}>
        {title}
      </Text>
      <Button icon="plus" mode="contained" onPress={onAction}>
        {actionLabel}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    gap: spacing.md,
    justifyContent: "center",
    padding: spacing.xl
  },
  title: {
    textAlign: "center"
  }
});
