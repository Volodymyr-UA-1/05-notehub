import css from "./App.module.css";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

import NoteForm from "../NoteForm/NoteForm";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import NoteList from "../NoteList/NoteList";
import Modal from "../Modal/Modal";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import EmptyState from "../EmptyState/EmptyState";

import { fetchNotes } from "../../services/noteService";

const perPage = 12;

export default function App() {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ✅ debounce пошуку
    const [debouncedSearch] = useDebounce(search, 500);

    // ===== GET NOTES =====
    const { data, isLoading, isError, isFetching } = useQuery({
        queryKey: ["notes", debouncedSearch, page],
        queryFn: () => fetchNotes({ search: debouncedSearch, page, perPage }),
        initialData: { notes: [], totalPages: 0 },
        placeholderData: (previousData) => previousData, // залишає старі дані під час нового запиту
    });

    // ===== ОБРОБНИК ПОШУКУ =====
    const handleSearch = (value: string) => {
        setSearch(value);
        setPage(1); // скидаємо на першу сторінку при новому пошуку
    };

    // ===== ОБРОБНИК ЗМІНИ СТОРІНКИ =====
    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= data.totalPages) {
            setPage(newPage);
        }
    };

    // ===== РЕНДЕР =====
    return (
        <div className={css.app}>
            <header className={css.toolbar}>
                <SearchBox onSearch={handleSearch} />

                {data.totalPages > 1 && (
                    <Pagination
                        page={page}
                        totalPages={data.totalPages}
                        onPageChange={handlePageChange}
                    />
                )}

                <button
                    className={css.button}
                    onClick={() => setIsModalOpen(true)}
                >
                    Create note +
                </button>
            </header>

            {/* Loader можна показати поверх старих нотаток */}
            {isLoading && !data.notes.length && <Loader />}
            {isError && <ErrorMessage />}

            {/* Список нотаток */}
            {data.notes.length > 0 ? (
                <>
                    <NoteList notes={data.notes} />
                    {isFetching && isLoading && <Loader />}
                </>
            ) : (
                !isLoading && !isError && (
                    <EmptyState
                        message={
                            debouncedSearch
                                ? "No notes found for your search"
                                : page > data.totalPages
                                    ? "This page is empty"
                                    : "No notes available"
                        }
                    />
                )
            )}

            {isModalOpen && (
                <Modal onClose={() => setIsModalOpen(false)}>
                    <NoteForm onCancel={() => setIsModalOpen(false)} />
                </Modal>
            )}
        </div>
    );
}