import { useEffect, useState } from "react";
import "../styles/books_list.css"
import { PaginateBooks } from "./paginated_books";
import { Button, Modal, TextField } from "@mui/material";
import { Loading } from "./loading";
import { deleting, get, put } from "./fetch_data";

export function BooksList(props) {

    const [open, setOpen] = useState(false);
    const [books, setBooks] = useState([]);
    const [listName, setListName] = useState("");
    const [listDesc, setListDesc] = useState("");

    const loadBooks = async () => {
        const loadedBooks = await get(`lists/${props.list.id}`);
        setListName(props.list.name);
        setListDesc(props.list.description);
        setBooks(loadedBooks);
    }

    const editList = async () => {
        if (listName == "Recent Books" || listName == "Favorite Books" || listName == "Bookmarked Books") {
            window.alert("Can't choose this name.");
        }
        else {
            const body = { name: listName, description: listDesc, listID: props.list.id };
            const changedList = await put(`users/lists`, body);
            props.changeList();
        }
        setOpen(false);
    }

    const deleteList = async () => {
        const deletedList = await deleting(`users/lists/${props.list.id}`);
        props.changeList(true);
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
                            <div className="list-btns" style={{ visibility: props.list.created ? "visible" : "hidden" }}>
                                <div className="edit-list-btn"><Button variant="outlined" onClick={() => setOpen(true)}>Edit List</Button></div>
                                <div className="delete-list-btn"><Button variant="outlined" onClick={() => deleteList()}>Delete List</Button></div>
                            </div>
                        </div>
                        <PaginateBooks books={books} listID={props.list.id} source={props.source} changePage={props.changePage} />
                        <Modal open={open} onClose={() => setOpen(false)} className="edit-list-modal">
                            <div className="modal-list">
                                <TextField variant="outlined" label="List Name" value={listName} onChange={(e) => setListName(e.target.value)} />
                                <TextField variant="outlined" label="List Description" value={listDesc} onChange={(e) => setListDesc(e.target.value)} />
                                <Button variant="outlined" onClick={editList}>Save Changes</Button>
                            </div>
                        </Modal>
                    </div>
            }
        </>
    );
}