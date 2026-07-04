import { Alert, Button, Modal, TextField } from "@mui/material";
import { PaginateBooks } from "./paginated_books";
import { PaginateArray } from "./paginated_array";
import { EditBook } from "./edit_book";
import { useEffect, useState } from "react";
import { get, GetUserID, post } from "./fetch_data";
import { CustomButton } from "./custom_button";
import { CustomField } from "./custom_textfield";
import { Close } from "@mui/icons-material";

export function AdminContent(props) {

    const [open, setOpen] = useState(false);
    const [genres, setGenres] = useState([]);
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [showAlert, setShowAlert] = useState("none");
    const [alertText, setAlertText] = useState("");
    const userID = GetUserID();

    const loadGenres = async () => {
        const loadedGenres = await get(`genres`);
        let genreOpt = [];
        loadedGenres.forEach((g) => genreOpt.push({ id: g.id, g, label: g.name }));
        setGenres(genreOpt);
    }

    const closeModal = () => {
        setOpen(false);
        props.changePage();
    }

    const addItem = async () => {
        if (name.length > 0) {
            if (name == "Recent Books" || name == "Favorite Books" || name == "Bookmarked Books") {
                setAlertText("This list exists by default.");
                setShowAlert('flex');
            }
            (props.type == "Genres") ? await post(`genres`, { name })
                : await post(`admin/lists`, { name, description: desc, user_id: userID });
            setOpen(false);
            props.changePage();
        }
        else {
            setAlertText("Fill the required field.");
            setShowAlert('flex');
        }
    }

    useEffect(() => {
        loadGenres();
    }, []);

    return (
        <div>
            {props.type == "Books" ? <div className="content">
                <div className="tab-content-header">
                    <CustomButton onClick={() => setOpen(true)} text="Add" />
                </div>
                <div>
                    <PaginateBooks books={props.items} source="admin" changePage={props.changePage} perPage={9} />
                </div>
                <Modal open={open} onClose={() => setOpen(false)} className="modal">
                    <EditBook genres={genres} type={false} close={() => closeModal()} />
                </Modal>
            </div> : <div className="content">
                <div className="tab-content-header">
                    <CustomButton onClick={() => setOpen(true)} text="Add" />
                </div>
                <div>
                    <PaginateArray type={props.type} items={props.items} books={props.books} changePage={props.changePage} perPage={10} />
                </div>
                <Modal open={open} onClose={() => setOpen(false)} className="modal">
                    <div className="modal-content">
                        <div>Add {props.type}</div>
                        <CustomField label="Name" onChange={(e) => setName(e.target.value.trim())} required />
                        <Alert severity="error" style={{ display: showAlert }}
                            action={<Close onClick={() => setShowAlert("none")} />}>{alertText}</Alert>
                        {props.type == "Lists" ? <div><CustomField label="Description" onChange={(e) => setDesc(e.target.value)} /></div> : null}
                        <CustomButton onClick={() => addItem()} text="Add" />
                    </div>
                </Modal>
            </div>}
        </div>
    );
}