import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Searchbar, Text } from "react-native-paper";
import { spacing } from "@/constants/theme";

interface Props {
  title: string;
  count: number;
  search: string;
  onSearch: (value: string) => void;
  onCreate: () => void;
  children: ReactNode;
}

export function ScreenScaffold({ title, count, search, onSearch, onCreate, children }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleGroup}>
          <Text variant="headlineSmall">{title}</Text>
          <Text variant="bodySmall">{count} elementos</Text>
        </View>
        <Button icon="plus" mode="contained" onPress={onCreate}>
          Nuevo
        </Button>
      </View>
      <Searchbar
        placeholder="Buscar"
        value={search}
        onChangeText={onSearch}
        mode="bar"
        style={styles.search}
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.lg,
    justifyContent: "space-between",
    marginBottom: spacing.md
  },
  search: {
    marginBottom: spacing.md
  },
  titleGroup: {
    flex: 1
  }
});
