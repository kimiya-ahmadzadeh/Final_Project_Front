import { useParams } from "react-router-dom";
import { Header } from "./header";
import { useState } from "react";
import { get } from "./fetch_data";
import { useEffect } from "react";
import { PaginateBooks } from "./paginated_books";
import { Loading } from "./loading";

export function Genre() {

    const { id, name } = useParams();
    const [item, setItem] = useState([]);
    const [books, setBooks] = useState([]);

    const loadPage = async () => {
        let loadedItem = [];
        let loadedBooks = [];
        if (name == "genre") {
            loadedItem = await get(`genres/${id}`);
            loadedBooks = await get(`books/genre/${id}`);
        } else if (name == "list") {
            loadedItem = await get(`users/list/${id}`);
            loadedBooks = await get(`lists/${id}`);
        } else if (name == "author") {
            loadedItem = { name: id };
            loadedBooks = await get(`authors/${id}`);
        }
        console.log(loadedItem);
        setItem(loadedItem);
        setBooks(loadedBooks);
    }

    useEffect(() => {
        loadPage();
    }, []);

    return (
        <>
            <Header />
            {item == undefined || books == undefined ? <Loading /> :
                <div className="genre">
                    <div className="genre-header">
                        <h3>Books related to {item.name}</h3>
                        {name == "list" ? <p>{item.description}</p> : null}
                        <p>Total books: {books.length}</p>
                    </div>
                    <div className="genre-books">
                        <PaginateBooks books={books} visibility={"hidden"} />
                    </div>
                </div>}
        </>
    );
}