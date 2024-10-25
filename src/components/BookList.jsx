import {Container, Heading, SimpleGrid} from '@chakra-ui/react';
import BookCard from './BookCard';
import {downloadBook} from "../services/bookService.js";
import {useAuth} from "../hooks/useAuth.js";

const BookList = ({books}) => {
  const {token} = useAuth();

  const handleDownload = async (bookId, bookTitle) => {
    try {
      const blob = await downloadBook(bookId, token); //  Receba o Blob diretamente da função downloadBook
      console.log(blob);

      const url = window.URL.createObjectURL(blob); // Cria uma URL para o Blob

      // Abre o PDF em uma nova aba
      window.open(url, '_blank');

      // Se você também quiser baixar, descomente a parte abaixo
      const a = document.createElement('a');
      a.href = url;
      a.download = `${bookTitle}.pdf`; // Nome do arquivo para download
      a.click();

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
            coverUrl={book.coverUrl.data}
            onDownload={() => handleDownload(book._id,  book.title)}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default BookList;
