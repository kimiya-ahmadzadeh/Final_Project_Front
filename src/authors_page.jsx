import { useParams } from "react-router-dom";
import { Header } from "./header";
import { PaginateBooks } from "./paginated_books";
import { useEffect, useState } from "react";
import { get } from "./fetch_data";

export function AuthorsPage() {

    const { name } = useParams();
    const [authorBooks, setAuthorBooks] = useState([]);
    const [changePage, setChangePage] = useState(0);

    const loadBooks = async () => {
        const books = await get(`authors/${name}`);
        setAuthorBooks(books);
    }

    const handleChange = () => {
        setChangePage(changePage + 1);
    }

    useEffect(() => {
        loadBooks();
    }, [changePage]);

    return (
        <div className="author-page">
            <Header />
            <h3>Books by {name}</h3>
            <p>Total ({authorBooks.length})</p>
            <PaginateBooks books={authorBooks} visibility={"hidden"} changePage={handleChange} />
        </div>
    );
}