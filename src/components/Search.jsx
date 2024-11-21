import { Box, Button, Container, Input } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

export const Search = ({ searchTerm, setSearchTerm, searchBooks }) => { // Passando searchBooks diretamente como prop
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // Atualiza o termo de busca
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchBooks(searchTerm); // Chama a busca ao pressionar Enter
    }
  };

  return (
    <Container display="flex" flexDirection="row" justifyContent="end" mt={8} maxW="container.xl">
      <Box mr={4}>
        <Input
          placeholder="Buscar livros..."
          value={searchTerm}
          onChange={handleSearchChange} // Atualiza o termo de busca
          onKeyDown={handleKeyDown} // Executa a busca ao pressionar Enter
        />
      </Box>
      <Button leftIcon={<SearchIcon />} variant="ghost" onClick={() => searchBooks(searchTerm)}>
        Buscar
      </Button>
    </Container>
  );
};
