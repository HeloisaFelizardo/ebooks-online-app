import {
  Box,
  Input,
  Button,
  Heading,
  Container,
  FormLabel,
  FormControl,
  useToast,
  FormErrorMessage, Spinner
} from '@chakra-ui/react';
import {postBook} from "../../services/bookService.js";
import useForm from "../../hooks/useForm.js";
import {useAuth} from "../../hooks/useAuth.js";
import {useState} from "react";

const Upload = () => {
  const [loading, setLoading] = useState(false);

  const validationRules = {
    title: (value) => (!value ? 'Título é obrigatório' : ''),
    author: (value) => (!value ? 'Autor é obrigatório' : ''),
    cover: (value) => (!value ? 'Capa do livro é obrigatório' : ''),
    pdf: (value) => (!value ? 'Livro PDF é obrigatório' : ''),
  };

  const {formData, error, validate, handleChange} = useForm(
    {title: '', author: '', cover: null, pdf: null},
    validationRules
  );

  const toast = useToast();
  const {token} = useAuth();

  const handleFileChange = (event) => {
    const {name, files} = event.target;
    handleChange({target: {name, value: files[0]}});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) return;

    const {title, author, cover, pdf} = formData;

    const formDataObj = new FormData();
    formDataObj.append('title', title);
    formDataObj.append('author', author);
    formDataObj.append('cover', cover);
    formDataObj.append('pdf', pdf);

    setLoading(true);

    try {
      const response = await postBook(formDataObj, token);
      console.log("Livro enviado com sucesso:", response);

      toast({
        title: 'Sucesso!',
        description: 'Livro registrado com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (e) {
      if (e.response && e.response.status === 400 && e.response.data.error === 'Livro já cadastrado.') {
        toast({
          title: 'Erro no upload',
          description: 'Esse livro já foi cadastrado.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } else {
        console.error("Erro ao fazer upload do livro:", e);

        toast({
          title: 'Erro no upload',
          description: 'Algo deu errado ao fazer upload do livro.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxW="container.xl" p={10}>
      <Box as="form" onSubmit={handleSubmit}>
        <Heading as="h3" mb={6}>Upload de Livros PDF</Heading>

        <FormControl mb={4} isInvalid={error.title}>
          <FormLabel>Título:</FormLabel>
          <Input type="text" name="title" placeholder="Digite o título" onChange={handleChange} boxShadow="sm"/>
          {error.title && <FormErrorMessage>{error.title}</FormErrorMessage>}
        </FormControl>

        <FormControl mb={4} isInvalid={error.author}>
          <FormLabel>Autor:</FormLabel>
          <Input type="text" name="author" placeholder="Digite o nome do autor" onChange={handleChange} boxShadow="sm"/>
          {error.author && <FormErrorMessage>{error.author}</FormErrorMessage>}
        </FormControl>

        <FormControl mb={4} isInvalid={error.cover}>
          <FormLabel>Capa:</FormLabel>
          <Input type="file" accept="image/*" name="cover" boxShadow="sm" onChange={handleFileChange}/>
          {error.cover && <FormErrorMessage>{error.cover}</FormErrorMessage>}
        </FormControl>

        <FormControl mb={4} isInvalid={error.pdf}>
          <FormLabel>Arquivo PDF:</FormLabel>
          <Input type="file" accept="application/pdf" name="pdf" boxShadow="sm" onChange={handleFileChange}/>
          {error.pdf && <FormErrorMessage>{error.pdf}</FormErrorMessage>}
        </FormControl>

        <Button colorScheme="teal" type="submit">
          {loading ? <Spinner size="sm"/> : "Enviar"}
        </Button>
      </Box>
    </Container>
  );
};

export default Upload;