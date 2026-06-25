import { Link, useNavigate } from "react-router-dom"
import "../styles/book_card.css"

export function BookCard(props) {

    const navigate = useNavigate();
    return (
        <div className="card-content" onClick={() => navigate(`/book/${props.book.id}`)}>
            <div className="book-card-cover">COVER</div>
            <div className="book-card-title">{props.book.title}</div>
            <div className="book-card-author">{props.book.author}</div>
        </div>
    )
}