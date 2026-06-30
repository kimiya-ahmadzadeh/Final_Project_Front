import { Button, Tab, Tabs } from "@mui/material";
import { Header } from "./header";
import { useState } from "react";
import { PaginateBooks } from "./paginated_books";
import { get } from "./fetch_data";
import { useEffect } from "react";
import { AdminContent } from "./admin_content";
import { Footer } from "./footer";

export function AdminPage() {

    const tabLabel = ["Books", "Genres", "Lists"];
    const [tab, setTab] = useState(0);
    const [items, setItems] = useState([]);
    const [books, setBooks] = useState([]);
    const [change, setChange] = useState(0);

    const loadBooks = async () => {
        if (tab == 0) {
            const loadedBooks = await get(`books`);
            setItems(loadedBooks);
            let bookOpt = [];
            loadedBooks.forEach((b) => {
                bookOpt.push({ id: b.id, label: b.title });
            });
            setBooks(bookOpt);
        }
        else if (tab == 1) {
            const loadedGenres = await get(`genres`);
            setItems(loadedGenres);
        }
        else if (tab == 2) {
            const loadedLists = await get(`admin/lists`);
            setItems(loadedLists);
        }
    }

    const handleChange = () => {
        setChange(change + 1);
    }

    useEffect(() => {
        loadBooks();
    }, [change, tab]);

    return (
        <div className="admin-page">
            <Header />
            <div className="admin-side-bar">
                <Tabs value={tab} onChange={(event, value) => setTab(value)} >
                    {tabLabel.map((l, index) => {
                        return (
                            <Tab label={l} />
                        );
                    })}
                </Tabs>
            </div>
            <AdminContent type={tabLabel[tab]} items={items} books={books} changePage={handleChange} />
            <Footer />
        </div>
    );
}