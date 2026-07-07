import { Header } from "./header";
import { useEffect, useState } from "react";
import { deleting, get, GetUserID, put } from "./fetch_data";
import { Loading } from "./loading";
import { Footer } from "./footer";
import { CustomField } from "../customs/custom_textfield";
import { CustomButton } from "../customs/custom_button";
import { CustomIcon } from "../customs/custom_icon";
import { Alert, Modal } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "../styles/profile.css";

export function Profile() {

    const [user, setUser] = useState();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
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
        const loadedComments = await get(`comments/user/${userID}`);
        setComments(loadedComments);
    }

    const editUser = async () => {
        const body = { id: userID, first_name: firstName, last_name: lastName };
        const editedUser = await put(`users`, body);
    }

    const openEdit = (id, title, text) => {
        setSelected({ id, title, text });
        setOpen(true);
    }

    const editComment = async () => {
        if (selected.text.length > 0) {
            const body = { id: selected.id, text: selected.text };
            const edited = await put(`comments`, body);
            setOpen(false);
            setChangePage(changePage + 1);
        }
        else {
            setShowAlert('flex');
        }
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
                                onChange={(e) => setSelected({ id: selected.id, title: selected.title, text: e.target.value.trim() })} />
                            <Alert severity="error" style={{ display: showAlert }}
                                action={<Close onClick={() => setShowAlert("none")} />}>Comment can't be empty!</Alert>
                            <CustomButton text="Save" onClick={editComment} />
                        </div>
                    </Modal>
                    <Footer />
                </div>
            }
        </>
    );
}