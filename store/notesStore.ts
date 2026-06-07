import { create } from "zustand";
import { createContent, deleteContentRequest, getNotes, updateChecklistItem } from "@/lib/api";
import { AnyNote, ChecklistItem, ChecklistNote, ContentType, IdeaNote, Note } from "@/types";

type NewNote = Pick<Note, "title" | "content">;
type NewChecklist = Pick<ChecklistNote, "title"> & { items: string[] };
type NewIdea = Pick<IdeaNote, "title" | "color"> & { tags: string[] };

interface NotesState {
  notes: Note[];
  checklists: ChecklistNote[];
  ideas: IdeaNote[];
  hasHydrated: boolean;
  isLoading: boolean;
  error: string | null;
  fetchContent: () => Promise<void>;
  addNote: (input: NewNote) => Promise<void>;
  addChecklist: (input: NewChecklist) => Promise<void>;
  addIdea: (input: NewIdea) => Promise<void>;
  deleteContent: (type: ContentType, id: string) => Promise<void>;
  toggleChecklistItem: (checklistId: string, itemId: string) => Promise<void>;
  findContent: (type: ContentType, id: string) => AnyNote | undefined;
  setHasHydrated: (value: boolean) => void;
}

function splitContent(items: AnyNote[]) {
  return {
    notes: items.filter((item): item is Note => item.type === "note"),
    checklists: items.filter((item): item is ChecklistNote => item.type === "checklist"),
    ideas: items.filter((item): item is IdeaNote => item.type === "idea")
  };
}

export const useNotesStore = create<NotesState>()((set, get) => ({
  notes: [],
  checklists: [],
  ideas: [],
  hasHydrated: false,
  isLoading: false,
  error: null,
  setHasHydrated: (value) => set({ hasHydrated: value }),
  fetchContent: async () => {
    set({ isLoading: true, error: null });
    try {
      const items = await getNotes();
      set({ ...splitContent(items), hasHydrated: true, isLoading: false });
    } catch {
      set({
        error: "No se pudieron cargar los datos",
        hasHydrated: true,
        isLoading: false
      });
    }
  },
  addNote: async (input) => {
    const created = await createContent({ type: "note", ...input });
    if (created.type === "note") {
      set((state) => ({ notes: [created, ...state.notes] }));
    }
  },
  addChecklist: async (input) => {
    const created = await createContent({ type: "checklist", ...input });
    if (created.type === "checklist") {
      set((state) => ({ checklists: [created, ...state.checklists] }));
    }
  },
  addIdea: async (input) => {
    const created = await createContent({ type: "idea", ...input });
    if (created.type === "idea") {
      set((state) => ({ ideas: [created, ...state.ideas] }));
    }
  },
  deleteContent: async (type, id) => {
    await deleteContentRequest(id);
    set((state) => ({
      notes: type === "note" ? state.notes.filter((item) => item.id !== id) : state.notes,
      checklists:
        type === "checklist" ? state.checklists.filter((item) => item.id !== id) : state.checklists,
      ideas: type === "idea" ? state.ideas.filter((item) => item.id !== id) : state.ideas
    }));
  },
  toggleChecklistItem: async (checklistId, itemId) => {
    const checklist = get().checklists.find((item) => item.id === checklistId);
    const item = checklist?.items.find((task) => task.id === itemId);

    if (!item) return;

    await updateChecklistItem(itemId, { isCompleted: !item.isCompleted });

    set((state) => ({
      checklists: state.checklists.map((current) =>
        current.id === checklistId
          ? {
              ...current,
              updatedAt: new Date().toISOString(),
              items: current.items.map((task: ChecklistItem) =>
                task.id === itemId ? { ...task, isCompleted: !task.isCompleted } : task
              )
            }
          : current
      )
    }));
  },
  findContent: (type, id) => {
    const state = get();
    if (type === "note") return state.notes.find((item) => item.id === id);
    if (type === "checklist") return state.checklists.find((item) => item.id === id);
    return state.ideas.find((item) => item.id === id);
  }
}));
