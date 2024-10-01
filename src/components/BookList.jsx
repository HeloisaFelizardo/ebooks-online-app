import {Container, Heading, SimpleGrid} from '@chakra-ui/react';
import BookCard from './BookCard';

const BookList = ({books}) => {
  const handleDownload = (pdfUrl) => {
    // Lógica para baixar o PDF
    window.open(pdfUrl, '_blank');
  };

  return (
    <Container maxW='container.xl' backgroundColor='white'>
      <Heading as="h3" p={6}>Livros Disponíveis para Download</Heading>
      <SimpleGrid columns={{sm: 2, md: 3}} spacing={4}>
        {books.map((book) => (
          <BookCard
            key={book.id}
            title={book.title}
            author={book.author}
            coverUrl={book.coverUrl}
            onDownload={() => handleDownload(book.pdfUrl)}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default BookList;
