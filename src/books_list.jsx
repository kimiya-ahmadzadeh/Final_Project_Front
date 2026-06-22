import { useEffect, useState } from "react";
import "../styles/books_list.css"
import { PaginateBooks } from "./paginated_books";
import { Button, Modal, TextField } from "@mui/material";
import { Loading } from "./loading";
import { GetListBooks } from "./fetch_data";

export function BooksList(props) {

    console.log(props);

    const [open, setOpen] = useState(false);
    const [books, setBooks] = useState([]);

    const loadBooks = async () => {
        const loadedBooks = await GetListBooks(props.list.id);
        setBooks(loadedBooks);
    }

    useEffect(() => {
        loadBooks();
    }, [props.list]);

    return (
        <>
            {
                props.list == undefined ? <Loading /> :
                    <div className="books-list">
                        <div className="list-header">
                            <div className="list-info">
                                <div className="list-name">{props.list.name}</div>
                                <div className="list-desc">{props.list.description}</div>
                            </div>
                            <div className="edit-list-btn"><Button variant="outlined" onClick={() => setOpen(true)}>Edit List</Button></div>
                        </div>
                        <PaginateBooks books={books} />
                        <Modal open={open} onClose={() => setOpen(false)} className="edit-list-modal">
                            <div className="modal-list">
                                <TextField variant="outlined" label="List Name" value={props.list.name} />
                                <TextField variant="outlined" label="List Description" value={props.list.description} />
                                <Button variant="outlined">Save Changes</Button>
                            </div>
                        </Modal>
                    </div>
            }
        </>
    );
}