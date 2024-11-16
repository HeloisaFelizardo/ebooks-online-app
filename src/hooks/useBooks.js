// hooks/useBooks.js
import { useState, useEffect } from "react";
import { getBooks } from "../services/bookService.js";

const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [highlightBook, setHighlightBook] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadBooks = async () => {
    try {
      const booksData = await getBooks();
      setBooks(booksData);

      // Selecionar um livro aleatório para destaque
      const randomIndex = Math.floor(Math.random() * booksData.length);
      setHighlightBook(booksData[randomIndex]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  return { books, highlightBook, loading, loadBooks };
};

export default useBooks;