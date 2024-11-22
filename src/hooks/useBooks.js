import { useState, useCallback } from "react";
import { getBooks, getBooksByTerm } from "../services/bookService.js";

const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [highlightBook, setHighlightBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Estado para erro

  // Função auxiliar para definir estado ao carregar dados
  const handleLoad = async (loadFunction, onSuccess) => {
    setLoading(true);
    setError(null); // Reseta o erro antes de tentar carregar
    try {
      const data = await loadFunction();
      onSuccess(data);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      setError("Nenhum livro foi encontrado com esse termo.");
      setBooks([]);
      setHighlightBook(null);
    } finally {
      setLoading(false);
    }
  };

  // Função para destacar um livro com base no dia do ano
  const highlightDailyBook = (booksList) => {
    if (!booksList || booksList.length === 0) return;
    const dayOfYear = Math.floor(
      (new Date() - new Date(new Date().getFullYear(), 0, 0)) /
      (1000 * 60 * 60 * 24)
    );
    setHighlightBook(booksList[dayOfYear % booksList.length]);
  };

  // Função para carregar livros
  const loadBooks = useCallback(() => {
    handleLoad(getBooks, (booksData) => {
      setBooks(booksData || []);
      highlightDailyBook(booksData);
    });
  }, []);

  // Função de busca de livros
  const searchBooks = useCallback(
    (searchTerm) => {
      if (!searchTerm.trim()) {
        loadBooks(); // Carrega todos os livros quando o termo está vazio
        return;
      }

      handleLoad(() => getBooksByTerm(searchTerm), (filteredBooks) => {
        const booksList = filteredBooks?.books || [];
        setBooks(booksList);
        setHighlightBook(booksList[0] || null);
      });
    },
    [loadBooks] // Dependência de loadBooks
  );

  return {
    books,
    highlightBook,
    loading,
    error,
    loadBooks,
    searchBooks,
    setBooks,
  };
};

export default useBooks;
