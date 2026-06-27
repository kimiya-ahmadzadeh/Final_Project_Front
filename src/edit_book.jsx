import { Button, Modal, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { get, put } from "./fetch_data";
import "../styles/edit_book.css";

export function EditBook(props) {

    const [ISBN, setISBN] = useState(props.book.id);
    const [title, setTitle] = useState(props.book.title);
    const [author, setAuthor] = useState(props.book.author);
    const [summary, setSummary] = useState(props.book.summary);
    const [year, setYear] = useState(props.book.year);
    const [language, setLanguage] = useState(props.book.language);
    const [pages, setPages] = useState(props.book.pages);
    const [pdf, setPdf] = useState(props.book.pdf);

    const editBook = async () => {
        const body = { id: ISBN, title, author, summary, year, language, pages, pdf };
        const edited = await put(`books/${props.book.id}`, body);
        props.close();
    }

    return (
        <div className="edit-book">
            <h2>Edit book</h2>
            <div className="book-info">
                <TextField label="ISBN" variant="outlined" defaultValue={props.book.id} onChange={(e) => setISBN(e.target.value)} />
                <TextField label="Title" variant="outlined" defaultValue={props.book.title} onChange={(e) => setTitle(e.target.value)} />
                <TextField label="Author" variant="outlined" defaultValue={props.book.author} onChange={(e) => setAuthor(e.target.value)} />
                <TextField label="Summary" variant="outlined" defaultValue={props.book.summary} onChange={(e) => setSummary(e.target.value)} />
                <TextField label="Year" variant="outlined" defaultValue={props.book.year} onChange={(e) => setYear(e.target.value)} />
                <TextField label="Language" variant="outlined" defaultValue={props.book.language} onChange={(e) => setLanguage(e.target.value)} />
                <TextField label="Pages" variant="outlined" defaultValue={props.book.pages} onChange={(e) => setPages(e.target.value)} />
                <TextField label="PDF Path" variant="outlined" defaultValue={props.book.pdf} onChange={(e) => setPdf(e.target.value)} />
            </div>
            <Button variant="outlined" onClick={() => editBook()}>Save Changes</Button>
        </div>
    );
}