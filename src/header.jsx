import '../styles/header.css';
import { Link, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { Navigate } from 'react-router-dom';
import { GetAdmin } from './fetch_data';
import { CustomButton } from './custom_button';
import { AccountCircle, AdminPanelSettings, Home, LibraryBooks, LocalLibrary, Logout, Search } from '@mui/icons-material';

export function Header() {

    const navigate = useNavigate();
    const admin = GetAdmin();

    const logout = () => {
        localStorage.setItem("userAuth", JSON.stringify(null));
        navigate("/");
    }

    return (
        <div className="main-header">
            <div className="header-content">
                <h1>Book Worm</h1>
                <Link to="/">
                    <CustomButton variant="outlined" text="Home" startIcon={<Home />} />
                </Link>
                <Link to="/search">
                    <CustomButton variant="outlined" text="Search" startIcon={<Search />} />
                </Link>
                <Link to="/library">
                    <CustomButton variant="outlined" text="My Library" startIcon={<LocalLibrary />} />
                </Link>
                <Link to="/profile">
                    <CustomButton variant="outlined" text="My Profile" startIcon={<AccountCircle />} />
                </Link>
                {admin ? <Link to="/admin">
                    <CustomButton variant="outlined" text="Admin" startIcon={<AdminPanelSettings />} />
                </Link> : null}
                <CustomButton variant="outlined" text="Log Out" startIcon={<Logout />} onClick={logout} />
            </div>
        </div>
    )
}