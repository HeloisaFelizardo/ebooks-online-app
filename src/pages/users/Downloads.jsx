// pages/Downloads.jsx
import BookList from '../../components/BookList.jsx';
import LoadingSpinner from "../../components/LoadingSpinner.jsx";
import { Box } from "@chakra-ui/react";
import { Highlights } from "../../components/Highlights.jsx";
import { Search } from "../../components/Search.jsx";
import useBooks from "../../hooks/useBooks.js";

const Downloads = () => {
  const { books, highlightBook, loading } = useBooks();

  if (loading) return <LoadingSpinner />;

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Search />
      <Highlights book={highlightBook} />
      <BookList books={books} />
    </Box>
  );
};

export default Downloads;
