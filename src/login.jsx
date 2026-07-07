import { Alert, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { get, post } from "./fetch_data";
import { CustomField } from "../customs/custom_textfield";
import { CustomButton } from "../customs/custom_button";
import { Close } from "@mui/icons-material";
import { sha256 } from "js-sha256";
import "../styles/login.css";


export function LoginPage() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showAlert, setShowAlert] = useState("none");
    const [modalAlert, setModalAlert] = useState("none");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [open, setOpen] = useState(false);
    const [alertText, setAlertText] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const auth = JSON.parse(localStorage.getItem("userAuth"));
        if (auth && auth.id) {
            navigate("/home");
        }
    }, []);

    const login = async () => {
        const hash = sha256(password);
        const body = { username, password: hash }
        const response = await post(`login`, body);
        if (!response.error) {
            localStorage.setItem("userAuth", JSON.stringify(response.user));
            navigate("/home");
            setUsername(" ");
            setPassword(" ");
        } else {
            setShowAlert("flex");
        }
    }

    const signUp = async () => {
        if (username.length == 0 || password.length == 0) {
            setAlertText("Fill the required fields.");
            setModalAlert('flex');
        }
        else {
            const checkname = await get(`login/username/${username}`);
            if (!checkname) {
                setAlertText("This username is already taken");
                setModalAlert('flex');
            }
            if (checkname) {
                const hash = sha256(password);
                const body = { first_name: firstName, last_name: lastName, username, password: hash, is_admin: false };
                const posted = await post(`users`, body);
                setOpen(false);
                setModalAlert("none");
                login();
            }
        }
    }

    return (
        <div className="login-page">
            <div className="login-card">
                <h2>Welcome to Bookworm</h2>
                <h3>Log in or sign up to enter</h3>
                <CustomField label="Username" required onChange={(e) => setUsername(e.target.value.trim())} />
                <CustomField type="password" label="Password" required onChange={(e) => setPassword(e.target.value.trim())} />
                <div className="login-btns">
                    <CustomButton onClick={login} text="Login" />
                    <CustomButton text="Sign Up" onClick={() => setOpen(true)} />
                </div>
            </div>
            <Alert severity="error" style={{ display: showAlert }}
                action={<Close onClick={() => setShowAlert("none")} />}>Wrong username or password!</Alert>
            <Modal open={open} onClose={() => { setOpen(false), setModalAlert("none") }} className="modal">
                <div className="modal-content">
                    <h4>Sign Up</h4>
                    <CustomField label="First Name" onChange={(e) => setFirstName(e.target.value.trim())} />
                    <CustomField label="Last Name" onChange={(e) => setLastName(e.target.value.trim())} />
                    <CustomField label="Username" required onChange={(e) => setUsername(e.target.value.trim())} />
                    <CustomField label="Password" type="password" required onChange={(e) => setPassword(e.target.value.trim())} />
                    <Alert severity="error" style={{ display: modalAlert }}
                        action={<Close onClick={() => setModalAlert("none")} />}>{alertText}</Alert>
                    <CustomButton text="Sign Up" onClick={signUp} />
                </div>
            </Modal>
        </div>
    );
}