import { Box, Image, Text, Button } from '@chakra-ui/react';
import coverImage from '../assets/images/cover.jpg';

const BookCard = ({ title, author, coverUrl, onDownload }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} m={4}>
      <Image src={coverImage} alt={title} />
      <Text mt={2} fontWeight="bold">{title}</Text>
      <Text>{author}</Text>
      <Button mt={4} colorScheme="teal" onClick={onDownload}>
        Baixar PDF
      </Button>
    </Box>
  );
};

export default BookCard;
