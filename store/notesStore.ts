import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { AnyNote, ChecklistItem, ChecklistNote, ContentType, IdeaNote, Note } from "@/types";
import { nowIso } from "@/utils/date";

type NewNote = Pick<Note, "title" | "content">;
type NewChecklist = Pick<ChecklistNote, "title"> & { items: string[] };
type NewIdea = Pick<IdeaNote, "title" | "color"> & { tags: string[] };

interface NotesState {
  notes: Note[];
  checklists: ChecklistNote[];
  ideas: IdeaNote[];
  hasHydrated: boolean;
  addNote: (input: NewNote) => void;
  addChecklist: (input: NewChecklist) => void;
  addIdea: (input: NewIdea) => void;
  deleteContent: (type: ContentType, id: string) => void;
  toggleChecklistItem: (checklistId: string, itemId: string) => void;
  findContent: (type: ContentType, id: string) => AnyNote | undefined;
  setHasHydrated: (value: boolean) => void;
}

const seedDate = "2026-05-29T09:00:00.000Z";

const seedData = {
  notes: [
    {
      id: "note-1",
      type: "note" as const,
      title: "Resumen de clase",
      content: "Revisar arquitectura movil, Expo Router, Zustand y persistencia local.",
      createdAt: seedDate,
      updatedAt: seedDate
    }
  ],
  checklists: [
    {
      id: "checklist-1",
      type: "checklist" as const,
      title: "Preparar entrega",
      items: [
        { id: "item-1", text: "Crear tabs principales", isCompleted: true },
        { id: "item-2", text: "Validar formulario con Zod", isCompleted: false },
        { id: "item-3", text: "Probar persistencia local", isCompleted: false }
      ],
      createdAt: seedDate,
      updatedAt: seedDate
    }
  ],
  ideas: [
    {
      id: "idea-1",
      type: "idea" as const,
      title: "Modo archivo",
      tags: ["mejora", "ux", "futuro"],
      color: "#FEF3C7",
      createdAt: seedDate,
      updatedAt: seedDate
    }
  ]
};

function createId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export const useNotesStore = create<NotesState>()(
  persist(
    (set, get) => ({
      ...seedData,
      hasHydrated: false,
      setHasHydrated: (value) => set({ hasHydrated: value }),
      addNote: (input) =>
        set((state) => {
          const date = nowIso();
          return {
            notes: [
              {
                id: createId("note"),
                type: "note",
                title: input.title.trim(),
                content: input.content.trim(),
                createdAt: date,
                updatedAt: date
              },
              ...state.notes
            ]
          };
        }),
      addChecklist: (input) =>
        set((state) => {
          const date = nowIso();
          const items: ChecklistItem[] = input.items.map((text) => ({
            id: createId("item"),
            text: text.trim(),
            isCompleted: false
          }));
          return {
            checklists: [
              {
                id: createId("checklist"),
                type: "checklist",
                title: input.title.trim(),
                items,
                createdAt: date,
                updatedAt: date
              },
              ...state.checklists
            ]
          };
        }),
      addIdea: (input) =>
        set((state) => {
          const date = nowIso();
          return {
            ideas: [
              {
                id: createId("idea"),
                type: "idea",
                title: input.title.trim(),
                tags: input.tags.map((tag) => tag.trim()).filter(Boolean),
                color: input.color,
                createdAt: date,
                updatedAt: date
              },
              ...state.ideas
            ]
          };
        }),
      deleteContent: (type, id) =>
        set((state) => ({
          notes: type === "note" ? state.notes.filter((item) => item.id !== id) : state.notes,
          checklists:
            type === "checklist" ? state.checklists.filter((item) => item.id !== id) : state.checklists,
          ideas: type === "idea" ? state.ideas.filter((item) => item.id !== id) : state.ideas
        })),
      toggleChecklistItem: (checklistId, itemId) =>
        set((state) => ({
          checklists: state.checklists.map((checklist) =>
            checklist.id === checklistId
              ? {
                  ...checklist,
                  updatedAt: nowIso(),
                  items: checklist.items.map((item) =>
                    item.id === itemId ? { ...item, isCompleted: !item.isCompleted } : item
                  )
                }
              : checklist
          )
        })),
      findContent: (type, id) => {
        const state = get();
        if (type === "note") return state.notes.find((item) => item.id === id);
        if (type === "checklist") return state.checklists.find((item) => item.id === id);
        return state.ideas.find((item) => item.id === id);
      }
    }),
    {
      name: "noteflow-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        notes: state.notes,
        checklists: state.checklists,
        ideas: state.ideas
      }),
      onRehydrateStorage: () => (state) => state?.setHasHydrated(true)
    }
  )
);
