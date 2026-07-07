import { useState } from "react";
import { BookRows } from "./book_row";
import { get } from "./fetch_data";
import { Header } from "./header";
import { useEffect } from "react";
import { Loading } from "./loading";
import { useNavigate } from "react-router-dom";
import { Footer } from "./footer";
import { Chip } from "@mui/material";
import "../styles/home_page.css";

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
            {randGenres == undefined || recs == undefined ? <Loading /> :
                <div className="home-page">
                    <Header />
                    <div className="main-pic">
                        <div className="welcome">Welcome to Bookworm</div>
                        <img src="/assets/covers/library4.jpg"></img>
                    </div>
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
                    <div className="genre-row">
                        <div className="row-name">All Genres</div>
                        <div className="genre-scroll">
                            {genres.map((g) => {
                                return (
                                    <Chip key={g.id} label={g.name} sx={{ margin: '15px' }} className="genres-card" onClick={() => navigate(`/more/genre/${g.id}`)} />
                                );
                            })}
                        </div>
                    </div>
                    <Footer />
                </div>
            }
        </>
    );
}