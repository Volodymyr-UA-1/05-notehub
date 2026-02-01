import css from "./App.module.css";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import NoteList from "../NoteList/NoteList";
import Modal from "../Modal/Modal";
import { fetchNotes, deleteNote } from "../../services/noteService";

const perPage = 12;

export default function App() {
    const queryClient = useQueryClient();
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 1. Отримуємо дані
    const { data, isLoading, isError } = useQuery({
        queryKey: ["notes", search, page],
        queryFn: () => fetchNotes({ search, page, perPage }),
    });

    // 2. Мутація для видалення
    const { mutate: deleteMutation } = useMutation({
        mutationFn: (id: string) => deleteNote(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
        },
    });

    const handleSearch = (value: string) => {
        setSearch(value);
        setPage(1);
    };

    const handleDelete = (id: string) => {
        deleteMutation(id);
    };

    return (
        <div className={css.app}>
            <header className={css.toolbar}>
                <SearchBox onSearch={handleSearch} />

                <Pagination
                    page={page}
                    totalPages={data?.totalPages ?? 0}
                    onPageChange={setPage}
                />

                <button
                    className={css.button}
                    onClick={() => setIsModalOpen(true)}
                >
                    Create note +
                </button>
            </header>

            {isLoading && !data && <p>Loading...</p>}
            {isError && <p>Error 😢</p>}

            {/* ВИПРАВЛЕННЯ: додано перевірку на існування data та передачу onDelete */}
            {data?.notes && data.notes.length > 0 ? (
                <NoteList notes={data.notes} onDelete={handleDelete} />
            ) : (
                !isLoading && <p>No notes found</p>
            )}

            {isModalOpen && (
                <Modal onClose={() => setIsModalOpen(false)} />
            )}
        </div>
    );
}