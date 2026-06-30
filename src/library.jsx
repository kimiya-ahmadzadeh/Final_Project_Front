import { List, ListItem, ListItemButton, ListItemText, Tabs, Tab, Button, Modal, TextField } from "@mui/material";
import "../styles/library.css";
import { Header } from "./header";
import { BooksList } from "./books_list";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { get, GetUserID, post } from "./fetch_data";
import { Loading } from "./loading";
import { Footer } from "./footer";

export function Library(props) {

    const [tab, setTab] = useState(0);
    const [lists, setList] = useState([]);
    const [open, setOpen] = useState(0);
    const [changeList, setChangeList] = useState(0);
    const [listName, setListName] = useState("");
    const [listDesc, setListDesc] = useState("");
    const userID = GetUserID();

    const loadLists = async () => {
        const loadedLists = await get(`users/lists/${userID}`);
        setList(loadedLists);
    }

    useEffect(() => {
        loadLists();
    }, [changeList]);

    const handleChange = (changeTab) => {
        if (changeTab) setTab(0); // when a list is deleted, select first tab
        setChangeList(changeList + 1); // rerender page when a list is changed
    };

    const addList = async () => {
        if (listName.length > 0) {
            if (listName == "Recent Books" || listName == "Favorite Books" || listName == "Bookmarked Books") {
                window.alert("Can't choose this name.");
            }
            else {
                const body = { name: listName, description: listDesc, user_id: userID, public: false, created: true }
                const add = await post(`users/lists`, body);
                setChangeList(changeList + 1);
            }
            setOpen(false);
        } else {
            window.alert("List name is required");
        }
    }

    return (
        <div className="library">
            <Header />
            <div className="library-content">
                <div className="library-sidebar">
                    <Tabs value={tab} onChange={(event, value) => setTab(value)} orientation="vertical">
                        {lists.map((list) => {
                            return (
                                <Tab key={list.id} label={list.name} />
                            );
                        })}
                    </Tabs>
                    <Button onClick={() => setOpen(true)}>Add List</Button>
                </div>
                <BooksList list={lists[tab]} userID={userID} changePage={handleChange} source={"lib"} />
            </div>
            <Modal open={open} onClose={() => setOpen(false)}>
                <div className="list-modal">
                    <h2>New Reading List</h2>
                    <TextField label="List name" variant="outlined" required onChange={(e) => setListName(e.target.value)} />
                    <TextField label="List description" variant="outlined" onChange={(e) => setListDesc(e.target.value)} />
                    <Button variant="outlined" onClick={() => addList()}>Add</Button>
                    <Button variant="outlined" onClick={() => setOpen(false)}>Cancle</Button>
                </div>
            </Modal>
            <Footer />
        </div>
    );
}