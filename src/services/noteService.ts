import axios, { AxiosResponse } from "axios";
import type { Note } from "../types/note";

/* =======================
   Axios instance
======================= */

const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer YOUR_TOKEN_HERE`, //свій токен
  },
});

/* =======================
   Types
======================= */

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  search?: string;
  page?: number;
  perPage?: number;
}

/* =======================
   API functions
======================= */

/**
 * Отримати список нотаток
 * підтримує пошук і пагінацію
 */
export const fetchNotes = async ({
  search = "",
  page = 1,
  perPage = 12,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const response: AxiosResponse<FetchNotesResponse> = await api.get("/notes", {
    params: { search, page, perPage },
  });

  return response.data;
};

/**
 * Створити нову нотатку
 */
export const createNote = async (
  noteData: Omit<Note, "id" | "createdAt" | "updatedAt">,
): Promise<Note> => {
  const response: AxiosResponse<Note> = await api.post("/notes", noteData);
  return response.data;
};

/**
 * Видалити нотатку за ID
 */
export const deleteNote = async (id: string): Promise<Note> => {
  const response: AxiosResponse<Note> = await api.delete(`/notes/${id}`);
  return response.data;
};
