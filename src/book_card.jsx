import { Link, useNavigate } from "react-router-dom";
import { deleting, get, GetUserID, post } from "./fetch_data";
import { Menu, MenuItem, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { EditBook } from "./edit_book";
import { CustomIcon } from "../customs/custom_icon";
import "../styles/book_card.css";

export function BookCard(props) {

    const userID = GetUserID();
    const [edit, setEdit] = useState(false);
    const [book, setBook] = useState({});
    const [bookGenres, setBookGenres] = useState([]);
    const [genres, setGenres] = useState([]);

    const deleteBookFromList = async (listID, bookID) => {
        const deleted = await deleting(`lists/${listID}/${bookID}`);
        props.changePage(false);
    }

    const deleteBook = async (bookID) => {
        const deleted = await deleting(`books/${bookID}`);
        props.changePage();
    }

    const editBook = async (bookID) => {
        const loaded = await get(`books/${bookID}`);
        const bookGenres = await get(`book/genres/${bookID}`);
        const allGenres = await get(`genres`);
        setBook(loaded);
        let genreIDs = [];
        bookGenres.forEach((g) => genreIDs.push(g.id));
        setBookGenres(genreIDs);
        let genresOpt = [];
        allGenres.forEach((g) => {
            genresOpt.push({ id: g.id, label: g.name });
        });
        setGenres(genresOpt);
        setEdit(true);
    }

    const closeEdit = () => {
        setEdit(false);
        props.changePage();
    }

    const navigate = useNavigate();
    return (
        <div className="book-card">
            <div className="card-content" onClick={() => navigate(`/book/${props.book.id}`)} onContextMenu={(e) => handleRightClick(e)}>
                <img className="book-card-cover" src={props.book.cover}></img>
                <div className="book-card-primary">
                    <div className="book-card-title">{props.book.title}</div>
                    <div className="book-card-author">{props.book.author}</div>
                </div>
            </div>
            <div className="card-btns">
                {props.source == "lib" ? <CustomIcon type="del" onClick={() => deleteBookFromList(props.listID, props.book.id)} /> : null}
                {props.source == "admin" ? <CustomIcon type="edit" onClick={() => editBook(props.book.id)} /> : null}
                {props.source == "admin" ? <CustomIcon type="del" onClick={() => deleteBook(props.book.id)} /> : null}
            </div>
            <Modal open={edit} onClose={() => setEdit(false)} className="modal">
                <EditBook book={book} bookGenres={bookGenres} genres={genres} type={true} close={() => closeEdit()} />
            </Modal>
        </div>
    );
}