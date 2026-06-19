import { List, ListItem, ListItemButton, ListItemText, Tabs, Tab } from "@mui/material";
import "../styles/library.css";
import { Header } from "./header";
import { BooksList } from "./books_list";
import { ReadingLists } from "./reading_list";
import { useState } from "react";

export function Library() {
    const books = [{ title: "Book1", author: "Author1" }, { title: "Book2", author: "Author2" },
    { title: "Book3", author: "Author3" }, { title: "Book4", author: "Author4" },
    { title: "Book5", author: "Author5" }, { title: "Book6", author: "Author6" },
    { title: "Book7", author: "Author7" }, { title: "Book8", author: "Author8" },
    { title: "Book9", author: "Author9" }, { title: "Book10", author: "Author10" },
    { title: "Book11", author: "Author11" }, { title: "Book12", author: "Author12" }];

    const lists = [{ name: "List1", description: "Description1" },
    { name: "List2", description: "Description2" },
    { name: "List3", description: "Description3" },
    { name: "List4", description: "Description4" }];

    const [tab, setTab] = useState(0);

    const handleChange = (event, value) => {
        setTab(value);
    };

    return (
        <div className="library">
            <Header />
            <div className="library-content">
                <div className="library-sidebar">
                    <Tabs value={tab} onChange={handleChange} orientation="vertical">
                        <Tab label="Recent Books" />
                        <Tab label="Bookmarked Books" />
                        <Tab label="Favorite Books" />
                        <Tab label="Book Lists" />
                    </Tabs>
                </div>
                {tab < 3 ? <BooksList books={books} tab={tab}/> : <ReadingLists lists={lists} />}

            </div>
        </div>
    );
}