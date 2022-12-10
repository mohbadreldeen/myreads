import SearchBook from "../components/SearchBook";

export default function SearchPage(props) {
    const {
        myBooks,
        updateBook
    } = props;
    return (
        <SearchBook 
            myBooks={myBooks}
            updateBook={updateBook}
        />
    );
}