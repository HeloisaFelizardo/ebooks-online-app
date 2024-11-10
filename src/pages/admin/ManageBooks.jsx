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
  GridItem,
  Icon,
  FormErrorMessage,
  useToast,
  Spinner,
  useDisclosure
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import useBooks from "../../hooks/useBooks.js";
import LoadingSpinner from "../../components/LoadingSpinner.jsx";
import { MdDelete, MdEdit } from "react-icons/md";
import { HiUpload } from "react-icons/hi";
import useForm from "../../hooks/useForm.js";
import { useAuth } from "../../hooks/useAuth.js";
import { updateBook } from "../../services/bookService.js";

export const ManageBooks = () => {
  const { books, loading } = useBooks();
  const initialRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const [selectedBook, setSelectedBook] = useState({});

  const coverInputRef = useRef();
  const pdfInputRef = useRef();

  const [loader, setLoader] = useState(false);
  const [coverName, setCoverName] = useState("");
  const [pdfName, setPdfName] = useState("");

  const validationRules = {
    title: (value) => (!value ? 'Título é obrigatório' : ''),
    author: (value) => (!value ? 'Autor é obrigatório' : ''),
    cover: (value) => (!value ? 'Capa do livro é obrigatória' : ''),
    description: (value) => (!value ? 'Descrição é obrigatória' : ''),
    pdf: (value) => (!value ? 'Livro PDF é obrigatório' : ''),
  };

// Apenas os campos obrigatórios para edição
  const requiredFields = ["title", "author", "description"];

  const { formData, setFormData, error, validate, handleChange } = useForm(
    { title: '', author: '', description: '', cover: null, pdf: null },
    validationRules,
    requiredFields // Campos obrigatórios para edição
  );


  const toast = useToast();
  const { token } = useAuth();

  const handleOpenUpdateModal = (book) => {
    setSelectedBook(book);
    setFormData({
      title: book.title || "",
      author: book.author || "",
      description: book.description || "",
      cover: book.cover || null,
      pdf: book.pdf || null,
    });
    onOpen();
  };

  const handleDelete = async (id) => {
    console.log(`Deletar livro com ID ${id}`);
    // Adicione a lógica de exclusão aqui
  };

  const handleUpdate = async (id) => {
    console.log("Iniciando handleUpdate");

    onClose();

    if (!validate()) {
      console.log("Validação falhou");
      return;
    }

    const { title, author, description, cover, pdf } = formData;

    console.log("Dados do livro:", { title, author, description, cover, pdf });
    console.log("ID do livro:", id);
    console.log("Token:", token);

    const formDataObj = new FormData();
    formDataObj.append("title", title);
    formDataObj.append("author", author);
    formDataObj.append("description", description);

    // Somente adicione os arquivos se eles não estiverem nulos
    if (cover) formDataObj.append('cover', cover);
    if (pdf) formDataObj.append('pdf', pdf);

    setLoader(true);

    // Exibe os dados antes de enviar
    console.log("Dados a serem enviados:", formData);

    try {
      const response = await updateBook(id, formDataObj, token);
      console.log("Livro enviado com sucesso:", response);

      toast({
        title: "Sucesso!",
        description: "Livro registrado com sucesso.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (e) {
      console.error("Erro ao atualizar o livro:", e);

      const message =
        e.response?.status === 400 && e.response.data.error === "Livro já cadastrado."
          ? "Esse livro já foi cadastrado."
          : e.response?.status === 403
            ? "Você precisa estar logado para fazer upload de livros."
            : "Algo deu errado ao fazer upload do livro.";

      toast({
        title: "Erro no upload",
        description: message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoader(false);
    }
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    const file = files[0];
    if (file) {
      handleChange({ target: { name, value: file } });
      if (name === "cover") setCoverName(file.name);
      if (name === "pdf") setPdfName(file.name);
    }
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
        <Grid templateColumns="repeat(4, 1fr)" gap={4} mb={2} fontWeight="bold">
          <GridItem>Capa</GridItem>
          <GridItem>Título</GridItem>
          <GridItem>Autor</GridItem>

          <GridItem>Ações</GridItem>
        </Grid>
        {books.map((book) => (
          <Box key={book._id} bg="gray.100" p={3} borderRadius="md" mb={2}>
            <Grid templateColumns="repeat(4, 1fr)" gap={4} alignItems="center">
              <GridItem>
                <Image src={book.coverUrl} alt={book.title} boxSize="50px" />
              </GridItem>
              <GridItem>
                <Text>{book.title}</Text>
              </GridItem>
              <GridItem>
                <Text>{book.author}</Text>
              </GridItem>
              <GridItem>
                <ButtonGroup>
                  <Button colorScheme="blue" onClick={() => handleOpenUpdateModal(book)}>
                    <MdEdit />
                  </Button>
                  <Button colorScheme="red" onClick={onDeleteOpen}>
                    <MdDelete />
                  </Button>
                </ButtonGroup>
              </GridItem>
            </Grid>
          </Box>
        ))}
      </Box>

      {/* Modal de atualização do livro */}
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Atualizar Livro</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mb={4}>
              <FormLabel>Título</FormLabel>
              <Input
                ref={initialRef}
                name="title"
                value={selectedBook.title || ""}
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
              <FormLabel>Descrição</FormLabel>
              <Input
                name="description"
                value={selectedBook.description || ""}
                onChange={handleInputChange}
                placeholder="Descrição do livro"
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Capa</FormLabel>
              <Input
                type="file"
                accept="image/*"
                name="cover"
                ref={coverInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <Button onClick={() => coverInputRef.current.click()} leftIcon={<Icon as={HiUpload} />}>
                {coverName || "Selecionar Capa"}
              </Button>
              {error.cover && <FormErrorMessage>{error.cover}</FormErrorMessage>}
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Arquivo PDF</FormLabel>
              <Input
                type="file"
                accept="application/pdf"
                name="pdf"
                ref={pdfInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <Button onClick={() => pdfInputRef.current.click()} leftIcon={<Icon as={HiUpload} />}>
                {pdfName || "Selecionar PDF"}
              </Button>
              {error.pdf && <FormErrorMessage>{error.pdf}</FormErrorMessage>}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={() => handleUpdate(selectedBook._id)} mr={3}>
            {loader ? <Spinner size="sm"/> : "Salvar"}
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal de exclusão do livro */}
      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmar Exclusão</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Deseja realmente excluir o livro?</ModalBody>

          <ModalFooter>
            <Button colorScheme="red" onClick={() => handleDelete(selectedBook._id)} mr={3}>
              Confirmar
            </Button>
            <Button onClick={onDeleteClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default ManageBooks;
