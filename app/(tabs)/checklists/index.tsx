import { useMemo, useState } from "react";
import { router } from "expo-router";
import { ActivityIndicator } from "react-native-paper";
import { ContentList } from "@/components/ContentList";
import { EmptyState } from "@/components/EmptyState";
import { ChecklistCard } from "@/components/items/ChecklistCard";
import { ScreenScaffold } from "@/components/ScreenScaffold";
import { useNotesStore } from "@/store/notesStore";

export default function ChecklistsScreen() {
  const [search, setSearch] = useState("");
  const checklists = useNotesStore((state) => state.checklists);
  const hasHydrated = useNotesStore((state) => state.hasHydrated);

  const filtered = useMemo(
    () =>
      checklists.filter((item) =>
        `${item.title} ${item.items.map((task) => task.text).join(" ")}`
          .toLowerCase()
          .includes(search.trim().toLowerCase())
      ),
    [checklists, search]
  );

  return (
    <ScreenScaffold
      title="Tareas"
      count={filtered.length}
      search={search}
      onSearch={setSearch}
      onCreate={() => router.push({ pathname: "/nueva-nota", params: { type: "checklist" } })}
    >
      {!hasHydrated ? (
        <ActivityIndicator />
      ) : (
        <ContentList
          data={filtered}
          renderItem={(item) => (
            <ChecklistCard
              item={item}
              onPress={() => router.push({ pathname: "/checklists/[id]", params: { id: item.id } })}
            />
          )}
          empty={
            <EmptyState
              icon="format-list-checks"
              title="Aun no hay listas de tareas"
              actionLabel="Crear lista"
              onAction={() => router.push({ pathname: "/nueva-nota", params: { type: "checklist" } })}
            />
          }
        />
      )}
    </ScreenScaffold>
  );
}
