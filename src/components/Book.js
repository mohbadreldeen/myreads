import { Link } from 'react-router-dom';
import { useState } from "react";
export default function Book (props) {
    const {
        book,
        updateBook
    } = props;
    const [shelf, setShelf] = useState(book.shelf ? book.shelf : 'none');
    const handleChange = (e) => {
        updateBook(book, e.target.value);
        setShelf(e.target.value);
    };

    const thumbnail = book.imageLinks && book.imageLinks.thumbnail ? book.imageLinks.thumbnail : './no-cover.png';
    
    return (
        <div className="book">
            <div className="book-shelf-changer">
                <select onChange={handleChange} value={shelf} >
                    <option disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
            <div className="book-top">
                <div
                className="book-cover"
                style={{
                    width: '100%',
                    height: 193,
                    backgroundImage:
                    `url("${thumbnail}")`,
                }}
                ></div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{
                Array.isArray(book.authors) && book.authors.map((author, index)=> <span key={index} className="book-author">{author}</span>)
            }</div>
            <Link className="detail-btn" to={`/book/${book.id}`}>Details</Link>
        </div>
    );
}