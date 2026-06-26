import { useState } from "react";
import "../styles/home_page.css";
import { BookRows } from "./book_row";
import { get, GetUserID } from "./fetch_data";
import { Header } from "./header";
import { useEffect } from "react";
import { Loading } from "./loading";

export function HomePage() {
    const books = [{ title: "Book1", author: "Author1" }, { title: "Book2", author: "Author2" },
    { title: "Book3", author: "Author3" }, { title: "Book4", author: "Author4" },
    { title: "Book5", author: "Author5" }, { title: "Book6", author: "Author6" },
    { title: "Book7", author: "Author7" }, { title: "Book8", author: "Author8" },
    { title: "Book9", author: "Author9" }, { title: "Book10", author: "Author10" },
    { title: "Book11", author: "Author11" }, { title: "Book12", author: "Author12" }];
    const [genres, setGenres] = useState([]);

    const loadGenres = async () => {
        const loadedGenres = await get(`genres`);
        setGenres(loadedGenres);
    }

    useEffect(() => {
        loadGenres();
    }, []);

    const userID = GetUserID();
    return (
        <>
            {genres == undefined ? <Loading /> :
                <div className="home-page">
                    <Header userID={userID} />
                    {genres.map((g) => {
                        return (
                            <BookRows genre={g} visibility={"hidden"} />
                        );
                    })};
                </div>
            }
        </>
    );
}