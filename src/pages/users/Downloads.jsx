import BookList from '../../components/BookList.jsx';
import {useEffect, useState} from "react";
import {getBooks} from "../../services/bookService.js";
import LoadingSpinner from "../../components/LoadingSpinner.jsx";

const Downloads = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBooks = async () => {
    try {
      const booksData = await getBooks();
      setBooks(booksData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <BookList books={books}/>
  );
};

export default Downloads;
