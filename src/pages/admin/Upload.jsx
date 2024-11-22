import {
  Box,
  Input,
  Button,
  Heading,
  Container,
  FormLabel,
  FormControl,
  useToast,
  FormErrorMessage,
  Spinner,
  Icon, Textarea
} from '@chakra-ui/react';
import {postBook} from "../../services/bookService.js";
import useForm from "../../hooks/useForm.js";
import {useAuth} from "../../hooks/useAuth.js";
import {useState, useRef} from "react";
import {HiUpload} from "react-icons/hi";
import LoadingButton from "../../components/LoadingButton.jsx";
import {useNavigate} from "react-router-dom";

const Upload = () => {
  const [loading, setLoading] = useState(false);
  const [coverName, setCoverName] = useState("");
  const [pdfName, setPdfName] = useState("");

  const coverInputRef = useRef();
  const pdfInputRef = useRef();

  const navigate = useNavigate();

  const validationRules = {
    title: (value) => (!value ? 'Título é obrigatório' : ''),
    author: (value) => (!value ? 'Autor é obrigatório' : ''),
    cover: (value) => (!value ? 'Capa do livro é obrigatória' : ''),
    description: (value) => (!value ? 'Descrição é obrigatória' : ''),
    pdf: (value) => (!value ? 'Livro PDF é obrigatório' : ''),
  };

  const {formData, error, validate, handleChange} = useForm(
    {title: '', author: '', description: '', cover: null, pdf: null},
    validationRules
  );

  const toast = useToast();
  const {token} = useAuth();

  const handleFileChange = (event) => {
    const {name, files} = event.target;
    const file = files[0];
    if (file) {
      handleChange({target: {name, value: file}});
      if (name === "cover") setCoverName(file.name);
      if (name === "pdf") setPdfName(file.name);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) return;

    const {title, author, description, cover, pdf} = formData;

    const formDataObj = new FormData();
    formDataObj.append('title', title);
    formDataObj.append('author', author);
    formDataObj.append('description', description);
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
      navigate('/downloads');

    } catch (e) {
      const message = e.response?.status === 400 && e.response.data.error === 'Livro já cadastrado.'
        ? 'Esse livro já foi cadastrado.'
        : e.response?.status === 403
          ? 'Você precisa estar logado para fazer upload de livros.'
          : 'Esse livro já foi cadastrado.';

      toast({
        title: 'Erro no upload',
        description: message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxW="container.xl" p={4}>
      <Box as="form" onSubmit={handleSubmit}>
        <Heading as="h1" my={6}> Adicionar Novo Livro </Heading>

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

        <FormControl mb={4} isInvalid={error.description}>
          <FormLabel>Descrição:</FormLabel>
          <Textarea type="text" name="description" placeholder="Digite a descrição do livro" onChange={handleChange}
                    boxShadow="sm"/>
          {error.description && <FormErrorMessage>{error.description}</FormErrorMessage>}
        </FormControl>

        <FormControl mb={4} isInvalid={error.cover}>
          <FormLabel>Capa:</FormLabel>
          <Input
            type="file"
            accept="image/*"
            name="cover"
            ref={coverInputRef}
            onChange={handleFileChange}
            style={{display: 'none'}}
          />
          <Button onClick={() => coverInputRef.current.click()} leftIcon={<Icon as={HiUpload}/>}>
            {coverName || 'Selecionar Capa'}
          </Button>
          {error.cover && <FormErrorMessage>{error.cover}</FormErrorMessage>}
        </FormControl>

        <FormControl mb={4} isInvalid={error.pdf}>
          <FormLabel>Arquivo PDF:</FormLabel>
          <Input
            type="file"
            accept="application/pdf"
            name="pdf"
            ref={pdfInputRef}
            onChange={handleFileChange}
            style={{display: 'none'}}
          />
          <Button onClick={() => pdfInputRef.current.click()} leftIcon={<Icon as={HiUpload}/>}>
            {pdfName || 'Selecionar PDF'}
          </Button>
          {error.pdf && <FormErrorMessage>{error.pdf}</FormErrorMessage>}
        </FormControl>

        <LoadingButton colorScheme="teal" type="submit" mt={4} isLoading={loading}>
          Enviar
        </LoadingButton>
      </Box>
    </Container>
  );
};

export default Upload;
