import { List, ListItem, ListItemButton, ListItemText, Tabs, Tab, Button, Modal, TextField } from "@mui/material";
import "../styles/library.css";
import { Header } from "./header";
import { BooksList } from "./books_list";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetLists } from "./fetch_data";
import { Loading } from "./loading";

export function Library() {

    const [tab, setTab] = useState(0);
    const [lists, setList] = useState([]);
    const [open, setOpen] = useState(false);

    const loadLists = async () => {
        const user = JSON.parse(localStorage.getItem("userAuth"));
        console.log(user);
        const loadedLists = await GetLists(user.id);
        setList(loadedLists);
    }

    useEffect(() => {
        loadLists();
    }, []);

    const handleChange = (event, value) => {
        setTab(value);
    };

    const handleList = (newList) => {
        console.log(newList)
        const newLists = [...lists, newList];
        // setList(newLists);
        console.log(lists);
    }

    return (
        <div className="library">
            <Header />
            <div className="library-content">
                <div className="library-sidebar">
                    <Tabs value={tab} onChange={handleChange} orientation="vertical">
                        {lists.map((list) => {
                            return (
                                <Tab key={list.id} label={list.name} />
                            );
                        })}
                    </Tabs>
                    <Button onClick={() => setOpen(true)}>Add List</Button>
                </div>
                <BooksList list={lists[tab]} />
            </div>
            <Modal open={open} onClose={() => setOpen(false)}>
                <div className="list-modal">
                    <h2>New Reading List</h2>
                    <TextField label="List name" variant="outlined" />
                    <TextField label="List description" variant="outlined" />
                    <Button variant="outlined" onClick={() => handleList({ name: "NewList", description: "gvdg", books: [] })}>Add</Button>
                    <Button variant="outlined" onClick={() => setOpen(false)}>Cancle</Button>
                </div>
            </Modal>
        </div>
    );
}