import "../styles/paginated_lists.css";
import { useState } from "react";
import { Pagination } from "@mui/material";
import { ListCard } from "./list_card";


export function PaginateLists(props) {
    const [page, setPage] = useState(1);
    const perPage = 8;
    const pageCount = Math.ceil(props.lists.length / perPage);
    const currentLists = props.lists.slice((page - 1) * perPage, ((page - 1) * perPage + perPage));

    const handlePageClick = (event, value) => {
        setPage(value);
    };

    return (
        <div className="list">
            <div className="page">
                {currentLists.map((list, index) => {
                    return (
                        <ListCard list={list} />
                    );
                })}
            </div>
            <div className="pages-control">
                <Pagination count={pageCount} page={page} onChange={handlePageClick} />
            </div>
        </div>
    )
}