// hooks/useBooks.js
import {useState, useEffect} from "react";
import {getBooks} from "../services/bookService.js";

const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [highlightBook, setHighlightBook] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadBooks = async () => {
    try {
      const booksData = await getBooks();
      setBooks(booksData);

      if (booksData.length > 0) {
        // Selecionar um livro para destaque baseado no dia atual
        const today = new Date();
        const dayOfYear = Math.floor(
          (today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
        );
        const bookIndex = dayOfYear % booksData.length;
        setHighlightBook(booksData[bookIndex]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  return {books, highlightBook, loading, setLoading, loadBooks};
};

export default useBooks;
