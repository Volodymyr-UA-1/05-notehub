import css from "./App.module.css";
import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import axios from "axios";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import NoteList from "../NoteList/NoteList";

interface Note {
    id: number;
    title: string;
}

interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
}

const perPage = 12;

const fetchNotes = async (
    search: string,
    page: number
): Promise<FetchNotesResponse> => {
    const response = await axios.get(
        "https://notehub-public.goit.study/api/notes",
        { params: { search, page, perPage } }
    );
    return response.data;
};

export default function App() {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const handleSearch = (value: string) => {
        setSearch(value);
        setPage(1);
    };

    const { data, isLoading, isError } = useQuery<FetchNotesResponse>({
        queryKey: ["notes", search, page],
        queryFn: () => fetchNotes(search, page),
        enabled: true, // або search.trim() !== "" якщо хочеш пошук тільки після введення
        placeholderData: keepPreviousData,
    });

    return (
        <div className={css.app}>
            <header className={css.toolbar}>
                <SearchBox onSearch={handleSearch} />

                {isLoading && <p>Loading...</p>}
                {isError && <p>Error 😢</p>}

                <NoteList notes={data?.notes ?? []} />

                <Pagination
                    page={page}
                    totalPages={data?.totalPages ?? 0}
                    onPageChange={setPage}
                />

                <button className={css.button}>Create note +</button>
            </header>
        </div>
    );
}