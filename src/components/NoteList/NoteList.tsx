import css from "./NoteList.module.css";
import type { Note } from "../../types/note";

interface NoteListProps {
    notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
    if (!notes || notes.length === 0) return <p className={css.empty}>No notes found</p>;

    return (
        <ul className={css.list}>
            {notes.map((note) => (
                <li key={note.id} className={css.listItem}>
                    <h2 className={css.title}>{note.title}</h2>
                    {note.content && <p className={css.content}>{note.content}</p>}
                    {note.tag && <span className={css.tag}>{note.tag}</span>}
                </li>
            ))}
        </ul>
    );
}