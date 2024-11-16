import {
  Box,
  Image,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Flex, Heading
} from '@chakra-ui/react';

const BookCard = ({ title, author, coverUrl, description, onDownload }) => {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Hook para controlar a abertura/fechamento do modal

  return (
    <Box backgroundColor="white" borderRadius="lg" boxShadow="sm" overflow="hidden" p={4}>
      <Image
        src={coverUrl}
        alt={title}
        boxSize="200px"
        objectFit="cover"
        borderRadius="md"
      />
      <Text mt={2} fontWeight="bold">{title}</Text>
      <Text>{author.slice(0, 25)}</Text>
      <Button mt={4} colorScheme="teal" onClick={onOpen}>Ler Mais</Button> {/* Abre o modal ao clicar */}

      {/* Modal com os detalhes do livro */}
      <Modal isOpen={isOpen} size={"full"} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction={{ base: 'column', md: 'row' }} align="top">
              <Image
                src={coverUrl}
                alt={title}
                width="300px"
                height="400px"
                objectFit="cover"
                borderRadius="md"
                mb={{ base: 4, md: 0 }}
                mr={{ base: 0, md: 6 }}
              />
              <Box>
                <Heading as="h3" size="lg" mb={2}>
                  {title}
                </Heading>
                <Text><strong>Autor:</strong> {author}</Text>
                <Text mt={2}><strong>Descrição:</strong> {description}</Text>
              </Box>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal"  onClick={onDownload}>Ler Agora</Button>
            <Button variant="ghost" onClick={onClose} ml={3}>Fechar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default BookCard;
