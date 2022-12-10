import {Link} from 'react-router-dom';
import { useState } from "react";
import { search } from "../BooksAPI";
import Book from "./Book";
 
export default function SearchBook(props) {
    const {
        updateBook,
        myBooks
    } = props;
    const [query, setQuery] = useState("");
    const [books, setBooks] = useState([]);
    const handleChange = (e) => {
        if(e.target.value.length < 1) {
            setQuery('');
            setBooks([]);
            return;
        }
        setQuery(e.target.value);
        search(e.target.value).then((response) => {
            if(Array.isArray(response)) {
              response = response.map(book => {
                  const myBook = myBooks.find(myBook => myBook.id === book.id);
                  myBook ? book.shelf = myBook.shelf : book.shelf = 'none';
                  return book;
              });
            }
            setBooks(response);
        });
    };
    
    return (
        <div className="search-books">
          <div className="search-books-bar">
          <Link className="close-search" to="/">Add a book</Link>
          
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
                {
                  Array.isArray(books) && 
                  books.map(book => <Book key={book.id} book={book} updateBook={updateBook} />)
                }
                {
                  typeof books.error === 'string' &&
                  <p className="error-message">No Results</p>
                }
            </ol>
          </div>
        </div>
    );
}