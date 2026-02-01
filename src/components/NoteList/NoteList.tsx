import css from "./NoteList.module.css";
import type { Note } from "../../types/note";

interface NoteListProps {
    notes: Note[];
    onDelete: (id: string) => void;
}

// 1. Додаємо onDelete в деструктуризацію пропсів
export default function NoteList({ notes, onDelete }: NoteListProps) {
    if (!notes || notes.length === 0) return <p className={css.empty}>No notes found</p>;

    return (
        <ul className={css.list}>
            {notes.map((note) => (
                <li key={note.id} className={css.listItem}>
                    <h2 className={css.title}>{note.title}</h2>
                    {note.content && <p className={css.content}>{note.content}</p>}

                    <div className={css.footer}>
                        {note.tag && <span className={css.tag}>{note.tag}</span>}

                        {/* 2. Додаємо кнопку видалення */}
                        <button
                            className={css.deleteBtn}
                            onClick={() => onDelete(note.id)}
                        >
                            Delete
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
}