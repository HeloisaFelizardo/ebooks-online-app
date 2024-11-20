import {useState} from "react";
import {Box, Flex, Text} from "@chakra-ui/react";
import BookList from "../../components/BookList.jsx";
import LoadingSpinner from "../../components/LoadingSpinner.jsx";
import {Highlights} from "../../components/Highlights.jsx";
import {Search} from "../../components/Search.jsx";
import useBooks from "../../hooks/useBooks.js";

const Downloads = () => {
  const {books, setBooks, highlightBook, loading, searchBooks} = useBooks();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    const results = searchBooks(searchTerm);
    setBooks(results);
  };

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      {/* Barra de busca */}
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={handleSearch}/>

      {/* Spinner de carregamento ou conteúdo principal */}
      {loading ? (
        <LoadingSpinner/>
      ) : (
        <>

          {(!Array.isArray(books) || books.length === 0) ? (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="50vh"
              p={4}
              textAlign="center"
            >
              <Flex direction="column" align="center" justify="center">
                <Text fontSize="6xl" mb={4}>
                  📚❌
                </Text>
                <Text fontSize="2xl" fontWeight="bold" color="gray.700">
                  Nenhum livro encontrado! 😔
                </Text>
                <Text fontSize="lg" color="gray.500" mt={2}>
                  Parece que não há nada por aqui... Volte logo! 📖✨
                </Text>
              </Flex>
            </Box>

          ) : (
            <>
              <Highlights book={highlightBook}/>
              <BookList books={books}/>
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default Downloads;
