import { Box, Input, Button, Heading } from '@chakra-ui/react';

const Upload = () => {
  const handleFileUpload = (event) => {
    // Lógica para upload do arquivo
  };

  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading as="h2" mb={6}>Upload de Arquivos PDF</Heading>
      <Input type="file" accept="application/pdf" onChange={handleFileUpload} mb={4} />
      <Button colorScheme="teal">Enviar</Button>
    </Box>
  );
};

export default Upload;
