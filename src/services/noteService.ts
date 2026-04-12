// fetchNotes : має виконувати запит для отримання колекції нотаток із сервера. Повинна підтримувати пагінацію (через параметр сторінки) та фільтрацію за ключовим словом (пошук);
// createNote: має виконувати запит для створення нової нотатки на сервері. Приймає вміст нової нотатки та повертає створену нотатку у відповіді;
// deleteNote: має виконувати запит для видалення нотатки за заданим ідентифікатором. Приймає ID нотатки та повертає інформацію про видалену нотатку у відповіді.

import axios from "axios";
import type { Note, Tag, TagSortBy } from "../types/note";

const authToken = import.meta.env.VITE_NOTEHUB_TOKEN;

const instance = axios.create({
  baseURL: "https://notehub-public.goit.study/api/",
  headers: { Authorization: `Bearer ${authToken}` },
});

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesRequest {
  search?: string;
  tag?: Tag;
  page?: number;
  sortBy?: TagSortBy;
}

export async function fetchNotes({
  search,
  tag,
  page,
  sortBy,
}: FetchNotesRequest): Promise<FetchNotesResponse> {
  const response = await instance.get<FetchNotesResponse>("notes", {
    params: {
      search,
      tag,
      page,
      perPage: 10,
      sortBy,
    },
  });

  return response.data;
}

export interface CreateNote {
  title: string;
  content: string;
  tag: Tag;
}

export async function createNote(params: CreateNote): Promise<Note> {
  const response = await instance.post<Note>("notes", params);
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await instance.delete<Note>(`notes/${id}`);
  return response.data;
}
