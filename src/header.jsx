import '../styles/header.css';
import { Link, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { Navigate } from 'react-router-dom';

export function Header() {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.setItem("userAuth", JSON.stringify(""));
        navigate("/login");
    }


    return (
        <div className="main-header">
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
                <Link to="/admin" /*style={{ visibility: show }}*/ >
                    <div><Button variant="outlined">Admin</Button></div>
                </Link>
                <div><Button variant="outlined" onClick={logout}>Log Out</Button></div>
            </div>
        </div>
    )
}