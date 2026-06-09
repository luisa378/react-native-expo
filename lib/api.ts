import { AnyNote, ChecklistItem } from "@/types";

const BASE_URL = (process.env.EXPO_PUBLIC_API_URL ?? "http://192.168.1.149:3000/api").trim();

// Log para debugging
console.log("[API] BASE_URL configurada:", BASE_URL);
console.log("[API] EXPO_PUBLIC_API_URL:", process.env.EXPO_PUBLIC_API_URL);

type CreateNoteInput = {
  type: "note";
  title: string;
  content: string;
};

type CreateChecklistInput = {
  type: "checklist";
  title: string;
  items: string[];
};

type CreateIdeaInput = {
  type: "idea";
  title: string;
  tags: string[];
  color: string;
};

export type CreateContentInput = CreateNoteInput | CreateChecklistInput | CreateIdeaInput;

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const url = `${BASE_URL}${path}`;
  const method = options?.method || "GET";
  
  console.log(`[API] ${method} ${url}`);
  
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers
      }
    });

    console.log(`[API] ${method} ${url} - Status: ${res.status}`);

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`[API] Error ${res.status}:`, errorText);
      throw new Error(`Error HTTP ${res.status}: ${errorText || "Sin detalles"}`);
    }

    if (res.status === 204) {
      console.log(`[API] ${method} ${url} - Respuesta OK`);
      return undefined as T;
    }

    const data = await res.json() as T;
    console.log(`[API] ${method} ${url} - Respuesta OK`);
    return data;
  } catch (error) {
    console.error(`[API] Error en ${method} ${url}:`, error);
    throw error;
  }
}

export async function getNotes(): Promise<AnyNote[]> {
  return request<AnyNote[]>("/notes");
}

export async function createContent(data: CreateContentInput): Promise<AnyNote> {
  return request<AnyNote>("/notes", {
    method: "POST",
    body: JSON.stringify(data)
  });
}

export async function deleteContentRequest(id: string): Promise<void> {
  await request<void>(`/notes/${id}`, {
    method: "DELETE"
  });
}

export async function updateChecklistItem(itemId: string, data: Partial<ChecklistItem>): Promise<void> {
  await request<{ ok: boolean }>(`/checklist-items/${itemId}`, {
    method: "PATCH",
    body: JSON.stringify(data)
  });
}
