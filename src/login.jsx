import { Alert, Button, TextField } from "@mui/material";
import "../styles/login.css";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export function LoginPage() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showAlert, setShowAlert] = useState("hidden");
    const navigate = useNavigate();
    useEffect(() => {
        const auth = localStorage.getItem("userAuth");
        if (auth) {
            navigate("/");
        }
    }, []);

    const verifyLogin = () => {
        if (username == "username" && password == "pass") {
            localStorage.setItem("userAuth", true);
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
                <Button variant="outlined" onClick={verifyLogin}>Login</Button>
            </div>
            <Alert severity="error" style={{ visibility: showAlert }}>Wrong username or password</Alert>
        </div>
    );
}