import { List, ListItemButton, ListItemText } from "@mui/material";
import "../styles/library.css";
import { Header } from "./header";
import { BooksList } from "./books_list";

export function Library() {
    const books = [{ title: "Book1", author: "Author1" }, { title: "Book2", author: "Author2" },
    { title: "Book3", author: "Author3" }, { title: "Book4", author: "Author4" },
    { title: "Book5", author: "Author5" }, { title: "Book6", author: "Author6" },
    { title: "Book7", author: "Author7" }, { title: "Book8", author: "Author8" },
    { title: "Book9", author: "Author9" }, { title: "Book10", author: "Author10" },
    { title: "Book11", author: "Author11" }, { title: "Book12", author: "Author12" }]

    return (
        <div className="library">
            <Header />
            <div className="library-content">
                <div className="library-sidebar">
                    <List>
                        <ListItemButton selected>
                            <ListItemText primary="Recent Books" />
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemText primary="Bookmarked Books" />
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemText primary="Favorite Books" />
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemText primary="Book Lists" />
                        </ListItemButton>
                    </List>
                </div>
                <BooksList books={books} />
            </div>
        </div>
    );
}