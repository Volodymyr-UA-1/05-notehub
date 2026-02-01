export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

// Сутність нотатки
export interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt: string;
}
