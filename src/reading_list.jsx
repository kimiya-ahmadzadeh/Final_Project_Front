import { Button } from "@mui/material";
import "../styles/reading_list.css";
import { PaginateLists } from "./paginated_lists";

export function ReadingLists(props) {

    return (
        <div className="books-list">
            <div className="list-header">
                <h3>Reading Lists</h3>
                <div><Button variant="outlined">Add New List</Button></div>
            </div>
            <PaginateLists lists={props.lists} />
        </div>
    )
}