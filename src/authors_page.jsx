import { useParams } from "react-router-dom";
import { Header } from "./header";
import { PaginateBooks } from "./paginated_books";
import { useEffect, useState } from "react";
import { get } from "./fetch_data";

export function AuthorsPage() {

    const { name } = useParams();
    const [authorBooks, setAuthorBooks] = useState([]);

    const loadBooks = async () => {
        const books = await get(`authors/${name}`);
        setAuthorBooks(books);
    }

    useEffect(() => {
        loadBooks();
    }, []);

    return (
        <div className="author-page">
            <Header />
            <h3>Books by {name}</h3>
            <p>Total ({authorBooks.length})</p>
            <PaginateBooks books={authorBooks} visibility={"hidden"} />
        </div>
    );
}