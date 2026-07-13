import { useEffect, useState } from "react";
import { BookCard } from "./book_card";
import { Pagination } from "@mui/material";
import { Loading } from "./loading";
import "../styles/paginated_books.css";

export function PaginateBooks(props) {
    const [page, setPage] = useState(1);
    const pageCount = Math.ceil(props.books?.length / props.perPage);
    const currentBooks = props.books?.slice((page - 1) * props.perPage, ((page - 1) * props.perPage + props.perPage));

    useEffect(() => {
        setPage(1);
    }, [props.books]);

    return (
        <>
            {props.books == undefined ? <Loading /> :
                <div className="list">
                    {props.books.length == 0 ? <div>Nothing to show here</div> : <>
                        <div className="page">
                            {currentBooks.map((book, index) => {
                                return (
                                    <BookCard book={book} listID={props.listID} source={props.source} changePage={props.changePage} />
                                );
                            })}
                        </div>
                        <div className="pages-control">
                            <Pagination count={pageCount} page={page} onChange={(event, value) => { setPage(value) }} />
                        </div>
                    </>}
                </div>}
        </>
    );
}