import {Box, Button, Container, Flex, Heading, Image, Text, useColorModeValue} from "@chakra-ui/react";
import useDownload from "../hooks/useDownload.js";
import LoadingButton from "./LoadingButton.jsx";
import {useState} from "react";

export const Highlights = ({book}) => {
  const handleDownload = useDownload();
  const [isLoading, setIsLoading] = useState(false);

  if (!book) return null; // Certifique-se de que o livro existe antes de renderizar

  const handleDownloadClick = async () => {
    try {
      setIsLoading(true);
      await handleDownload(book._id, book.title); // Chama a função de download
    } catch (error) {
      console.error("Erro ao fazer o download:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box as="main" flexGrow={1}>
      <Container maxW="container.xl" py={8}>
        <Box bg={useColorModeValue('gray.100', 'gray.700')} p={8} borderRadius="lg" mb={12}>
          <Heading as="h2" size="xl" mb={4}>
            Destaque do Dia
          </Heading>
          <Flex direction={{base: 'column', md: 'row'}} align="center">
            <Image
              src={book.coverUrl}
              alt={`Capa do livro ${book.title}`}
              width="300px"
              height="400px"
              objectFit="cover"
              borderRadius="md"
              mr={{base: 0, md: 6}}
              mb={{base: 4, md: 0}}
            />
            <Box>
              <Heading as="h3" size="lg" mb={2}>
                {book.title}
              </Heading>
              <Text mb={4}>
                {book.description}
              </Text>
              <LoadingButton colorScheme="teal" onClick={handleDownloadClick} isLoading={isLoading}>
                Ler Agora
              </LoadingButton>
            </Box>
          </Flex>
        </Box>
      </Container>
    </Box>
  )
}