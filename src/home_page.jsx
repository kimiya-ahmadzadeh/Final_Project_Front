import "../styles/home_page.css";
import { BookRows } from "./book_row";
import { GetUserID } from "./fetch_data";
import { Header } from "./header";

export function HomePage() {
    const books = [{ title: "Book1", author: "Author1" }, { title: "Book2", author: "Author2" },
    { title: "Book3", author: "Author3" }, { title: "Book4", author: "Author4" },
    { title: "Book5", author: "Author5" }, { title: "Book6", author: "Author6" },
    { title: "Book7", author: "Author7" }, { title: "Book8", author: "Author8" },
    { title: "Book9", author: "Author9" }, { title: "Book10", author: "Author10" },
    { title: "Book11", author: "Author11" }, { title: "Book12", author: "Author12" }]

    const userID = GetUserID();
    return (
        <div className="home-page">
            <Header userID={userID} />
            <BookRows books={books} header={"Random List"} />
            <BookRows books={books} header={"Random List"} />
            <BookRows books={books} header={"Random List"} />
            <BookRows books={books} header={"Random List"} />
            <BookRows books={books} header={"Random List"} />
            <BookRows books={books} header={"Random List"} />
            <BookRows books={books} header={"Random List"} />
            <BookRows books={books} header={"Random List"} />
            <BookRows books={books} header={"Random List"} />
            <BookRows books={books} header={"Random List"} />
        </div>
    )
}