import { useState } from "react";
import "../styles/home_page.css";
import { BookRows } from "./book_row";
import { get } from "./fetch_data";
import { Header } from "./header";
import { useEffect } from "react";
import { Loading } from "./loading";
import { useNavigate } from "react-router-dom";

export function HomePage() {

    const [randGenres, setRandGenres] = useState([]);
    const [genres, setGenres] = useState([]);
    const [recs, setRecs] = useState([]);
    const navigate = useNavigate();

    const loadPage = async () => {
        const recommendations = await get(`admin/recs`);
        setRecs(recommendations);
        const loadedRandGenres = await get(`random/genres`);
        setRandGenres(loadedRandGenres);
        const loadedGenres = await get(`genres`);
        setGenres(loadedGenres);
    }

    useEffect(() => {
        loadPage();
    }, []);

    return (
        <>
            {genres == undefined || recs == undefined ? <Loading /> :
                <div className="home-page">
                    <Header />
                    <div className="main-pic">BACKGROUND PICTUREEEEEEEEEEEEEEEEEEEEEEEEEEEE</div>
                    {recs.map((r) => {
                        return (
                            <BookRows item={r} source={"list"} array={false} />
                        );
                    })}
                    {randGenres.map((g) => {
                        return (
                            <BookRows item={g} source={"genre"} array={false} />
                        );
                    })}
                    <div className="genres">
                        <div className="genres-header">All Genres</div>
                        <div className="genres-slide">
                            {genres.map((g) => {
                                return (
                                    <div key={g.id} className="genres-card" onClick={() => navigate(`/more/genre/${g.id}`)}>{g.name}</div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            }
        </>
    );
}