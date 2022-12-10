import {Route, Routes} from 'react-router-dom';
import { useEffect, useState } from "react";
import {getAll, update} from './BooksAPI';
import MainPage from './pages/MainPage'; 
import SearchPage from './pages/SearchPage'; 

import "./App.css";
function App() {  
  const [books, setBooks] = useState([]);
 
  const updateBook = (book, shelf) => {
   update(book, shelf).then((response) => {
    const findBook = books.find(b => b.id === book.id);
    if(findBook) {
      findBook.shelf = shelf;
      setBooks(books.concat([]));
    } else {
      book.shelf = shelf;
      setBooks(books.concat([book]));
    }
   });
  }
 
  useEffect(() => {
    getAll().then((response) => {
      setBooks(response);
    });
  }, []);

  return (
    <div className="app">
      <Routes>
          <Route path="/" element={<MainPage updateBook={updateBook} 
            currentlyReading={books.filter(book => book.shelf === 'currentlyReading')} 
            wantToRead={books.filter(book => book.shelf === 'wantToRead')} 
            read={books.filter(book => book.shelf === 'read')} />} 
          />
          <Route path="/search" element={<SearchPage updateBook={updateBook} myBooks={books} />}
      />
      </Routes>
    </div>
  );
}

export default App;
