import "../styles/peginated_list.css";
import { useEffect, useState } from "react";
// import ReactPaginate from "react-paginate";
import { BookCard } from "./book_card";
import { Pagination } from "@mui/material";


export function PaginateBooks(props) {
    const pageCount = 2;
    const [page, setPage] = useState(1);
    const perPage = 8;
    const currentBooks = props.books.slice((page - 1) * perPage, ((page - 1) * perPage + perPage));

    const handlePageClick = (event, value) => {
        setPage(value);
    };

    return (
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
    )
}