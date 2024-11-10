import {Container, Grid, Heading, VStack} from '@chakra-ui/react';
import BookCard from './BookCard';
import useDownload from "../hooks/useDownload.js";

const BookList = ({books}) => {
  const handleDownload = useDownload();

  return (
    <Container maxW='container.xl' mb={10}>
      <Heading as="h3">Ebooks</Heading>
      <Grid templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)', lg: 'repeat(6, 1fr)' }} gap={6} my={5}>
        {books.map((book) => (
          <VStack key={book._id} align="center">
            <BookCard
              title={book.title}
              author={book.author}
              coverUrl={book.coverUrl}
              onDownload={() => handleDownload(book._id, `${book.title}.pdf`)}
            />
          </VStack>
        ))}
      </Grid>
    </Container>
  );
};

export default BookList;
