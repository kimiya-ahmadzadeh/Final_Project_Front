import { Button } from "@mui/material";
import { PaginateBooks } from "./paginated_books";
import { PaginateArray } from "./paginated_array";

export function AdminContent(props) {
    return (
        <div className="content">
            {props.type == "Books" ? <div className="admin-tab-content">
                <div className="tab-content-header">
                    <h3>{props.type}</h3>
                    <Button variant="outlined">Add</Button>
                </div>
                <div>
                    <PaginateBooks books={props.items} source="admin" changePage={props.changePage} />
                </div>
            </div> : <div className="admin-tab-content">
                <div className="tab-content-header">
                    <h3>{props.type}</h3>
                    <Button variant="outlined">Add</Button>
                </div>
                <div>
                    <PaginateArray type={props.type} items={props.items} books={props.books} changePage={props.changePage} />
                </div>
            </div>}
        </div>
    );
}

// add books to genre and list, get options for each, default value and edit