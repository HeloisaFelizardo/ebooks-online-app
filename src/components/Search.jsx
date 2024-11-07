import {Box, Button, Container, Input} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons";

export const Search = () => {
  return (
    <Container display="flex" flexDirection="row" justifyContent='end' mt={8} maxW='container.xl'>
      <Box mr={4}>
        <Input placeholder="Buscar livros..."/>
      </Box>
      <Button leftIcon={<SearchIcon/>} variant="ghost">
        Buscar
      </Button>
    </Container>
  );
}