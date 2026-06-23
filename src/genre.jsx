import { useParams } from "react-router-dom";
import { Header } from "./header";
import { useState } from "react";
import { GetGenre, GetGenreBooks } from "./fetch_data";
import { useEffect } from "react";
import { PaginateBooks } from "./paginated_books";
import { Loading } from "./loading";

export function Genre() {

    const { id } = useParams();
    const [genre, setGenre] = useState([]);
    const [books, setBooks] = useState([]);

    const loadPage = async () => {
        const loadedGenre = await GetGenre(id);
        const loadedBooks = await GetGenreBooks(id);
        setGenre(loadedGenre);
        setBooks(loadedBooks);
    }

    useEffect(() => {
        loadPage();
    }, []);

    return (
        <>
            <Header />
            {genre[0] == undefined || books == undefined ? <Loading /> :
                <div className="genre">
                    <div className="genre-header">
                        <h3>{genre[0].name} Category</h3>
                        <p>Total books: {books.length}</p>
                    </div>
                    <div className="genre-books">
                        <PaginateBooks books={books} />
                    </div>
                </div>}
        </>
    );
}