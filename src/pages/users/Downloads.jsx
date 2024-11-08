import BookList from '../../components/BookList.jsx';
import {useEffect, useState} from "react";
import {getBooks} from "../../services/bookService.js";
import LoadingSpinner from "../../components/LoadingSpinner.jsx";
import {Box} from "@chakra-ui/react";
import {Highlights} from "../../components/Highlights.jsx";
import {Search} from "../../components/Search.jsx";

const Downloads = () => {
  const [books, setBooks] = useState([]);
  const [highlightBook, setHighlightBook] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadBooks = async () => {
    try {
      const booksData = await getBooks();
      setBooks(booksData);

      // Selecionar um livro aleatório para destaque
      const randomIndex = Math.floor(Math.random() * booksData.length);
      setHighlightBook(booksData[randomIndex]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  if (loading) return <LoadingSpinner/>;

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Search />
      <Highlights book={highlightBook} />
      <BookList books={books}/>
    </Box>
  );
};

export default Downloads;
