import { Button, Tab, Tabs } from "@mui/material";
import "../styles/book_row.css";
import { BookCard } from "./book_card";
import { useState } from "react";
import { useEffect } from "react";
import { get } from "./fetch_data";
import { useNavigate } from "react-router-dom";

export function BookRows(props) {

    const navigate = useNavigate();
    const [books, setBooks] = useState([]);

    const loadBooks = async () => {
        const loadedBooks = (props.source == "genre") ? await get(`books/genre/${props.item.id}`)
            : await get(`lists/${props.item.id}`);
        const displayedBooks = loadedBooks.slice(0, 5); // only show 5 books in homepage
        setBooks(displayedBooks);
    }

    const showAll = () => {
        navigate(`/more/${props.source}/${props.item.id}`);
    }

    useEffect(() => {
        loadBooks();
    }, [props.item]);

    return (
        <div className="book-row">
            <div className="row-header">
                <div className="genre-name">{props.item.name}</div>
                {props.source == "list" ? <div className="genre-desc">{props.item.description}</div> : null}
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