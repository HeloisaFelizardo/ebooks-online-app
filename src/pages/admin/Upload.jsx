import { Box, Input, Button, Heading, Container, FormLabel, FormControl, useToast } from '@chakra-ui/react';
import { postBook } from "../../services/bookService.js";
import useForm from "../../hooks/useForm.js";
import {useAuth} from "../../hooks/useAuth.js";

const Upload = () => {
  const validationRules = {
    title: (value) => (!value ? 'Título é obrigatório' : ''),
    author: (value) => (!value ? 'Autor é obrigatório' : ''),
  };

  const { formData, error, validate, handleChange } = useForm(
    { title: '', author: '', cover: null, pdf: null },
    validationRules
  );

  const toast = useToast();
  const { token } = useAuth();

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    handleChange({ target: { name, value: files[0] } });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) return;

    const { title, author, cover, pdf } = formData;

    const formDataObj = new FormData();
    formDataObj.append('title', title);
    formDataObj.append('author', author);
    formDataObj.append('cover', cover);
    formDataObj.append('pdf', pdf);

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
      console.error("Erro ao fazer upload do livro:", e);

      toast({
        title: 'Erro no upload',
        description: 'Algo deu errado ao fazer upload do livro.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.xl" backgroundColor="white" p={10} boxShadow="xl">
      <Box as="form" onSubmit={handleSubmit}>
        <Heading as="h3" mb={6}>Upload de Livros PDF</Heading>

        <FormControl mb={4} isInvalid={error.title}>
          <FormLabel>Título:</FormLabel>
          <Input type="text" name="title" placeholder="Digite o título" onChange={handleChange} boxShadow="sm" />
        </FormControl>

        <FormControl mb={4} isInvalid={error.author}>
          <FormLabel>Autor:</FormLabel>
          <Input type="text" name="author" placeholder="Digite o nome do autor" onChange={handleChange} boxShadow="sm" />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Capa:</FormLabel>
          <Input type="file" accept="image/*" name="cover" boxShadow="sm" onChange={handleFileChange} />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Arquivo PDF:</FormLabel>
          <Input type="file" accept="application/pdf" name="pdf" boxShadow="sm" onChange={handleFileChange} />
        </FormControl>

        <Button colorScheme="teal" type="submit">Enviar</Button>
      </Box>
    </Container>
  );
};

export default Upload;