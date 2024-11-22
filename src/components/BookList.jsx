import {Container, Grid, Heading, VStack} from '@chakra-ui/react';
import BookCard from './BookCard';
import useDownload from "../hooks/useDownload.js";
import {useState} from "react";

const BookList = ({books}) => {
  const handleDownload = useDownload();

  const [loadingBooks, setLoadingBooks] = useState({}); // Objeto para controlar o estado de carregamento

  const handleDownloadWithLoader = async (bookId, fileName) => {
    setLoadingBooks((prev) => ({...prev, [bookId]: true})); // Ativa o loader do livro
    await handleDownload(bookId, fileName);
    setLoadingBooks((prev) => ({...prev, [bookId]: false})); // Desativa o loader do livro
  };

  return (
    <Container maxW='container.xl' mb={10}>
      <Heading as="h3">Ebooks</Heading>
      <Grid templateColumns={{base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)', lg: 'repeat(6, 1fr)'}} gap={6} my={5}>
        {books.map((book) => (
          <VStack key={book._id} align="center">
            <BookCard
              title={book.title}
              author={book.author}
              coverUrl={book.coverUrl}
              description={book.description}
              onDownload={() => handleDownloadWithLoader(book._id, `${book.title}.pdf`)}
              isLoading={loadingBooks[book._id] || false} // Passa o estado do carregamento
            />
          </VStack>
        ))}
      </Grid>
    </Container>
  );
};

export default BookList;
