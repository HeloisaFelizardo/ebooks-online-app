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
  useDisclosure, Spinner
} from "@chakra-ui/react";
import {useEffect, useRef, useState} from "react";
import {deleteBook, updateBook} from "../../services/bookService.js";
import useForm from "../../hooks/useForm.js";
import {useAuth} from "../../hooks/useAuth.js";
import {HiUpload} from "react-icons/hi";
import useBooks from "../../hooks/useBooks.js";
import {MdDelete, MdEdit} from "react-icons/md";
import LoadingSpinner from "../../components/LoadingSpinner.jsx";

export const ManageBooks = () => {
  const {books, loading} = useBooks(); // Supondo que você tenha hook para buscar livros
  const initialRef = useRef(null);
  const {isOpen, onOpen, onClose} = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const [selectedBook, setSelectedBook] = useState({});
  const [coverName, setCoverName] = useState("");
  const [pdfName, setPdfName] = useState("");
  const [loader, setLoader] = useState(false);
  const toast = useToast();
  const {token} = useAuth();
  const {loadBooks} = useBooks();

  const coverInputRef = useRef();
  const pdfInputRef = useRef();

  // Validações dos campos
  const validationRules = {
    title: (value) => (!value ? 'Título é obrigatório' : ''),
    author: (value) => (!value ? 'Autor é obrigatório' : ''),
    description: (value) => (!value ? 'Descrição é obrigatória' : ''),
  };

  // Inicialização do formulário
  const {formData, setFormData, error, validate, handleChange} = useForm(
    {title: '', author: '', description: '', cover: null, pdf: null},
    validationRules
  );

  const handleOpenUpdateModal = (book) => {
    setSelectedBook(book);
    setFormData({
      title: book.title || "",
      author: book.author || "",
      description: book.description || "",
      cover: null, // Deixe o campo de capa e pdf em null inicialmente
      pdf: null,
    });
    setCoverName(book.cover ? book.cover.split('/').pop() : "Selecionar Capa");
    setPdfName(book.pdf ? book.pdf.split('/').pop() : "Selecionar PDF");
    onOpen();
  };

  const handleFileChange = (event) => {
    const {name, files} = event.target;
    const file = files[0];
    if (file) {
      handleChange({target: {name, value: file}});
      if (name === "cover") setCoverName(file.name);
      if (name === "pdf") setPdfName(file.name);
    }
  };

  const handleUpdate = async (id) => {
    if (!validate()) return;

    const {title, author, description, cover, pdf} = formData;

    const formDataObj = new FormData();
    formDataObj.append("title", title);
    formDataObj.append("author", author);
    formDataObj.append("description", description);

    if (cover) formDataObj.append("cover", cover);
    if (pdf) formDataObj.append("pdf", pdf);

    setLoader(true);
    try {
      const response = await updateBook(id, formDataObj, token);
      // Atualize o título no estado local
      await loadBooks();
      setSelectedBook((prevBook) => ({...prevBook, title: formData.title}));
      console.log("Livro atualizado com sucesso:", response);
      toast({
        title: "Sucesso!",
        description: "Livro atualizado com sucesso.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch (e) {
      const message = e.response?.status === 400 && e.response.data.error === "Livro já cadastrado."
        ? "Esse livro já foi cadastrado."
        : e.response?.status === 403
          ? "Você precisa estar logado para atualizar livros."
          : "Algo deu errado ao tentar atualizar o livro.";

      toast({
        title: "Erro na atualização",
        description: message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoader(false);
    }
  };

  /*useEffect(() => {
    loadBooks;
  }, []);*/

  const handleDelete = async (id) => {
    console.log(`Deletar livro com ID ${id}`);
    try {
      const response = await deleteBook(id, token);
      console.log("Livro deletado com sucesso:", response);
    } catch (e) {
      console.error("Erro ao deletar livro:", e);
      toast({
        title: "Erro ao deletar livro",
        description: "Algo deu errado ao tentar deletar o livro.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
        onDeleteClose();
        await loadBooks();
    }
  };

  if (loading) return <LoadingSpinner/>;

  return (
    <Container maxW="container.lg" p={4}>
      <Heading as="h1" size="lg" mb={6}>
        Gerenciar Livros
      </Heading>

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
              <Image src={book.coverUrl} alt={book.title} boxSize="50px"/>
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
                  <MdEdit/>
                </Button>
                <Button colorScheme="red" onClick={onDeleteOpen}>
                  <MdDelete/>
                </Button>
              </ButtonGroup>
            </GridItem>
          </Grid>
        </Box>
      ))}

      {/*Modal para edição do livro*/}
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>Editar Livro</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
            <FormControl mb={4} isInvalid={error.title}>
              <FormLabel>Título:</FormLabel>
              <Input
                type="text"
                name="title"
                placeholder="Título do Livro"
                value={formData.title}
                onChange={handleChange}
              />
              {error.title && <FormErrorMessage>{error.title}</FormErrorMessage>}
            </FormControl>

            <FormControl mb={4} isInvalid={error.author}>
              <FormLabel>Autor:</FormLabel>
              <Input
                type="text"
                name="author"
                placeholder="Autor do Livro"
                value={formData.author}
                onChange={handleChange}
              />
              {error.author && <FormErrorMessage>{error.author}</FormErrorMessage>}
            </FormControl>

            <FormControl mb={4} isInvalid={error.description}>
              <FormLabel>Descrição:</FormLabel>
              <Input
                type="text"
                name="description"
                placeholder="Descrição do Livro"
                value={formData.description}
                onChange={handleChange}
              />
              {error.description && <FormErrorMessage>{error.description}</FormErrorMessage>}
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Capa:</FormLabel>
              <Button onClick={() => coverInputRef.current.click()} leftIcon={<Icon as={HiUpload}/>}>
                {coverName || "Selecionar Capa"}
              </Button>
              <Input
                type="file"
                accept="image/*"
                name="cover"
                ref={coverInputRef}
                onChange={handleFileChange}
                style={{display: "none"}}
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>PDF:</FormLabel>
              <Button onClick={() => pdfInputRef.current.click()} leftIcon={<Icon as={HiUpload}/>}>
                {pdfName || "Selecionar PDF"}
              </Button>
              <Input
                type="file"
                accept="application/pdf"
                name="pdf"
                ref={pdfInputRef}
                onChange={handleFileChange}
                style={{display: "none"}}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>Cancelar</Button>
            <Button colorScheme="blue" onClick={() => handleUpdate(selectedBook._id)} isLoading={loader}>
              {loading ? <Spinner size="sm"/> : "Salvar"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>


      {/*Modal dialog delete*/}
      <Modal closeOnOverlayClick={false} isOpen={isDeleteOpen} onClose={onDeleteClose}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>Confirmar Exclusão</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>Deseja realmente excluir o livro?</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={() => handleDelete(selectedBook._id)} mr={3}>
              {loading ? <Spinner size="sm"/> : "Confirmar"}
            </Button>
            <Button onClick={onDeleteClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};
