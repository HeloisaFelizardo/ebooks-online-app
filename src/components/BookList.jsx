import {Container, Heading, SimpleGrid} from '@chakra-ui/react';
import BookCard from './BookCard';
import {downloadBook} from "../services/bookService.js";
import {useAuth} from "../hooks/useAuth.js";

const BookList = ({books}) => {
  const {token} = useAuth();

  const handleDownload = async (bookId) => {
    try {
      const blob = await downloadBook(bookId, token); //  Receba o Blob diretamente da função downloadBook
      console.log(blob);

      // Certifica-se de que o blob está no formato correto (application/pdf)
      const url = window.URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));

      // Exibe a URL gerada no console
      console.log('URL gerada:', url);

      // Cria um link temporário para o download
      const a = document.createElement('a');
      a.href = url;
      a.download = 'download.pdf';  // Nome do arquivo
      a.click();

      // Libera o URL após o uso
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error("Erro ao baixar o PDF:", error);
    }
  };

  return (
    <Container maxW='container.xl' backgroundColor='white' p={10}>
      <Heading as="h3" mb={6}>Livros Disponíveis para Download</Heading>
      <SimpleGrid columns={{sm: 2, md: 3}} spacing={4}>
        {books.map((book) => (
          <BookCard
            key={book._id}
            title={book.title}
            author={book.author}
            coverUrl={book.coverUrl}
            onDownload={() => handleDownload(book._id)}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default BookList;
