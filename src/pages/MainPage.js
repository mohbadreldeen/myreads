import { Link } from 'react-router-dom';
import BookShelf from "../components/BookShelf";

export default function MainPage (props){
    const {
        updateBook,
        currentlyReading,
        wantToRead,
        read
    } = props;
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    <BookShelf title="Currently Reading" books={currentlyReading} updateBook={updateBook}  />
                    <BookShelf title="Want to Read" books={wantToRead} updateBook={updateBook}  />
                    <BookShelf title="Read" books={read} updateBook={updateBook}  />
                </div>
            </div>
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
        </div>
    )
}