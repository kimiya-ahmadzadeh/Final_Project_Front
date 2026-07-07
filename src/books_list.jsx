import { useEffect, useState } from "react";
import { PaginateBooks } from "./paginated_books";
import { Alert, Modal } from "@mui/material";
import { Loading } from "./loading";
import { deleting, get, put } from "./fetch_data";
import { CustomButton } from "../customs/custom_button";
import { Close } from "@mui/icons-material";
import { CustomIcon } from "../customs/custom_icon";
import { CustomField } from "../customs/custom_textfield";
import "../styles/books_list.css";

export function BooksList(props) {

    const [open, setOpen] = useState(false);
    const [books, setBooks] = useState([]);
    const [listName, setListName] = useState("");
    const [listDesc, setListDesc] = useState("");
    const [showAlert, setShowAlert] = useState("none");
    const [alertText, setAlertText] = useState("");

    const loadBooks = async () => {
        const loadedBooks = await get(`lists/${props.list?.id}`);
        setListName(props.list?.name);
        setListDesc(props.list?.description);
        setBooks(loadedBooks);
    }

    const editList = async () => {
        let name = listName.trim();
        if (listName == "Recent Books" || listName == "Favorite Books" || listName == "Bookmarked Books") {
            setAlertText("This list exists by default.");
            setShowAlert('flex');
        }
        if (listName.length == 0) {
            console.log(name.trim());
            setAlertText("Fill the required field.");
            setShowAlert('flex');
        }
        else {
            const body = { name: listName, description: listDesc, id: props.list.id };
            const changedList = await put(`users/lists`, body);
            props.changePage();
            setOpen(false);
        }
    }

    const deleteList = async () => {
        const deletedList = await deleting(`users/lists/${props.list.id}`);
        props.changePage(true);
    }

    useEffect(() => {
        loadBooks();
    }, [props.list]);

    return (
        <>
            {props.list == undefined ? <Loading /> :
                <div className="books-list">
                    <div className="list-header">
                        <div className="list-info">
                            <div className="list-name">{props.list.name}</div>
                            <div className="list-desc">{props.list.description}</div>
                        </div>
                        <div className="list-btns" style={{ visibility: props.list.created ? "visible" : "hidden" }}>
                            <CustomIcon type="edit" onClick={() => setOpen(true)} />
                            <CustomIcon type="del" onClick={() => deleteList()} />
                        </div>
                    </div>
                    <PaginateBooks books={books} listID={props.list.id} source={props.source} changePage={props.changePage} perPage={6} />
                    <Modal open={open} onClose={() => setOpen(false)} className="list-modal">
                        <div className="modal-list">
                            <h3>Edit List</h3>
                            <CustomField label="List Name" required defaultValue={listName} onChange={(e) => setListName(e.target.value.trim())} />
                            <Alert severity="error" style={{ display: showAlert }}
                                action={<Close onClick={() => setShowAlert("none")} />}>{alertText}</Alert>
                            <CustomField label="List Description" defaultValue={listDesc} onChange={(e) => setListDesc(e.target.value)} />
                            <CustomButton onClick={editList} text="Save Changes" />
                        </div>
                    </Modal>
                </div>}
        </>
    );
}