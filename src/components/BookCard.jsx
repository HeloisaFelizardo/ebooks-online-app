import {Box, Image, Text, Button} from '@chakra-ui/react';

const BookCard = ({title, author, coverUrl, onDownload}) => {
  return (
    <Box backgroundColor='white' borderRadius="lg" boxShadow="sm" overflow="hidden" p={4} >
      <Image
        src={coverUrl}
        alt={title}
        boxSize="200px"
        objectFit="cover"
        borderRadius="md"
      />
      <Text mt={2} fontWeight="bold">{title}</Text>
      <Text>{author}</Text>
      <Button mt={4} colorScheme="teal" onClick={onDownload}>
        Ler Agora
      </Button>
    </Box>
  );
};

export default BookCard;
