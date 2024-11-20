// hooks/useBooks.js
import {useState, useEffect} from "react";
import {getBooks, getBooksByTitle} from "../services/bookService.js";

const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [highlightBook, setHighlightBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBooks();
  }, []);


  const loadBooks = async () => {
    try {
      const booksData = await getBooks();
      if (!booksData || booksData.length === 0) {
        console.warn("Nenhum livro encontrado.");
        setBooks([]);
        setHighlightBook(null);
        setLoading(false);
        return;
      }

      setBooks(booksData);

      // Selecionar um livro para destaque
      const today = new Date();
      const dayOfYear = Math.floor(
        (today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
      );
      const bookIndex = dayOfYear % booksData.length;
      setHighlightBook(booksData[bookIndex]);
    } catch (error) {
      console.error("Erro ao carregar livros:", error);
    } finally {
      setLoading(false);
    }
  };

  const searchBooks = async (searchTerm) => {
    if (!searchTerm.trim()) {
      loadBooks(); // Mostra todos os livros ao limpar
      return;
    }
    try {
      setLoading(true);
      const filteredBooks = await getBooksByTitle(searchTerm);
      setBooks(filteredBooks.books);

      if (filteredBooks.length > 0) {
        setHighlightBook(filteredBooks[0]); // Destaque o primeiro livro encontrado
      } else {
        setHighlightBook(null);
      }
    } catch (error) {
      console.error("Erro na busca de livros:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    books,
    setBooks,
    highlightBook,
    loading,
    setLoading,
    loadBooks,
    searchBooks, // Adicionado
  };

};

export default useBooks;
