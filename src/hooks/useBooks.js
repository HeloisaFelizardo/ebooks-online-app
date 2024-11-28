import { useState, useCallback, useEffect } from "react";
import { getBooks, getBooksByTerm } from "../services/bookService.js";

const useBooks = () => {
  // Estado para armazenar os livros como um Map, onde a chave é o ID (_id) do livro.
  // O Map permite acessos rápidos e evita duplicações com base na chave.
  const [booksMap, setBooksMap] = useState(new Map());

  // Outros estados auxiliares para gerenciamento de livros, destaque e controle de interface.
  const [books, setBooks] = useState([]); // Não essencial quando se usa o Map, mas pode ser útil para conversões rápidas.
  const [highlightBook, setHighlightBook] = useState(null); // Livro destacado.
  const [loading, setLoading] = useState(false); // Estado de carregamento.
  const [error, setError] = useState(null); // Estado para exibir erros ao usuário.

  // Função auxiliar para gerenciar carregamento de dados e lidar com erros.
  const handleLoad = async (loadFunction, onSuccess) => {
    setLoading(true); // Define que a aplicação está carregando.

    try {
      const data = await loadFunction(); // Chama a função de carregamento (ex.: getBooks ou getBooksByTerm).
      onSuccess(data); // Executa a lógica de sucesso definida por quem chama.
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      setError("Nenhum livro foi encontrado com esse termo.");
      setBooks([]); // Limpa a lista de livros em caso de erro.
      setHighlightBook(null); // Remove o destaque.
    } finally {
      setLoading(false); // Finaliza o estado de carregamento.
    }
  };

  // Função para destacar um livro com base no dia do ano.
  const highlightDailyBook = (booksList) => {
    if (!booksList || booksList.length === 0) return;

    // Calcula o dia do ano.
    const dayOfYear = Math.floor(
      (new Date() - new Date(new Date().getFullYear(), 0, 0)) /
      (1000 * 60 * 60 * 24)
    );

    // Define o livro destacado usando o índice correspondente ao dia do ano.
    setHighlightBook(booksList[dayOfYear % booksList.length]);
  };

  // Função para carregar todos os livros.
  const loadBooks = useCallback(() => {
    handleLoad(getBooks, (booksData) => {
      // Transforma a lista de livros recebida em um Map.
      // Cada item no Map é uma entrada [book._id, book], permitindo acesso eficiente por ID.
      const booksMap = new Map(booksData.map(book => [book._id, book]));

      setBooksMap(booksMap); // Armazena os livros no estado como um Map.
      highlightDailyBook([...booksMap.values()]); // Destaca um livro convertendo os valores do Map para um array.
    });
  }, []);

  // Função para buscar livros com base em um termo de pesquisa.
  const searchBooks = useCallback(
    (searchTerm) => {
      if (!searchTerm.trim()) {
        loadBooks(); // Recarrega todos os livros se o termo de pesquisa estiver vazio.
        return;
      }

      // Carrega os livros que correspondem ao termo de pesquisa.
      handleLoad(() => getBooksByTerm(searchTerm), (filteredBooks) => {
        // Obtém a lista de livros filtrados.
        const booksList = filteredBooks?.books || [];

        // Transforma a lista de livros filtrados em um Map.
        const booksMap = new Map(booksList.map(book => [book._id, book]));

        setBooksMap(booksMap); // Armazena os livros no Map.
        setHighlightBook(booksList[0] || null); // Destaca o primeiro livro da lista, se existir.
      });
    },
    [loadBooks] // Reutiliza a função loadBooks como dependência.
  );

  // Efeito que carrega os livros ao montar o componente.
  useEffect(() => {
    loadBooks();
  }, []);

  return {
    books: [...booksMap.values()], // Converte os valores do Map para um array, para compatibilidade com componentes que esperam arrays.
    booksMap, // Retorna o Map diretamente, útil para acessos rápidos e específicos.
    highlightBook, // Livro destacado.
    loading, // Estado de carregamento.
    error, // Mensagens de erro.
    loadBooks, // Função para recarregar todos os livros.
    searchBooks, // Função para buscar livros por termo.
    setBooks, // Mantido para manipulação opcional em componentes.
  };
};

export default useBooks;
