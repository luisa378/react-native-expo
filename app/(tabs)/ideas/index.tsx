import { useMemo, useState } from "react";
import { router } from "expo-router";
import { ActivityIndicator } from "react-native-paper";
import { ContentList } from "@/components/ContentList";
import { EmptyState } from "@/components/EmptyState";
import { IdeaCard } from "@/components/items/IdeaCard";
import { ScreenScaffold } from "@/components/ScreenScaffold";
import { useNotesStore } from "@/store/notesStore";

export default function IdeasScreen() {
  const [search, setSearch] = useState("");
  const ideas = useNotesStore((state) => state.ideas);
  const hasHydrated = useNotesStore((state) => state.hasHydrated);

  const filtered = useMemo(
    () =>
      ideas.filter((item) =>
        `${item.title} ${item.tags.join(" ")}`.toLowerCase().includes(search.trim().toLowerCase())
      ),
    [ideas, search]
  );

  return (
    <ScreenScaffold
      title="Ideas"
      count={filtered.length}
      search={search}
      onSearch={setSearch}
      onCreate={() => router.push({ pathname: "/nueva-nota", params: { type: "idea" } })}
    >
      {!hasHydrated ? (
        <ActivityIndicator />
      ) : (
        <ContentList
          data={filtered}
          renderItem={(item) => (
            <IdeaCard item={item} onPress={() => router.push({ pathname: "/ideas/[id]", params: { id: item.id } })} />
          )}
          empty={
            <EmptyState
              icon="lightbulb-outline"
              title="Aun no hay ideas"
              actionLabel="Crear idea"
              onAction={() => router.push({ pathname: "/nueva-nota", params: { type: "idea" } })}
            />
          }
        />
      )}
    </ScreenScaffold>
  );
}
