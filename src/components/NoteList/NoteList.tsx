import css from "./NoteList.module.css";
import type { Note } from "../../types/note";

interface NoteListProps {
    notes: Note[];
    onDelete: (id: string) => void;
}

export default function NoteList({ notes, onDelete }: NoteListProps) {
    if (notes.length === 0) {
        return <p className={css.empty}>No notes found</p>;
    }

    return (
        <ul className={css.list}>
            {notes.map((note) => (
                <li key={note.id} className={css.item}>
                    <h3>{note.title}</h3>
                    <p>{note.content}</p>
                    <span className={css.tag}>{note.tag}</span>

                    <button
                        className={css.deleteButton}
                        onClick={() => onDelete(note.id)}
                    >
                        Delete
                    </button>
                </li>
            ))}
        </ul>
    );
}