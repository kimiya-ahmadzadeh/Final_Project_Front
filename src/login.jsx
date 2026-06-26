import { Alert, Button, TextField } from "@mui/material";
import "../styles/login.css";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { post } from "./fetch_data";

export function LoginPage() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showAlert, setShowAlert] = useState("hidden");
    const navigate = useNavigate();

    useEffect(() => {
        const auth = JSON.parse(localStorage.getItem("userAuth"));
        if (auth && auth.id) {
            navigate("/");
        }
    }, []);

    const login = async () => {
        const body = { username, password }
        const response = await post(`login`, body);
        if (!response.error) {
            localStorage.setItem("userAuth", JSON.stringify(response.user));
            navigate("/");
        } else {
            setShowAlert("visible");
        }
    }

    return (
        <div className="login-page">
            <h2>Welcome to Bookworm</h2>
            <h3>Log in to enter a magical place</h3>
            <div className="login-card">
                <TextField type="text" variant="outlined" label="Username" required onChange={(e) => setUsername(e.target.value)} />
                <TextField type="password" variant="outlined" label="Password" required onChange={(e) => setPassword(e.target.value)} />
                <Button variant="outlined" onClick={login}>Login</Button>
            </div>
            <Alert severity="error" style={{ visibility: showAlert }}>Wrong username or password</Alert>
        </div>
    );
}