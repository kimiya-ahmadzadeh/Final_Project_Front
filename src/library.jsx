import { List, ListItem, ListItemButton, ListItemText, Tabs, Tab, Button, Modal, TextField } from "@mui/material";
import "../styles/library.css";
import { Header } from "./header";
import { BooksList } from "./books_list";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Library() {

    const navigate = useNavigate();
    const [tab, setTab] = useState(0);
    const [lists, setList] = useState([{
        name: "List1", description: "Description1",
        books: [{ title: "Book1", author: "Author1" }, { title: "Book2", author: "Author2" }, { title: "Book3", author: "Author3" }]
    },
    { name: "List2", description: "Description2", books: [{ title: "Book11", author: "Author11" }, { title: "Book12", author: "Author12" }] },
    { name: "List3", description: "Description3", books: [] },
    { name: "List4", description: "Description4" }]);
    const [open, setOpen] = useState(false);

    const handleChange = (event, value) => {
        navigate(`/library/lists/${lists[value].name}`);
        setTab(value);
    };

    const handleList = (newList) => {
        console.log(newList)
        const newLists = [...lists, newList];
        setList(newLists);
        console.log(lists);
    }

    return (
        <div className="library">
            <Header />
            <div className="library-content">
                <div className="library-sidebar">
                    <Tabs value={tab} onChange={handleChange} orientation="vertical">
                        <Tab label="Recent Books" />
                        <Tab label="Bookmarked Books" />
                        <Tab label="Favorite Books" />
                        {lists.map((list, index) => {
                            return (
                                <Tab label={list.name} />
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