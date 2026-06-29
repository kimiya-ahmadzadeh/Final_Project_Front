import { Button, Modal, TextField } from "@mui/material";
import { PaginateBooks } from "./paginated_books";
import { PaginateArray } from "./paginated_array";
import { EditBook } from "./edit_book";
import { useEffect, useState } from "react";
import { get, GetUserID, post } from "./fetch_data";

export function AdminContent(props) {

    const [open, setOpen] = useState(false);
    const [genres, setGenres] = useState([]);
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
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
        (props.type == "Genres") ? await post(`genres`, { name })
            : await post(`users/lists`, { name, description: desc, user_id: userID, admin_id: userID });
        setOpen(false);
        props.changePage();
    }

    useEffect(() => {
        loadGenres();
    }, []);

    return (
        <div className="content">
            {props.type == "Books" ? <div className="admin-tab-content">
                <div className="tab-content-header">
                    <h3>{props.type}</h3>
                    <Button variant="outlined" onClick={() => setOpen(true)}>Add</Button>
                </div>
                <div>
                    <PaginateBooks books={props.items} source="admin" changePage={props.changePage} />
                </div>
                <Modal open={open} onClose={() => setOpen(false)}>
                    <EditBook genres={genres} type={false} close={() => closeModal()} />
                </Modal>
            </div> : <div className="admin-tab-content">
                <div className="tab-content-header">
                    <h3>{props.type}</h3>
                    <Button variant="outlined" onClick={() => setOpen(true)}>Add</Button>
                </div>
                <div>
                    <PaginateArray type={props.type} items={props.items} books={props.books} changePage={props.changePage} />
                </div>
                <Modal open={open} onClose={() => setOpen(false)}>
                    <div className="add-modal">
                        <div>Add {props.type}</div>
                        <div><TextField variant="outlined" label="Name" onChange={(e) => setName(e.target.value)} /></div>
                        {props.type == "Lists" ? <div><TextField variant="outlined" label="Description" onChange={(e) => setDesc(e.target.value)} /></div> : null};
                        <Button variant="outlined" onClick={() => addItem()}>Add</Button>
                    </div>
                </Modal>
            </div>}
        </div>
    );
}