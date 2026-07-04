import { Autocomplete, Button, Modal, Pagination, TextField } from "@mui/material";
import { useState } from "react";
import { deleting, get, GetUserID, post, put } from "./fetch_data";
import { CustomIcon } from "./custom_icon";
import { CustomField } from "./custom_textfield";
import { CustomSelect } from "./custom_select";
import { CustomButton } from "./custom_button";

export function PaginateArray(props) {

    const [open, setOpen] = useState(false);
    const [editedItem, setEditedItem] = useState({});
    const [selectedBooks, setSelectedBooks] = useState([]);
    const [page, setPage] = useState(1);
    const pageCount = Math.ceil(props.items.length / props.perPage);
    const currentItems = props.items.slice((page - 1) * props.perPage, ((page - 1) * props.perPage + props.perPage));
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
        const selected = (type == "Genres") ? await get(`genres/${id}`)
            : await get(`admin/lists/${id}`);
        setEditedItem(selected);
        const books = (type == "Genres") ? await get(`books/genre/${id}`) :
            await get(`lists/${id}`);
        let booksOpt = [];
        books.forEach((b) => {
            booksOpt.push(b.id);
        });
        setSelectedBooks(booksOpt);
        setOpen(true);
    }

    const editCard = async (id, type) => {
        const body = (type == "Genres") ? { id: editedItem.id, name: editedItem.name } :
            { id: editedItem.id, name: editedItem.name, description: editedItem.description }
        const edited = (type == "Genres") ? await put(`genres`, body) :
            await put(`users/lists`, body);
        (type == "Genres") ? await deleting(`genre/${id}`) :
            await deleting(`list/${id}`);
        selectedBooks.forEach(async (b) => {
            (type == "Genres") ?
                await post(`genres/book`, { genreID: id, bookID: b }) :
                await post(`lists`, { bookID: b, listID: id, listName: "", userID: adminID });
        });
        setOpen(false);
        props.changePage();
    }

    const select = (value) => {
        const bookIDs = [];
        value.forEach((v) => { bookIDs.push(v.id) });
        setSelectedBooks(bookIDs);
    }

    return (
        // <>
        //     {
        //         props.items == undefined ? <Loading /> :
        <div className="list">
            <div className="page">
                {currentItems.map((item) => {
                    return (
                        <div key={item.id} className="item-card">
                            <div className="item-info">
                                <div className="primary">{item.name}</div>
                                <div className="secondary">{item.description}</div>
                            </div>
                            <div className="card-btns">
                                <CustomIcon type="edit" onClick={() => openEdit(item.id, props.type)} />
                                <CustomIcon type="del" onClick={() => deleteCard(item.id, props.type)} />
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="pages-control">
                <Pagination count={pageCount} page={page} onChange={handlePageClick} />
            </div>
            <Modal open={open} onClose={() => setOpen(false)} className="modal">
                <div className="modal-content">
                    <h3>Edit {props.type}</h3>
                    <div className="edit-info">
                        <CustomField label="Name" defaultValue={editedItem.name} required
                            onChange={(e) => setEditedItem({ id: editedItem.id, name: e.target.value, description: editedItem.description })} />
                        {props.type == "Lists" ? <CustomField label="Description" defaultValue={editedItem.description}
                            onChange={(e) => setEditedItem({ id: editedItem.id, name: editedItem.name, description: e.target.value })} />
                            : null}
                        <CustomSelect
                            multiple options={props.books} getOptionLabel={(option) => option.label}
                            getOptionKey={(option) => option.id} defaultValue={props.books.filter((b) => selectedBooks.includes(b.id))}
                            onChange={(event, value) => select(value)} label="Books" />
                    </div>
                    <CustomButton onClick={() => editCard(editedItem.id, props.type)} text="Save Changes" />
                </div>
            </Modal>
        </div>
        //     }
        // </>
    );
}