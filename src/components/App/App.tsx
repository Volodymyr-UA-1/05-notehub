import css from "./App.module.css";
import { useState } from "react";
import {
    useQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

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

    // ===== GET NOTES =====
    const { data, isLoading, isError } = useQuery({
        queryKey: ["notes", search, page],
        queryFn: () => fetchNotes({ search, page, perPage }),
        initialData: { notes: [], totalPages: 0 },
    });

    // ===== DELETE NOTE =====
    const { mutate: deleteMutation } = useMutation({
        mutationFn: deleteNote,
        onSuccess: () => {
            queryClient.invalidateQueries({
                predicate: (query) =>
                    Array.isArray(query.queryKey) &&
                    query.queryKey[0] === "notes",
            });
        },
    });

    const handleDelete = (id: string) => {
        deleteMutation(id);
    };

    const handleSearch = (value: string) => {
        setSearch(value);
        setPage(1);
    };

    return (
        <div className={css.app}>
            <header className={css.toolbar}>
                <SearchBox onSearch={handleSearch} />

                <Pagination
                    page={page}
                    totalPages={data.totalPages}
                    onPageChange={setPage}
                />

                <button
                    className={css.button}
                    onClick={() => setIsModalOpen(true)}
                >
                    Create note +
                </button>
            </header>

            {isLoading && <p>Loading...</p>}
            {isError && <p>Error 😢</p>}

            {data.notes.length > 0 ? (
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