import { Link, useNavigate } from "react-router-dom"
import "../styles/book_card.css"
import { deleting, get, GetUserID, post } from "./fetch_data";
import { Button, Menu, MenuItem, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { EditBook } from "./edit_book";

export function BookCard(props) {

    const userID = GetUserID();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [edit, setEdit] = useState(false);
    const [book, setBook] = useState({});
    const [changed, setChanged] = useState(0);

    const handleClick = async (id) => {
        navigate(`/book/${id}`);
        const body = { bookID: id, listID: null, listName: "Recent Books", userID };
        const postBook = await post(`lists`, body);
    }

    const deleteBookFromList = async (listID, bookID) => {
        const deleted = await deleting(`lists/${listID}/${bookID}`);
        props.changePage(false);
    }

    const deleteBook = async (bookID) => {
        const deleted = await deleting(`books/${bookID}`);
    }

    const handleRightClick = (e) => {
        e.preventDefault();
        setAnchorEl(e.currentTarget);
    }

    const editBook = async (bookID) => {
        const loaded = await get(`books/${bookID}`);
        setBook(loaded);
        setEdit(true);
    }

    const closeEdit = () => {
        setEdit(false);
        setChanged(changed + 1);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const navigate = useNavigate();
    return (
        <div className="book-card">
            <div className="card-content" onClick={() => handleClick(props.book.id)} onContextMenu={(e) => handleRightClick(e)}>
                <div className="book-card-cover">COVER</div>
                <div className="book-card-title">{props.book.title}</div>
                <div className="book-card-author">{props.book.author}</div>
            </div>
            <Button style={{ visibility: props.visibility }} onClick={() => deleteBookFromList(props.listID, props.book.id)}>Delete</Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}>
                <MenuItem onClick={() => handleClick(props.book.id)}>View</MenuItem>
                <MenuItem onClick={() => editBook(props.book.id)}>Edit</MenuItem>
                <MenuItem onClick={() => deleteBook(props.book.id)}>Delete</MenuItem>
            </Menu>
            <Modal open={edit} onClose={() => setEdit(false)}>
                <EditBook book={book} close={closeEdit} />
            </Modal>
        </div>
    );
}