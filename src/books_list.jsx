import { useState } from "react";
import "../styles/books_list.css"
import { PaginateBooks } from "./paginated_books";
import { Button, Modal, TextField } from "@mui/material";

export function BooksList(props) {

    const [open, setOpen] = useState(false);
    return (
        <div className="books-list">
            <div className="list-header">
                <div className="list-info">
                    <div className="list-name">{props.list.name}</div>
                    <div className="list-desc">{props.list.description}</div>
                </div>
                <div className="edit-list-btn"><Button variant="outlined" onClick={() => setOpen(true)}>Edit List</Button></div>
            </div>
            <PaginateBooks books={props.list.books} />
            <Modal open={open} onClose={() => setOpen(false)} className="edit-list-modal">
                <div className="modal-list">
                    <TextField variant="outlined" label="List Name" value={props.list.name} />
                    <TextField variant="outlined" label="List Description" value={props.list.description} />
                    <Button variant="outlined">Save Changes</Button>
                </div>
            </Modal>
        </div>
    )
}