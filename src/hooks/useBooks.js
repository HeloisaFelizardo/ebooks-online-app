import { useState, useEffect, useCallback } from "react";
import { getBooks, getBooksByTerm } from "../services/bookService.js";

const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [highlightBook, setHighlightBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Adicionando estado para o termo de busca

  // Função auxiliar para definir estado ao carregar dados
  const handleLoad = async (loadFunction, onSuccess) => {
    setLoading(true);
    try {
      const data = await loadFunction();
      onSuccess(data);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
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

  // Monitorar mudanças no searchTerm e recarregar livros se necessário
  useEffect(() => {
    if (!searchTerm.trim()) {
      loadBooks(); // Chama a função que carrega todos os livros quando a busca está vazia
    } else {
      searchBooks(searchTerm); // Chama a busca com o termo se ele não estiver vazio
    }
  }, [searchTerm, loadBooks, searchBooks]);

  return {
    books,
    highlightBook,
    loading,
    loadBooks,
    searchBooks,
    setBooks,
    setSearchTerm, // Expondo a função para atualizar o searchTerm
  };
};

export default useBooks;
