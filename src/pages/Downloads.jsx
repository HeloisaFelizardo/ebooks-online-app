import { Box, Heading } from '@chakra-ui/react';
import BookList from '../components/BookList';

const books = [
  {
    id: 1,
    title: "A consciencia do atomo",
    author: "Alice Bailey",
    coverUrl: "./assets/images/cover.jpg",
    pdfUrl: "/path/to/book1.pdf"
  },
  {
    id: 2,
    title: "A consciencia do atomo",
    author: "Alice Bailey",
    coverUrl: "uploads/covers/1727566604488-java.jpg",
    pdfUrl: "/path/to/book1.pdf"
  },
  {
    id: 3,
    title: "A consciencia do atomo",
    author: "Alice Bailey",
    coverUrl: "uploads/covers/1727566604488-java.jpg",
    pdfUrl: "/path/to/book1.pdf"
  },
  {
    id: 4,
    title: "A consciencia do atomo",
    author: "Alice Bailey",
    coverUrl: "uploads/covers/1727566604488-java.jpg",
    pdfUrl: "/path/to/book1.pdf"
  },
  {
    id: 5,
    title: "A consciencia do atomo",
    author: "Alice Bailey",
    coverUrl: "uploads/covers/1727566604488-java.jpg",
    pdfUrl: "/path/to/book1.pdf"
  },
  {
    id: 6,
    title: "A consciencia do atomo",
    author: "Alice Bailey",
    coverUrl: "uploads/covers/1727566604488-java.jpg",
    pdfUrl: "/path/to/book1.pdf"
  },
  // Adicione mais livros conforme necessário
];

const Downloads = () => {
  return (
      <BookList books={books} />
  );
};

export default Downloads;
