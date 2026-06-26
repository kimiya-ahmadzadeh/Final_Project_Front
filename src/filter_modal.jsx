import { Autocomplete, InputLabel, Select, TextField } from "@mui/material";
import { get } from "./fetch_data";
import { useEffect, useState } from "react";


export function FilterModal() {

    const pagesOpt = ["pages < 100", "100 < pages < 300", "300 < pages < 500 ", "pages > 500"];
    const [genresOpt, setGenresOpt] = useState([]);
    const [langOpt, setLangOpt] = useState([]);

    const loadOptions = async () => {
        const genreObj = await get(`genres`);
        let genres = [];
        genreObj.forEach(g => {
            genres.push({ lable: g.name, id: g.id });
        });
        const langObj = await get(`languages`);
        let langs = [];
        langObj.forEach(g => {
            langs.push({ lable: g.language });
        });
        setGenresOpt(genres);
        setLangOpt(langs);
    }
    useEffect(() => {
        loadOptions();
    }, []);

    return (
        <div className='search-filters'>
            <div className='filter-rows'>
                <div className='filter-item'>
                    <TextField id="author-input" label="Author" variant='outlined' />
                </div>
                <div className='filter-item'>
                    <Autocomplete
                        multiple
                        disablePortal
                        options={genresOpt}
                        getOptionLabel={(option) => option.lable}
                        getOptionKey={(option) => option.id}
                        renderInput={(params) => <TextField {...params} label="Genre" />}
                    />
                </div>
            </div>
            <div className='filter-rows'>
                <div className='filter-item'>
                    <Autocomplete
                        multiple
                        disablePortal
                        options={langOpt}
                        getOptionLabel={(option) => option.lable}
                        renderInput={(params) => <TextField {...params} label="Language" />}
                    />
                </div>
                <div className='filter-item'>
                    <Autocomplete
                        disablePortal
                        options={pagesOpt}
                        renderInput={(params) => <TextField {...params} label="Pages" />}
                    />
                </div>
            </div>
            <div className='filter-rows'>
                <div className='filter-item'>
                    <TextField id="from-year" label="From year" variant='outlined' />
                </div>
                <div className='filter-item'>
                    <TextField id="to-year" label="To year" variant='outlined' />
                </div>
            </div>
        </div>
    );
}