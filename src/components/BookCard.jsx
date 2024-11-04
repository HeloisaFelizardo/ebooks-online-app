import { Box, Image, Text, Button } from '@chakra-ui/react';

const BookCard = ({ title, author, coverUrl, onDownload }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" boxShadow="md" overflow="hidden" p={4} m={4}>
      <Image src={coverUrl} alt={title} />
      <Text mt={2} fontWeight="bold">{title}</Text>
      <Text>{author}</Text>
      <Button mt={4} colorScheme="teal" onClick={onDownload}>
        Baixar PDF
      </Button>
    </Box>
  );
};

export default BookCard;
