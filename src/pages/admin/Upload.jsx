import { Box, Input, Button, Heading, Container, FormLabel, FormControl } from '@chakra-ui/react';

const Upload = () => {
  const handleFileUpload = (event) => {
    // Lógica para upload do arquivo
    const file = event.target.files[0];
    console.log(file); // Exibe o arquivo no console para fins de teste
  };

  return (
    <Container maxW="container.xl" backgroundColor="white" p={10} boxShadow="xl">
      <Box >
        <Heading as="h3" mb={6}>Upload de Livros PDF</Heading>

        <FormControl mb={4}>
          <FormLabel>Capa:</FormLabel>
          <Input type="file" accept="image/*" boxShadow="sm" onChange={handleFileUpload} />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Título:</FormLabel>
          <Input type="text" name="title" placeholder="Digite o título" boxShadow="sm" />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Autor:</FormLabel>
          <Input type="text" name="author" placeholder="Digite o nome do autor" boxShadow="sm" />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Arquivo PDF:</FormLabel>
          <Input type="file" accept="application/pdf" onChange={handleFileUpload} boxShadow="sm"/>
        </FormControl>

        <Button colorScheme="teal" type="submit">Enviar</Button>
      </Box>
    </Container>
  );
};

export default Upload;
