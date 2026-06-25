import { Link, useNavigate } from "react-router-dom"
import "../styles/book_card.css"
import { DeleteListBook, GetUserID, PostBooks } from "./fetch_data";
import { Button } from "@mui/material";

export function BookCard(props) {

    const userID = GetUserID();

    const handleClick = async (id) => {
        navigate(`/book/${id}`);
        const post = await PostBooks(userID, null, id, "Recent Books");
    }

    const deleteBook = async (listID, bookID) => {
        const deleted = await DeleteListBook(listID, bookID);
        props.changeList(false);
    }

    const navigate = useNavigate();
    return (
        <div className="book-card">
            <div className="card-content" onClick={() => handleClick(props.book.id)}>
                <div className="book-card-cover">COVER</div>
                <div className="book-card-title">{props.book.title}</div>
                <div className="book-card-author">{props.book.author}</div>
            </div>
            <Button style={{ visibility: props.visibility }} onClick={() => deleteBook(props.listID, props.book.id)}>Delete</Button>
        </div>
    );
}