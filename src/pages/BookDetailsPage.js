import {Link} from 'react-router-dom';
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import {get} from '../BooksAPI';

export default function BookDetailsPage(props) {
    const { id } = useParams();
    const [book, setBook] = useState({});
    useEffect(() => {
        get(id).then((response) => {
            setBook(response);
        });
      }, [id]);
    const thumbnail = book.imageLinks && book.imageLinks.thumbnail ? `https://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=2&edge=curl&source=gbs_api` : './no-cover.png';
    
    return (

        <div className='book-details'>
            
            {book.title && <h1 className="book-details--title"><Link className="back-home" to="/">
                <svg fill="#fff" width="35px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                </svg>
            </Link> <span>{book.title}</span></h1>}
            <div className="book-details--content">
                <img src={thumbnail} alt={book.title} />
                <div className="book-details--info">
                {
                    book.authors && Array.isArray(book.authors) && 
                    <div className="book-details--meta--authors">
                        { 
                            book.authors.length > 1 ? `Authors` : `Author` }: {book.authors.map((author, index) => {
                                return (
                                    <span key={index} className="book-author">{index > 0 ? `, ` : ``  }{author}</span> 
                                )
                            })
                        }
                    </div>
                }
                <div className="book-details--meta">
                {
                    book.categories && Array.isArray(book.categories) &&
                    <div className="book-categories">
                        Categories: {book.categories.map((cat, index)=> <span key={index} className="book-cat">{cat}</span>)}
                    </div>
                }
                {book.pageCount && <div className="book-details--meta--pages"><span>{book.pageCount}</span> pages</div>}
                { book.language && <div>Language: <span>{book.language}</span></div> }
                { book.publishedDate && <div>Published: <span>{book.publishedDate}</span></div> }
                </div>
                { book.description && <p>{book.description}</p> }
                { book.infoLink && <a className="detail-btn" target="_blank" rel="noreferrer" href={book.infoLink}>More Info</a>}
                </div>
            </div>
        </div>
    );
}