import { Alert, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { deleting, get, post, put } from "./fetch_data";
import { CustomField } from "../customs/custom_textfield";
import { CustomSelect } from "../customs/custom_select";
import { CustomButton } from "../customs/custom_button";
import { Close } from "@mui/icons-material";
import "../styles/edit_book.css";

export function EditBook(props) {

    const [ISBN, setISBN] = useState(props.type ? props.book?.isbn : "");
    const [title, setTitle] = useState(props.type ? props.book?.title : "");
    const [author, setAuthor] = useState(props.type ? props.book?.author : "");
    const [summary, setSummary] = useState(props.type ? props.book?.summary : "");
    const [year, setYear] = useState(props.type ? props.book?.year : 0);
    const [language, setLanguage] = useState(props.type ? props.book?.language : "");
    const [pages, setPages] = useState(props.type ? props.book?.pages : 0);
    const [pdf, setPdf] = useState(props.type ? props.book?.pdf : "");
    const [cover, setCover] = useState(props.type ? props.book?.cover : "");
    const [genres, setGenres] = useState(props.type ? props.bookGenres : []);
    const [alertText, setAlertText] = useState("");
    const [showAlert, setShowAlert] = useState('none');

    const saveBook = async () => {
        let regex = /^\d+$/;
        if (!regex.test(year) || !regex.test(pages)) {
            setAlertText("Enter only number for pages or year.");
            setShowAlert('flex');
        } else {
            if (title.length == 0 || author.length == 0) {
                setAlertText("Fill required fields.");
                setShowAlert('flex');
            } else {
                if (props.type) {
                    const body = { id: props.book.id, ISBN, title, cover, author, summary, year, language, pages, pdf };
                    const edited = await put(`books`, body);
                    const deleted = await deleting(`books/genres/${props.book.id}`);
                    genres.forEach(async (g) => {
                        const genreBody = { genreID: g, bookID: props.book.id }
                        const posted = await post(`genres/book`, genreBody);
                    });
                }
                else {
                    const body = { ISBN, title, cover, author, summary, year, language, pages, pdf };
                    const posted = await post(`books`, body);
                    genres.forEach(async (g) => {
                        const genreBody = { genreID: g.id, bookID: props.book.id };
                        const postedGenre = await post(`genres/book`, genreBody);
                    });
                }
                props.close();
            }
        }
    }

    const saveGenre = (value) => {
        let genreIDs = [];
        value.forEach((v) => genreIDs.push(v.id));
        setGenres(genreIDs);
    }

    return (
        <div className="modal-content">
            <h2>{props.type ? "Edit" : "Add"} book</h2>
            <div className="book-info">
                <div className="info-row">
                    <CustomField label="ISBN" defaultValue={props.book?.isbn} onChange={(e) => setISBN(e.target.value.trim())} />
                    <CustomField label="Title" required defaultValue={props.book?.title} onChange={(e) => setTitle(e.target.value.trim())} />
                    <CustomField label="Author" required defaultValue={props.book?.author} onChange={(e) => setAuthor(e.target.value.trim())} />
                </div>
                <div className="info-row">
                    <CustomField label="Year" defaultValue={props.book?.year} onChange={(e) => setYear(e.target.value)} />
                    <CustomField label="Language" defaultValue={props.book?.language} onChange={(e) => setLanguage(e.target.value.trim())} />
                    <CustomField label="Pages" defaultValue={props.book?.pages} onChange={(e) => setPages(e.target.value)} />
                </div>
                <div className="info-row">
                    <div className="design-row">
                        <div className="info-row">
                            <CustomField label="Cover" defaultValue={props.book?.cover} onChange={(e) => setCover(e.target.value)} />
                            <CustomField label="PDF Path" defaultValue={props.book?.pdf} onChange={(e) => setPdf(e.target.value)} />
                        </div>
                        <CustomSelect
                            multiple options={props.genres} getOptionLabel={(option) => option.label}
                            getOptionKey={(option) => option.id} defaultValue={props.genres.filter((o) => props.bookGenres?.includes(o.id))}
                            onChange={(event, value) => saveGenre(value)} label="Genres" />
                    </div>
                    <CustomField label="Summary" multiline rows={4} defaultValue={props.book?.summary} onChange={(e) => setSummary(e.target.value.trim())} />
                </div>
            </div>
            <CustomButton onClick={() => saveBook()} text="Save" />
            <Alert severity="error" style={{ display: showAlert }}
                action={<Close onClick={() => setShowAlert("none")} />} >{alertText}</Alert>
        </div >
    );
}