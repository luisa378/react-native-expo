import { useMemo, useState } from "react";
import { router } from "expo-router";
import { ActivityIndicator } from "react-native-paper";
import { ContentList } from "@/components/ContentList";
import { EmptyState } from "@/components/EmptyState";
import { NoteCard } from "@/components/items/NoteCard";
import { ScreenScaffold } from "@/components/ScreenScaffold";
import { useNotesStore } from "@/store/notesStore";

export default function NotesScreen() {
  const [search, setSearch] = useState("");
  const notes = useNotesStore((state) => state.notes);
  const hasHydrated = useNotesStore((state) => state.hasHydrated);

  const filtered = useMemo(
    () =>
      notes.filter((item) =>
        `${item.title} ${item.content}`.toLowerCase().includes(search.trim().toLowerCase())
      ),
    [notes, search]
  );

  return (
    <ScreenScaffold
      title="Notas"
      count={filtered.length}
      search={search}
      onSearch={setSearch}
      onCreate={() => router.push({ pathname: "/nueva-nota", params: { type: "note" } })}
    >
      {!hasHydrated ? (
        <ActivityIndicator />
      ) : (
        <ContentList
          data={filtered}
          renderItem={(item) => (
            <NoteCard item={item} onPress={() => router.push({ pathname: "/notas/[id]", params: { id: item.id } })} />
          )}
          empty={
            <EmptyState
              icon="note-plus-outline"
              title="Aun no hay notas"
              actionLabel="Crear nota"
              onAction={() => router.push({ pathname: "/nueva-nota", params: { type: "note" } })}
            />
          }
        />
      )}
    </ScreenScaffold>
  );
}
