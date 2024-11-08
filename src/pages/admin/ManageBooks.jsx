import {
  Box,
  Button,
  ButtonGroup,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Image,
  Grid,
  GridItem
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import useBooks from "../../hooks/useBooks.js";
import LoadingSpinner from "../../components/LoadingSpinner.jsx";

export const ManageBooks = () => {
  const { books, loading } = useBooks();
  const initialRef = useRef(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState({});

  const handleOpenUpdateModal = (book) => {
    setSelectedBook(book);
    setIsUpdateModalOpen(true);
  };

  const handleDelete = async (id) => {
    console.log(`Deletar livro com ID ${id}`);
    // Adicione a lógica de exclusão aqui
  };

  const handleUpdate = async () => {
    console.log("Atualizando livro:", selectedBook);
    setIsUpdateModalOpen(false);
    // Adicione a lógica de atualização aqui
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedBook((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) return <LoadingSpinner />;

  return (
    <Container maxW="container.lg" p={4}>
      <Heading as="h1" size="lg" mb={6}>
        Gerenciar Livros
      </Heading>

      <Box>
        <Grid templateColumns="repeat(5, 1fr)" gap={4} mb={2} fontWeight="bold">
          <GridItem>Título</GridItem>
          <GridItem>Autor</GridItem>
          <GridItem>Capa</GridItem>
          <GridItem>PDF</GridItem>
          <GridItem>Ações</GridItem>
        </Grid>
        {books.map((book) => (
          <Box key={book.id} bg="gray.100" p={3} borderRadius="md" mb={2}>
            <Grid templateColumns="repeat(5, 1fr)" gap={4} alignItems="center">
              <GridItem>
                <Text>{book.name}</Text>
              </GridItem>
              <GridItem>
                <Text>{book.author}</Text>
              </GridItem>
              <GridItem>
                <Image src={book.coverUrl} alt={book.name} boxSize="50px" />
              </GridItem>
              <GridItem>
                <Text>{book.pdf ? "Sim" : "Não"}</Text>
              </GridItem>
              <GridItem>
                <ButtonGroup>
                  <Button
                    colorScheme="blue"
                    onClick={() => handleOpenUpdateModal(book)}
                  >
                    Atualizar
                  </Button>
                  <Button colorScheme="red" onClick={() => handleDelete(book.id)}>
                    Deletar
                  </Button>
                </ButtonGroup>
              </GridItem>
            </Grid>
          </Box>
        ))}
      </Box>

      {/* Modal de atualização do livro */}
      <Modal
        initialFocusRef={initialRef}
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Atualizar Livro</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mb={4}>
              <FormLabel>Título</FormLabel>
              <Input
                ref={initialRef}
                name="name"
                value={selectedBook.name || ""}
                onChange={handleInputChange}
                placeholder="Título do livro"
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Autor</FormLabel>
              <Input
                name="author"
                value={selectedBook.author || ""}
                onChange={handleInputChange}
                placeholder="Autor do livro"
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>URL da Capa</FormLabel>
              <Input
                name="coverUrl"
                value={selectedBook.coverUrl || ""}
                onChange={handleInputChange}
                placeholder="URL da imagem de capa"
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>URL do PDF</FormLabel>
              <Input
                name="pdf"
                value={selectedBook.pdf || ""}
                onChange={handleInputChange}
                placeholder="URL do arquivo PDF"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleUpdate}>
              Salvar
            </Button>
            <Button onClick={() => setIsUpdateModalOpen(false)}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};
