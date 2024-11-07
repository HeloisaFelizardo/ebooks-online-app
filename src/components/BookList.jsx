import {Container, Heading, SimpleGrid} from '@chakra-ui/react';
import BookCard from './BookCard';
import {downloadBook} from "../services/bookService.js";
import {useAuth} from "../hooks/useAuth.js";
import {useNavigate} from "react-router-dom";

const BookList = ({books}) => {
  const {token} = useAuth();
  const navigate = useNavigate();

  const handleDownload = async (bookId, bookTitle) => {
    if (!token) {
      // Redireciona para a tela de login se o usuário não estiver autenticado
      navigate('/login');
      return;
    }

    try {
      const blob = await downloadBook(bookId, token); //  Receba o Blob diretamente da função downloadBook

      const url = window.URL.createObjectURL(blob); // Cria uma URL para o Blob

      // Abre o PDF em uma nova aba
      window.open(url, '_blank');

      // Baixar o pdf
      const a = document.createElement('a');
      a.href = url;
      a.download = `${bookTitle}.pdf`; // Nome do arquivo para download
      a.click();

    } catch (error) {
      console.error("Erro ao baixar o PDF:", error);
    }
  };

  return (
    <Container maxW='container.xl' backgroundColor={'none'} p={10}>
      <Heading as="h3" mb={6}>Ebooks</Heading>
      <SimpleGrid columns={{sm: 2, md: 3}} spacing={4}>
        {books.map((book) =>{
          return(
            <BookCard
              key={book._id}
              title={book.title}
              author={book.author}
              coverUrl={book.coverUrl}
              onDownload={() => handleDownload(book._id,  book.title)}
            />
          )
        })}
      </SimpleGrid>
    </Container>
  );
};

export default BookList;
