import { useNavigate, useParams } from "react-router-dom";
import { Header } from "./header";
import { useState, useEffect } from "react";
import { get, GetUserID, post } from "./fetch_data";
import { Chip } from "@mui/material";
import { Comments } from "./comments";
import { Footer } from "./footer";
import { CustomButton } from "../customs/custom_button";
import { Bookmark, Favorite, MonitorHeart } from "@mui/icons-material";
import { CustomSelect } from "../customs/custom_select";
import "../styles/book.css";

export function Book() {
    const { id } = useParams();
    const userID = GetUserID();
    const [book, setBook] = useState({});
    const [lists, setLists] = useState([]);
    const [genres, setGenres] = useState([]);
    const [selected, setSelected] = useState("");
    const navigate = useNavigate();

    const loadPage = async () => {
        const loadedBook = await get(`books/${id}`);
        const loadedGenres = await get(`book/genres/${id}`);
        const loadedLists = await get(`users/lists/${userID}`);
        let listOpt = [];
        loadedLists?.forEach((l) => {
            if (l.created) {
                listOpt.push({ label: l.name, id: l.id });
            }
        });
        setBook(loadedBook);
        setGenres(loadedGenres);
        setLists(listOpt);
    }

    const handleClick = async () => {
        navigate(`/book/read/${id}`);
        const body = { bookID: id, listID: null, listName: "Recent Books", userID };
        const postBook = await post(`lists`, body);
    }

    const addToDefault = async (listName) => {
        const body = { bookID: id, listID: null, listName, userID };
        const posted = await post(`lists`, body);
    }

    const postBook = async () => {
        if (selected != null) {
            const body = { bookID: id, listID: selected.id, listName: "", userID };
            const inserted = await post(`lists`, body);
        }
    }

    const showAuthor = async (author) => {
        navigate(`/more/author/${author}`);
    }

    useEffect(() => {
        loadPage();
    }, []);

    return (
        <div className="book">
            <Header />
            <div className="information">
                <div className="main-info">
                    <img src={book?.cover} className="book-cover"></img>
                    <div className="book-main">
                        <div className="primary">{book?.title}</div>
                        <div className="info-card-row" onClick={() => showAuthor(book?.author)}>
                            <div className="secondary-book">Author: </div>
                            <div className="book-author">{book?.author}</div>
                        </div>
                        <div className="info-card-row">
                            <div className="secondary-book">Year: </div>
                            <div>{book?.year}</div>
                        </div>
                        <div className="info-card-row">
                            <div className="secondary-book">Language: </div>
                            <div>{book?.language}</div>
                        </div>
                        <div className="info-card-row">
                            <div className="secondary-book">Pages: </div>
                            <div>{book?.pages}</div>
                        </div>
                        <div className="info-card-row">
                            <div className="secondary-book">ISBN: </div>
                            <div>{book?.isbn}</div>
                        </div>
                    </div>
                    <div className="book-btns">
                        <div className="btns-row">
                            <CustomSelect options={lists} getOptionLabel={(option) => option.label} getOptionKey={(option) => option.id}
                                onChange={(event, value) => setSelected(value)} label="Add to list" />
                            <CustomButton onClick={() => postBook(selected)} text="Add" />
                        </div>
                        <div className="btns-row">
                            <CustomButton onClick={() => addToDefault('Bookmarked Books')} text="Bookmark" startIcon={<Bookmark />} />
                            <CustomButton variant="outlined" onClick={() => addToDefault('Favorite Books')} text="Favorite" startIcon={<Favorite />} />
                        </div>
                        <CustomButton onClick={() => handleClick()} text="Read" />
                    </div>
                </div>

                <div className="summary">
                    <div className="primary">About {book?.title}:</div>
                    <div>{book?.summary}</div>
                </div>
                <div className="genres-list">
                    <div className="primary">Genres:</div>
                    {genres?.map((g) => {
                        return (
                            <Chip key={g.id} label={g.name} sx={{ margin: '10px' }} className="genres-card" onClick={() => navigate(`/more/genre/${g.id}`)} />
                        );
                    })}
                </div>
                <Comments bookID={id} />
            </div>
            <Footer />
        </div>
    );
}