import { Pagination } from "@mui/material";
import { PaginationItem } from '@mui/material';
import "../styles/books_list.css"
import { BookCard } from "./book_card"

export function BooksList(props) {
    return (
        <div className="books-list">
            <div className="list-header">List Name</div>
            <div className="list">
                {props.books.map((book, index) => {
                    return (
                        <BookCard book={book} />
                    );
                })}
            </div>
        </div >
    )
}