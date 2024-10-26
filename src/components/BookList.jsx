import {Container, Heading, SimpleGrid} from '@chakra-ui/react';
import BookCard from './BookCard';
import {downloadBook} from "../services/bookService.js";
import {useAuth} from "../hooks/useAuth.js";
import {useEffect, useState} from "react";

const BookList = ({books}) => {
  const {token} = useAuth();
  const [covers, setCovers] = useState({});

  const handleDownload = async (bookId, bookTitle) => {
    try {
      const blob = await downloadBook(bookId, token); //  Receba o Blob diretamente da função downloadBook

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

  // Função para converter o buffer em uma URL base64
  const getBase64ImageUrl = (buffer) => {
    console.log("Buffer received:", buffer); // Confirme que o buffer é recebido corretamente
    if (buffer && buffer.type === 'Buffer' && Array.isArray(buffer.data) && buffer.data.length) {
      const byteArray = new Uint8Array(buffer.data);
      console.log("Buffer data:", buffer.data);  // Log da string base64
      const base64String = btoa(String.fromCharCode(...byteArray)); // Converte para base64
      return `data:image/jpeg;base64,${base64String}`;
    }
    console.error("Buffer vazio ou inválido:", buffer);
    return null;
  };

  useEffect(() => {
    const newCovers = {};
    books.forEach((book) => {
      if (book.coverUrl) {
        const coverUrl = getBase64ImageUrl(book.coverUrl);
        console.log(`Cover URL for ${book.title}:`, coverUrl); // Verifique a URL da capa
        if (coverUrl) {
          newCovers[book._id] = coverUrl;
        }
      }
    });
    console.log("New covers object:", newCovers); // Verifique o objeto de capas
    setCovers(newCovers);
  }, [books]);


  return (
    <Container maxW='container.xl' backgroundColor='white' p={10}>
      <Heading as="h3" mb={6}>Livros Disponíveis para Download</Heading>
      <SimpleGrid columns={{sm: 2, md: 3}} spacing={4}>
        {books.map((book) =>{
          return(
            <BookCard
              key={book._id}
              title={book.title}
              author={book.author}
              coverUrl={covers[book._id]}
              onDownload={() => handleDownload(book._id,  book.title)}
            />
          )
        })}
      </SimpleGrid>
    </Container>
  );
};

export default BookList;
