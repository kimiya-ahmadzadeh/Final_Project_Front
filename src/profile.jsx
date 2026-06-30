import "../styles/profile.css";
import { Button, TextField } from "@mui/material";
import { Header } from "./header";
import { useEffect } from "react";
import { useState } from "react";
import { get, GetUserID, put } from "./fetch_data";
import { Loading } from "./loading";
import { Footer } from "./footer";

export function Profile() {

    const [user, setUser] = useState();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [bio, setBio] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const userID = GetUserID();

    const loadUser = async () => {
        const loadedUser = await get(`users/${userID}`);
        setUser(loadedUser);
        setFirstName(loadedUser.first_name);
        setLastName(loadedUser.last_name);
        setBio(loadedUser.bio);
        setUsername(loadedUser.username);
        setPassword(loadedUser.password);
    }

    const editUser = async () => {
        if (firstName.length > 0 && lastName.length > 0 && username.length > 0 && password.length > 0) {
            const body = { id: userID, first_name: firstName, last_name: lastName, bio, username, password };
            const editedUser = await put(`users`, body);
        }
        else {
            window.alert("Fill the required fields.")
        }
    }

    useEffect(() => {
        loadUser();
    }, []);

    return (
        <>
            {user == undefined ? <Loading /> :
                <div className="profile">
                    <Header />
                    <div className="profile-card">
                        <div className="profile-pic">PICTURE</div>
                        <div className="profile-info">
                            <div className="personal-info">
                                <TextField variant="outlined" label="First Name" defaultValue={firstName} required onChange={(e) => setFirstName(e.target.value)} />
                                <TextField variant="outlined" label="Last Name" defaultValue={lastName} required onChange={(e) => setLastName(e.target.value)} />
                                <TextField variant="outlined" label="Bio" defaultValue={bio} onChange={(e) => setBio(e.target.value)} />
                            </div>
                            <div className="login-info">
                                <TextField variant="outlined" label="User Name" defaultValue={username} required onChange={(e) => setUsername(e.target.value)} />
                                <TextField variant="outlined" label="Password" defaultValue={password} required type="password" onChange={(e) => setPassword(e.target.value)} />
                                <Button variant="outlined" onClick={editUser}>Confirm Changes</Button>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            }
        </>
    );
}