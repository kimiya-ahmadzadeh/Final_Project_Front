import '../styles/header.css';
import Button from '@mui/material/Button';
import { SearchModal } from './search_modal';
import { useState } from 'react';

export function Header() {
    const [searchVisibility, setSearchVisiblity] = useState("hidden");

    return (
        <div className="main-header">
            <SearchModal visibility={searchVisibility} />
            <div className="header-content">
                <h1>Book Worm</h1>
                <div><Button variant="outlined">Home</Button></div>
                <div onClick={() => setSearchVisiblity("visible")}><Button variant="outlined">Search</Button></div>
                <div><Button variant="outlined">My Library</Button></div>
                <div><Button variant="outlined">My Profile</Button></div>
                <div><Button variant="outlined">Log Out</Button></div>
            </div>
        </div>
    )
}