import { Tab, Tabs } from "@mui/material";
import "../styles/book_row.css";
import { BookCard } from "./book_card";

export function BookRows(props) {

    return (
        <div className="book-row">
            <div className="row-header">{props.header}</div>
            <div className="book-slide">
                {props.books.map((book, index) => {
                    return (
                        <BookCard book={book} />
                    );
                })}
            </div>
        </div>
    )
}