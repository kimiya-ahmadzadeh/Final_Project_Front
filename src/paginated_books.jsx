import "../styles/paginated_books.css";
import { useEffect, useState } from "react";
import { BookCard } from "./book_card";
import { Pagination } from "@mui/material";
import { Loading } from "./loading";


export function PaginateBooks(props) {
    const [page, setPage] = useState(1);
    const perPage = 8;
    const pageCount = Math.ceil(props.books.length / perPage);
    const currentBooks = props.books.slice((page - 1) * perPage, ((page - 1) * perPage + perPage));

    const handlePageClick = (event, value) => {
        setPage(value);
    };

    return (
        // <>
        //     {
        //         props.books == undefined ? <Loading /> :
        <div className="list">
            <div className="page">
                {currentBooks.map((book, index) => {
                    return (
                        <BookCard book={book} />
                    );
                })}
            </div>
            <div className="pages-control">
                <Pagination count={pageCount} page={page} onChange={handlePageClick} />
            </div>
        </div>
        //     }
        // </>
    );
}