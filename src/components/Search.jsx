import { Box, Button, Container, Input } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

export const Search = ({ searchTerm, setSearchTerm, onSearch }) => {
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(); // Chama a busca ao pressionar Enter
    }
  };

  return (
    <Container display="flex" flexDirection="row" justifyContent="end" mt={8} maxW="container.xl">
      <Box mr={4}>
        <Input
          placeholder="Buscar livros..."
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
        />
      </Box>
      <Button leftIcon={<SearchIcon />} variant="ghost" onClick={onSearch}>
        Buscar
      </Button>
    </Container>
  );
};
