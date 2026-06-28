import { Button, Modal, Pagination, TextField } from "@mui/material";
import { useState } from "react";
import { deleting, get, GetUserID, put } from "./fetch_data";

export function PaginateArray(props) {

    const [open, setOpen] = useState(false);
    const [editedItem, setEditedItem] = useState({});
    const [page, setPage] = useState(1);
    const perPage = 8;
    const pageCount = Math.ceil(props.items.length / perPage);
    const currentItems = props.items.slice((page - 1) * perPage, ((page - 1) * perPage + perPage));
    const adminID = GetUserID();

    const handlePageClick = (event, value) => {
        setPage(value);
    };

    const deleteCard = async (id, type) => {
        if (type == "Genres") {
            const deleted = await deleting(`genres/${id}`);
        }
        if (type == "Lists") {
            const deleted = await deleting(`admin/lists/${adminID}/${id}`);
        }
        props.changePage();
    }

    const openEdit = async (id, type) => {
        console.log(type);
        const selected = (type == "Genres") ? await get(`genres/${id}`)
            : await get(`users/list/${id}`);
        setEditedItem(selected[0]);
        setOpen(true);
    }

    const editCard = async (id, type) => {
        const body = (type == "Genres") ? { id: editedItem.id, name: editedItem.name } :
            { id: editedItem.id, name: editedItem.name, description: editedItem.description }
        console.log(type);
        const edited = (type == "Genres") ? await put(`genres`, body) :
            await put(`users/lists`, body);
        setOpen(false);
        props.changePage();
    }

    return (
        // <>
        //     {
        //         props.books == undefined ? <Loading /> :
        <div className="list">
            <div className="page">
                {currentItems.map((item) => {
                    return (
                        <div key={item.id}>
                            <div>{item.name}</div>
                            <div>{item.description}</div>
                            <Button onClick={() => openEdit(item.id, props.type)}>Edit</Button>
                            <Button onClick={() => deleteCard(item.id, props.type)}>Delete</Button>
                        </div>
                    );
                })}
            </div>
            <div className="pages-control">
                <Pagination count={pageCount} page={page} onChange={handlePageClick} />
            </div>
            <Modal open={open} onClose={() => setOpen(false)}>
                <div className="edit-modal">
                    <h3>Edit {props.type}</h3>
                    <div className="item-info">
                        <TextField variant="outlined" label="name" defaultValue={editedItem.name}
                            onChange={(e) => setEditedItem({ id: editedItem.id, name: e.target.value, description: editedItem.description })} />
                        {props.type == "Lists" ? <TextField variant="outlined" label="description" defaultValue={editedItem.description}
                            onChange={(e) => setEditedItem({ id: editedItem.id, name: editedItem.name, description: e.target.value })} />
                            : null}
                    </div>
                    <Button variant="outlined" onClick={() => editCard(editedItem.id, props.type)}>Save Changes</Button>
                </div>
            </Modal>
        </div>
        //     }
        // </>
    );
}