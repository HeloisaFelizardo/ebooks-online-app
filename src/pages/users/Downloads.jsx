import {useState} from "react";
import {Box, Text} from "@chakra-ui/react";
import BookList from "../../components/BookList.jsx";
import LoadingSpinner from "../../components/LoadingSpinner.jsx";
import {Highlights} from "../../components/Highlights.jsx";
import {Search} from "../../components/Search.jsx";
import useBooks from "../../hooks/useBooks.js";
import {getBooksByTitle} from "../../services/bookService.js";

const Downloads = () => {
  const {books, setBooks, highlightBook, loading, searchBooks} = useBooks();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    searchBooks(searchTerm);
  };

  if (loading) return <LoadingSpinner/>;

  // Exibindo mensagem "Nenhum livro encontrado" quando a busca não retornar resultados

  if (books.length === 0 || !books) {
    return(
      <Box minHeight="100vh" display="flex" flexDirection="column">
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={handleSearch}/>
        <Text fontSize="xl" color="gray.500">Nenhum livro encontrado</Text>
      </Box>
    )
  }

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={handleSearch}/>
      <Highlights book={highlightBook}/>
      <BookList books={books}/>
    </Box>
  );
};

export default Downloads;
