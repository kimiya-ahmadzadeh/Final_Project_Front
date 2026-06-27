import { useState } from "react";
import "../styles/home_page.css";
import { BookRows } from "./book_row";
import { get, GetUserID } from "./fetch_data";
import { Header } from "./header";
import { useEffect } from "react";
import { Loading } from "./loading";

export function HomePage() {

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