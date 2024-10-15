import {Container, Heading, SimpleGrid} from '@chakra-ui/react';
import BookCard from './BookCard';
import {useEffect, useState} from "react";
import api from "../services/api.js";

const BookList = ({books}) => {

  const [ setEbooks] = useState([]);  // Estado para armazenar os ebooks
  const [loading, setLoading] = useState(true);  // Estado para controlar o carregamento
  const [error, setError] = useState(null);  // Estado para controlar os erros

  useEffect(() => {
    // Função assíncrona para buscar os dados da API
    const fetchEbooks = async () => {
      try {
        const response = await api.get('/books'); // Requisição GET
        setEbooks(response.data); // Armazena os dados recebidos no estado
      } catch (error) {
        setError(error.message); // Armazena a mensagem de erro
      } finally {
        setLoading(false); // Define o carregamento como falso após a requisição
      }
    };

    fetchEbooks();
  }, []);

  const handleDownload = (pdfUrl) => {
    // Lógica para baixar o PDF
    window.open(pdfUrl, '_blank');
  };

  return (
    <Container maxW='container.xl' backgroundColor='white' p={10}>
      <Heading as="h3" mb={6}>Livros Disponíveis para Download</Heading>
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
