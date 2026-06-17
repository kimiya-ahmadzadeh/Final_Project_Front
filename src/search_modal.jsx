import { Button, TextField } from '@mui/material';
import '../styles/search_modal.css';
import { FilterModal } from './filter_modal';


export function SearchModal(props) {

    const previews = [{ title: "Book1", author: "Author1" },
    { title: "Book2", author: "Author2" },
    { title: "Book3", author: "Author3" }]

    return (
        <div className="search-modal" style={{ visibility: props.visibility }}>
            <div className='modal-content'>
                <div className='modal-header'>
                    <div className='search-input'><TextField id="search-input" label="Search book title..." variant="outlined" /></div>
                </div>
                <FilterModal />
                <div className='search-btn'><Button variant='outlined'>Search</Button></div>
            </div>
        </div>
    )
}