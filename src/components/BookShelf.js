import Book from './Book';
export default function BookShelf ( props ) {
    const {
        title,
        books,
        updateBook
    } = props;
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {
                        books.map(book => <li key={book.id}><Book book={book} updateBook={updateBook} /></li>)
                    }
                </ol>
            </div>
        </div>
    )
}