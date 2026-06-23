import { Button, Tab, Tabs } from "@mui/material";
import "../styles/book_row.css";
import { BookCard } from "./book_card";
import { useState } from "react";
import { useEffect } from "react";
import { GetGenreBooks } from "./fetch_data";
import { useNavigate } from "react-router-dom";

export function BookRows(props) {

    const navigate = useNavigate();
    const [books, setBooks] = useState([]);

    const loadBooks = async () => {
        const loadedBooks = await GetGenreBooks(props.genre.id);
        const displayedBooks = loadedBooks.slice(0, 5); // only show 5 books in homepage
        setBooks(displayedBooks);
    }

    const showAll = () => {
        navigate(`/genres/${props.genre.id}`);
    }

    useEffect(() => {
        loadBooks();
    }, []);

    return (
        <div className="book-row">
            <div className="row-header">
                <div className="genre-name"> {props.genre.name}</div>
                <Button onClick={showAll}>Show all</Button>
            </div>
            <div className="book-slide">
                {books?.map((book) => {
                    return (
                        <BookCard key={book.id} book={book} />
                    );
                })}
            </div>
        </div>
    )
}