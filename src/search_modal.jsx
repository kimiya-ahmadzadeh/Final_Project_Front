import { Button, Modal, TextField } from '@mui/material';
import '../styles/search_modal.css';
import { FilterModal } from './filter_modal';
import { useState } from 'react';


export function SearchModal(props) {

    const previews = [{ title: "Book1", author: "Author1" },
    { title: "Book2", author: "Author2" },
    { title: "Book3", author: "Author3" }]

    const closeModal = () => {
        props.closeModal();
    };

    return (
        <div className="search-modal" style={{ visibility: props.open }}>
            <div className='modal-card'>
                <Modal open={props.open == "visible" ? true : false} onClose={closeModal} className='modal-card'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <div className='search-input'><TextField id="search-input" label="Search book title..." variant="outlined" /></div>
                        </div>
                        <FilterModal />
                        <div className='search-btn'><Button variant='outlined'>Search</Button></div>
                    </div>
                </Modal>
            </div>
        </div>
    )
}
