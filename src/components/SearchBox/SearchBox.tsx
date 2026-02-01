import css from "./SearchBox.module.css";
import { useDebouncedCallback } from "use-debounce";
import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface Post {
    id: number;
    title: string;
    body: string;
}

const fetchNotes = async (search: string): Promise<Post[]> => {
    const response = await axios.get(
        `https://notehub-public.goit.study/api/notes?search=${search}`
    );
    return response.data;
};

export default function SearchBox() {
    const [inputValue, setInputValue] = useState("");

    const handleSearch = useDebouncedCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(event.target.value);
        },
        500
    );

    const { data, isLoading, isError } = useQuery({
        queryKey: ["notes", inputValue],
        queryFn: () => fetchNotes(inputValue),
        enabled: inputValue.trim() !== "",
    });

    return (
        <>
            <input
                className={css.input}
                type="text"
                onChange={handleSearch}
                placeholder="Search notes..."
            />

            {isLoading && <p>Loading...</p>}
            {isError && <p>Error 😢</p>}

            <ul>
                {data?.map((note) => (
                    <li key={note.id}>{note.title}</li>
                ))}
            </ul>
        </>
    );
}