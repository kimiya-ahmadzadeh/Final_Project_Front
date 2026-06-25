import { useNavigate, useParams } from "react-router-dom";
import { Header } from "./header";
import { useState } from "react";
import { GetBook, GetBookGenres, GetLists, GetUserID, PostBooks } from "./fetch_data";
import { useEffect } from "react";
import { Autocomplete, Button, TextField } from "@mui/material";

export function Book() {
    const { id } = useParams();
    const userID = GetUserID();
    const [book, setBook] = useState({});
    const [lists, setLists] = useState([]);
    const [genres, setGenres] = useState([]);
    const [selected, setSelected] = useState("");
    const navigate = useNavigate();

    const loadPage = async () => {
        const loadedBook = await GetBook(id);
        const loadedGenres = await GetBookGenres(id);
        const loadedLists = await GetLists(userID);
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

    const addToDefault = async (listName) => {
        const post = await PostBooks(userID, null, id, listName);
        if (!post) {
            window.alert("can't add twice");
        }
    }

    const postBook = async (listID) => {
        if (selected != "") {
            const inserted = await PostBooks(userID, listID, id, "");
        } else {
            window.alert("choose a list first.")
        }
    }

    useEffect(() => {
        loadPage();
    }, []);

    return (
        <div className="book">
            <Header />
            <div className="book-info">
                <div className="main-info">
                    <div className="book-cover">COVER</div>
                    <div className="top-info">
                        <div className="book-title">{book.title}</div>
                        <div className="book-author">{book.author}</div>
                    </div>
                    <div className="book-btns">
                        <div><Button variant="outlined" onClick={() => addToDefault('Bookmarked Books')}>Bookmark</Button></div>
                        <div><Button variant="outlined" onClick={() => addToDefault('Favorite Books')}>Favorite</Button></div>
                        <div><Autocomplete
                            disablePortal
                            options={lists}
                            getOptionLabel={(option) => option.label}
                            getOptionKey={(option) => option.id}
                            onChange={(event, value) => setSelected(value.id)}
                            renderInput={(params) => <TextField {...params} label="Add to list" />}
                        />
                            <Button onClick={() => postBook(selected)} variant="outlined">Add</Button>
                        </div>
                    </div>
                    <div className="side-info">
                        <div className="summary">{book.summary}</div>
                        <div className="genres-list">
                            {genres.map((g) => {
                                return (
                                    <div key={g.id} className="genre-chip" onClick={() => navigate(`/genres/${g.id}`)}>{g.name}</div>
                                );
                            })}
                        </div>
                        <div className="info-row">
                            <div className="row-title">Year</div>
                            <div className="row-value">{book.year}</div>
                        </div>
                        <div className="info-row">
                            <div className="row-title">Langauge</div>
                            <div className="row-value">{book.language}</div>
                        </div>
                        <div className="info-row">
                            <div className="row-title">Pages</div>
                            <div className="row-value">{book.pages}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}