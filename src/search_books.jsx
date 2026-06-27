import { Button, Modal, TextField, Autocomplete, InputLabel, Select, } from '@mui/material';
import '../styles/search_modal.css';
import { get } from "./fetch_data";
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loading } from './loading';
import { Header } from './header';
import { PaginateBooks } from './paginated_books';


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
        const books = await get(`books`);
        setBooks(books);
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

    const handleChange = () => {
        setChangePage(changePage + 1);
    }

    useEffect(() => {
        loadOptions();
    }, []);

    const searchBook = async () => {
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
            <div className='filter-input'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <div className='search-input'><TextField id="search-input" label="Search book title..." variant="outlined" onChange={(e) => setTitle(e.target.value)} /></div>
                    </div>
                    <div className='search-filters'>
                        <div className='filter-rows'>
                            <div className='filter-item'>
                                <TextField id="author-input" label="Author" variant='outlined' onChange={(e) => setAuthor(e.target.value)} />
                            </div>
                            <div className='filter-item'>
                                <Autocomplete
                                    multiple
                                    disablePortal
                                    limitTags={3}
                                    options={genresOpt}
                                    getOptionLabel={(option) => option.label}
                                    getOptionKey={(option) => option.id}
                                    onChange={(event, value) => setGenres(value)}
                                    renderInput={(params) => <TextField {...params} label="Genre" />}
                                />
                            </div>
                        </div>
                        <div className='filter-rows'>
                            <div className='filter-item'>
                                <Autocomplete
                                    multiple
                                    disablePortal
                                    limitTags={3}
                                    options={langOpt}
                                    getOptionLabel={(option) => option.label}
                                    onChange={(event, value) => setLangs(value)}
                                    renderInput={(params) => <TextField {...params} label="Language" />}
                                />
                            </div>
                            <div className='filter-item'>
                                <Autocomplete
                                    disablePortal
                                    options={pagesOpt}
                                    onChange={(event, value) => setPages(value)}
                                    renderInput={(params) => <TextField {...params} label="Pages" />}
                                />
                            </div>
                        </div>
                        <div className='filter-rows'>
                            <div className='filter-item'>
                                <TextField id="from-year" label="From year" variant='outlined' onChange={(e) => setFromYear(e.target.value)} />
                            </div>
                            <div className='filter-item'>
                                <TextField id="to-year" label="To year" variant='outlined' onChange={(e) => setToYear(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className='search-btn'><Button variant='outlined' onClick={() => searchBook()}>Search</Button></div>
                </div>
            </div>
            <div className='search-results'>
                <PaginateBooks books={books} visibility={"hidden"} />
            </div>
        </div>
    )
}
