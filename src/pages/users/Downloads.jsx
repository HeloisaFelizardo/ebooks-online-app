import BookList from '../../components/BookList.jsx';
import {useEffect, useState} from "react";
import {getBooks} from "../../services/bookService.js";
import {Flex, Spinner} from "@chakra-ui/react";

const Downloads = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBooks = async () => {
    try {
      const booksData = await getBooks();
      setBooks(booksData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  if (loading) {
    return <Flex justify="center" align="center" height='50vh'>
      <Spinner size="xl"/>
    </Flex>
  }

  return (
    <BookList books={books}/>
  );
};

export default Downloads;
