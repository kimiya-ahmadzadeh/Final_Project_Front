import { Button, Modal, TextField, Autocomplete, InputLabel, Select, } from '@mui/material';
import '../styles/search_books.css';
import { get } from "./fetch_data";
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loading } from './loading';
import { Header } from './header';
import { PaginateBooks } from './paginated_books';
import { Footer } from './footer';
import { CustomButton } from './custom_button';
import { Search } from '@mui/icons-material';
import { CustomSelect } from './custom_select';
import { CustomField } from './custom_textfield';


export function SearchBooks() {

    const navigate = useNavigate();

    const pagesOpt = ["pages <= 100", "100 < pages <= 300", "300 < pages <= 500", "pages > 500"];
    const [genresOpt, setGenresOpt] = useState([]);
    const [langOpt, setLangOpt] = useState([]);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [genres, setGenres] = useState([]);
    const [langs, setLangs] = useState([]);
    const [pages, setPages] = useState("");
    const [fromYear, setFromYear] = useState(0);
    const [toYear, setToYear] = useState(3000);
    const [books, setBooks] = useState([]);

    const loadOptions = async () => {
        const genreObj = await get(`genres`);
        let genres = [];
        genreObj.forEach(g => {
            genres.push({ label: g.name, id: g.id });
        });
        const langObj = await get(`languages`);
        let langs = [];
        langObj.forEach(g => {
            langs.push({ label: g.language });
        });
        setGenresOpt(genres);
        setLangOpt(langs);
    }

    useEffect(() => {
        loadOptions();
    }, [books]);

    const searchBook = async () => {
        const books = await get(`books`);
        setBooks(books);
        let newBooks = books;
        newBooks = books.filter((b) => b.title.toLowerCase().includes(title.toLowerCase())
            && b.author.toLowerCase().includes(author.toLowerCase())
            && b.year >= fromYear && b.year <= toYear);
        if (langs.length > 0) {
            let filterLang = [];
            newBooks.forEach((b) => {
                langs.forEach((l) => {
                    if (b.language.includes(l.label)) {
                        filterLang.push(b);
                    }
                });
            });
            newBooks = filterLang;
        }
        if (pages === "pages <= 100") {
            newBooks = newBooks.filter((b) => b.pages <= 100);
        }
        if (pages === "100 < pages <= 300") {
            newBooks = newBooks.filter((b) => b.pages > 100 && b.pages <= 300);
        }
        if (pages === "300 < pages <= 500") {
            newBooks = newBooks.filter((b) => b.pages > 300 && b.pages <= 500);
        }
        if (pages === "pages > 500") {
            newBooks = newBooks.filter((b) => b.pages > 500);
        }
        if (genres.length > 0) {
            let filteredBooks = [];
            genres.forEach((g) => {
                newBooks.forEach(async (b) => {
                    const validate = await get(`genres/${g.id}/${b.id}`);
                    if (validate) {
                        filteredBooks.push(b);
                    }
                });
            });
            newBooks = filteredBooks;
        }
        setBooks(newBooks);
    }


    return (
        <div className="search-books">
            <Header />
            <div className='search-header'>
                <div className='filter-input'>
                    <div className='filter-row'>
                        <CustomField label="Title" onChange={(e) => setTitle(e.target.value)} />
                        <CustomField label="Author" onChange={(e) => setAuthor(e.target.value)} />
                        <CustomField label="From year" onChange={(e) => setFromYear(e.target.value)} />
                        <CustomField label="To year" onChange={(e) => setToYear(e.target.value)} />
                    </div>
                    <div className='filter-row'>
                        <CustomSelect multiple options={genresOpt} getOptionLabel={(option) => option.label}
                            getOptionKey={(option) => option.id} onChange={(event, value) => setGenres(value)} label="Genre" />
                        <CustomSelect multiple options={langOpt} getOptionLabel={(option) => option.label}
                            onChange={(event, value) => setLangs(value)} label="Language" />
                        <CustomSelect options={pagesOpt} onChange={(event, value) => setPages(value)} label="Pages" />
                    </div>
                </div>
                <CustomButton onClick={() => searchBook()} text="Find" endIcon={<Search />} />
            </div>
            <div className='search-results'>
                <PaginateBooks books={books} perPage={9} />
            </div>
            <Footer />
        </div>
    )
}
