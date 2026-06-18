import "../styles/book_card.css"

export function BookCard(props) {
    return (
        <div className="book-card">
            <div className="book-card-cover">COVER</div>
            <div className="book-card-title">{props.book.title}</div>
            <div className="book-card-author">{props.book.author}</div>
        </div>
    )
}