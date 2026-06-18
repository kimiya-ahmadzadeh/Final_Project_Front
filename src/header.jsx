import '../styles/header.css';
import { Link } from "react-router-dom";
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
                <Link to="/home" >
                    <div><Button variant="outlined">Home</Button></div>
                </Link>
                <div onClick={() => setSearchVisiblity("visible")}><Button variant="outlined">Search</Button></div>
                <Link to="/library">
                    <div><Button variant="outlined">My Library</Button></div>
                </Link>
                <Link to="/profile">
                    <div><Button variant="outlined">My Profile</Button></div>
                </Link>
                <div><Button variant="outlined">Log Out</Button></div>
            </div>
        </div>
    )
}