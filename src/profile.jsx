import "../styles/profile.css";
import { Header } from "./header";
import { useEffect } from "react";
import { useState } from "react";
import { deleting, get, GetUserID, put } from "./fetch_data";
import { Loading } from "./loading";
import { Footer } from "./footer";
import { CustomField } from "./custom_textfield";
import { CustomButton } from "./custom_button";
import { CustomIcon } from "./custom_icon";
import { Alert, Modal } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export function Profile() {

    const [user, setUser] = useState();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showAlert, setShowAlert] = useState("none");
    const [comments, setComments] = useState([]);
    const [changePage, setChangePage] = useState(0);
    const [selected, setSelected] = useState({});
    const [open, setOpen] = useState(false);
    const userID = GetUserID();
    const navigate = useNavigate();

    const loadUser = async () => {
        const loadedUser = await get(`users/${userID}`);
        setUser(loadedUser);
        setFirstName(loadedUser.first_name);
        setLastName(loadedUser.last_name);
        setUsername(loadedUser.username);
        setPassword(loadedUser.password);
        const loadedComments = await get(`comments/user/${userID}`);
        setComments(loadedComments);
    }

    const editUser = async () => {
        if (username.length > 0 && password.length > 0) {
            const body = { id: userID, first_name: firstName, last_name: lastName, username, password };
            const editedUser = await put(`users`, body);
        }
        else {
            setShowAlert('flex');
        }
    }

    const openEdit = (id, title, text) => {
        setSelected({ id, title, text });
        setOpen(true);
    }

    const editComment = async () => {
        const body = { id: selected.id, text: selected.text };
        const edited = await put(`comments`, body);
        setOpen(false);
        setChangePage(changePage + 1);
    }

    const deleteComment = async (id) => {
        const deleted = await deleting(`comments/${id}`);
        setChangePage(changePage + 1);
    }

    useEffect(() => {
        loadUser();
    }, [changePage]);

    return (
        <>
            {user == undefined ? <Loading /> :
                <div className="profile">
                    <Header />
                    <div className="profile-page">
                        <div className="info-card">
                            <h4>My Information</h4>
                            <div className="profile-info">
                                <div className="personal-info">
                                    <CustomField label="First Name" defaultValue={firstName} onChange={(e) => setFirstName(e.target.value.trim())} />
                                    <CustomField label="Last Name" defaultValue={lastName} onChange={(e) => setLastName(e.target.value.trim())} />
                                </div>
                                <div className="login-info">
                                    <CustomField label="User Name" defaultValue={username} required onChange={(e) => setUsername(e.target.value.trim())} />
                                    <CustomField label="Password" defaultValue={password} required type="password" onChange={(e) => setPassword(e.target.value.trim())} />
                                </div>
                                <Alert severity="error" style={{ display: showAlert }}
                                    action={<Close onClick={() => setShowAlert("none")} />}>Fill the required fields</Alert>
                            </div>
                            <CustomButton onClick={editUser} text="Confirm Changes" />
                        </div>
                        <div className="profile-comments">
                            <h4>My Comments</h4>
                            <div className="user-comments">
                                {comments.map((c) => {
                                    return (
                                        <div className="comment-card">
                                            <div key={c.id} className="comment">
                                                <div className="user-comment-header">
                                                    <div className="comment-book" onClick={() => navigate(`/book/${c.book_id}`)}>Comment on {c.title}</div>
                                                    <div className="secondary">{c.date.slice(0, 10)}</div>
                                                </div>
                                                <div className="comment-text">{c.text}</div>
                                            </div>
                                            <div className="comment-btns">
                                                <CustomIcon type="edit" onClick={() => openEdit(c.id, c.title, c.text)} />
                                                <CustomIcon type="del" onClick={() => deleteComment(c.id)} />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <Modal open={open} onClose={() => setOpen(false)} className="modal">
                        <div className="modal-content">
                            <div>Edit comment on {selected.title}</div>
                            <CustomField label="Comment" defaultValue={selected.text}
                                onChange={(e) => setSelected({ id: selected.id, text: e.target.value })} />
                            <CustomButton text="Save" onClick={editComment} />
                        </div>
                    </Modal>
                    <Footer />
                </div>
            }
        </>
    );
}