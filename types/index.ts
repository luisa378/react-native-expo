export type ContentType = "note" | "checklist" | "idea";

export interface BaseContent {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface Note extends BaseContent {
  type: "note";
  content: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  isCompleted: boolean;
}

export interface ChecklistNote extends BaseContent {
  type: "checklist";
  items: ChecklistItem[];
}

export interface IdeaNote extends BaseContent {
  type: "idea";
  tags: string[];
  color: string;
}

export type AnyNote = Note | ChecklistNote | IdeaNote;

export function isNote(item: AnyNote): item is Note {
  return item.type === "note";
}

export function isChecklist(item: AnyNote): item is ChecklistNote {
  return item.type === "checklist";
}

export function isIdea(item: AnyNote): item is IdeaNote {
  return item.type === "idea";
}
