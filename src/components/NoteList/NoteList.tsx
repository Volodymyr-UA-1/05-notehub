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

                <li key={note.id} className={css.listItem}>
                    <h3 className={css.title}>{note.title}</h3>
                    <p className={css.content}>{note.content}</p>
                    <div className={css.footer}>
                        <span className={css.tag}>{note.tag}</span>

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