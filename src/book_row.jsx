import { Tab, Tabs } from "@mui/material";
import { BookCard } from "./book_card";
import { useState, useEffect } from "react";
import { get } from "./fetch_data";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../customs/custom_button";
import { KeyboardArrowRight } from "@mui/icons-material";
import "../styles/book_row.css";

export function BookRows(props) {

    const navigate = useNavigate();
    const [books, setBooks] = useState([]);

    const loadBooks = async () => {
        const loadedBooks = (props.source == "genre") ? await get(`books/genre/${props.item?.id}`)
            : await get(`lists/${props.item?.id}`);
        const displayedBooks = loadedBooks.slice(0, 5);
        setBooks(displayedBooks);
    }

    const showAll = () => {
        navigate(`/more/${props.source}/${props.item.id}`);
    }

    useEffect(() => {
        loadBooks();
    }, [props]);

    return (
        <div className="book-row">
            <div className="row-header">
                <div className="rec-info">
                    <div className="row-name">{props.item.name}</div>
                    {props.source == "list" ? <div className="row-desc">{props.item.description}</div> : null}
                </div>
                <CustomButton onClick={showAll} text="Show All" endIcon={<KeyboardArrowRight />} />
            </div>
            <div className="scroll">
                {books?.map((book) => {
                    return (
                        <BookCard key={book.id} book={book} />
                    );
                })}
            </div>
        </div>
    );
}