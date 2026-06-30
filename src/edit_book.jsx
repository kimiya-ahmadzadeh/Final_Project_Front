import { Autocomplete, Button, Modal, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { deleting, get, post, put } from "./fetch_data";
import "../styles/edit_book.css";

export function EditBook(props) {

    const [ISBN, setISBN] = useState(props.type ? props.book.id : "");
    const [title, setTitle] = useState(props.type ? props.book.title : "");
    const [author, setAuthor] = useState(props.type ? props.book.author : "");
    const [summary, setSummary] = useState(props.type ? props.book.summary : "");
    const [year, setYear] = useState(props.type ? props.book.year : 0);
    const [language, setLanguage] = useState(props.type ? props.book.language : "");
    const [pages, setPages] = useState(props.type ? props.book.pages : 0);
    const [pdf, setPdf] = useState(props.type ? props.book.pdf : "");
    const [genres, setGenres] = useState(props.type ? props.bookGenres : []);

    const saveBook = async () => {
        let regex = /^\d+$/;
        if (!regex.test(year) || !regex.test(pages)) {
            window.alert("Enter number.");
        } else {
            if (props.type) {
                const body = { id: ISBN, title, author, summary, year, language, pages, pdf };
                const edited = await put(`books/${props.book.id}`, body);
                const deleted = await deleting(`books/genres/${props.book.id}`);
                genres.forEach(async (g) => {
                    const genreBody = { genreID: g, bookID: props.book.id }
                    const posted = await post(`genres/book`, genreBody);
                });
            }
            else {
                const body = { id: ISBN, title, author, summary, year, language, pages, pdf };
                const posted = await post(`books`, body);
                genres.forEach(async (g) => {
                    const genreBody = { genreID: g.id, bookID: ISBN };
                    const postedGenre = await post(`genres/book`, genreBody);
                });
            }
            props.close();
        }
    }

    const saveGenre = (value) => {
        let genreIDs = [];
        value.forEach((v) => genreIDs.push(v.id));
        setGenres(genreIDs);
    }

    return (
        <div className="edit-book">
            <h2>{props.type} book</h2>
            <div className="book-info">
                <TextField label="ISBN" variant="outlined" defaultValue={props.book?.id} onChange={(e) => setISBN(e.target.value)} />
                <TextField label="Title" variant="outlined" defaultValue={props.book?.title} onChange={(e) => setTitle(e.target.value)} />
                <TextField label="Author" variant="outlined" defaultValue={props.book?.author} onChange={(e) => setAuthor(e.target.value)} />
                <TextField label="Year" variant="outlined" defaultValue={props.book?.year} onChange={(e) => setYear(e.target.value)} />
                <TextField label="Language" variant="outlined" defaultValue={props.book?.language} onChange={(e) => setLanguage(e.target.value)} />
                <TextField label="Pages" variant="outlined" defaultValue={props.book?.pages} onChange={(e) => setPages(e.target.value)} />
                <Autocomplete
                    multiple
                    limitTags={3}
                    options={props.genres}
                    getOptionLabel={(option) => option.label}
                    getOptionKey={(option) => option.id}
                    defaultValue={props.genres.filter((o) => props.bookGenres?.includes(o.id))}
                    onChange={(event, value) => saveGenre(value)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            label="Genres"
                        />
                    )}
                >
                </Autocomplete>
                <TextField label="PDF Path" variant="outlined" defaultValue={props.book?.pdf} onChange={(e) => setPdf(e.target.value)} />
                <TextField label="Summary" variant="outlined" defaultValue={props.book?.summary} onChange={(e) => setSummary(e.target.value)} />
            </div>
            <Button variant="outlined" onClick={() => saveBook()}>Save</Button>
        </div >
    );
}