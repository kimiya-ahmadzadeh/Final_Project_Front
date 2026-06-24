import { Header } from "./header";
import { PaginateBooks } from "./paginated_books";

export function SearchResults(props) {
    return (
        <div className="search-result">
            <Header />
            <div>
                <PaginateBooks books={props.books} />
            </div>
        </div>
    );
}