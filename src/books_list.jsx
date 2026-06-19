import { PaginationItem } from "@mui/material";
import "../styles/books_list.css"
import { BookCard } from "./book_card"
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { PaginateBooks } from "./paginated_list";

export function BooksList() {
    const [books, setBooks] = useState([{ title: "Book1", author: "Author1" }, { title: "Book2", author: "Author2" },
    { title: "Book3", author: "Author3" }, { title: "Book4", author: "Author4" },
    { title: "Book5", author: "Author5" }, { title: "Book6", author: "Author6" },
    { title: "Book7", author: "Author7" }, { title: "Book8", author: "Author8" },
    { title: "Book9", author: "Author9" }, { title: "Book10", author: "Author10" },
    { title: "Book11", author: "Author11" }, { title: "Book12", author: "Author12" }]);

    return (
        <div className="books-list">
            <div className="list-header">List Name</div>
            <PaginateBooks books={books} />
        </div>
    )
}