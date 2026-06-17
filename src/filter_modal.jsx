import { Autocomplete, TextField } from "@mui/material";


export function FilterModal() {

    const cat = ["dfv", "gbdfb", "gdgb", "bdf"]
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
                        options={cat}
                        renderInput={(params) => <TextField {...params} label="Genre" />}
                    />
                </div>
            </div>
            <div className='filter-rows'>
                <div className='filter-item'>
                    <Autocomplete
                        multiple
                        disablePortal
                        options={cat}
                        renderInput={(params) => <TextField {...params} label="Language" />}
                    />
                </div>
                <div className='filter-item'>
                    <Autocomplete
                        multiple
                        disablePortal
                        options={cat}
                        renderInput={(params) => <TextField {...params} label="Country" />}
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