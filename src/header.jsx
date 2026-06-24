import '../styles/header.css';
import { Link, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

export function Header(props) {
    const [openModal, setOpenModal] = useState("hidden");
    const navigate = useNavigate();

    const logout = () => {
        localStorage.setItem("userAuth", JSON.stringify(""));
        navigate("/login");
    }

    const closeModal = () => {
        setOpenModal("hidden");
    }

    return (
        <div className="main-header">
            {/* <SearchModal open={openModal} closeModal={closeModal} /> */}
            <div className="header-content">
                <h1>Book Worm</h1>
                <Link to="/" >
                    <div><Button variant="outlined">Home</Button></div>
                </Link>
                <Link to="/search">
                    <div><Button variant="outlined">Search</Button></div>
                </Link>
                <Link to="/library">
                    <div><Button variant="outlined">My Library</Button></div>
                </Link>
                <Link to="/profile">
                    <div><Button variant="outlined">My Profile</Button></div>
                </Link>
                <div><Button variant="outlined" onClick={logout}>Log Out</Button></div>
            </div>
        </div>
    )
}