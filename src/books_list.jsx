import { useState } from "react";
import "../styles/books_list.css"
import { PaginateBooks } from "./paginated_books";

export function BooksList(props) {

    return (
        <div className="books-list">
            <div className="list-header">{props.tab}</div>
            <PaginateBooks books={props.books} />
        </div>
    )
}