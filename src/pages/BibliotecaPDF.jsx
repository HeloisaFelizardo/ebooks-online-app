import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Image,
  Input,
  Link,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import {FaBook} from "react-icons/fa";

export default function BibliotecaPDF() {
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const headerBgColor = useColorModeValue('blue.500', 'blue.200')
  const headerColor = useColorModeValue('white', 'gray.800')

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Box as="header" bg={headerBgColor} color={headerColor} py={4}>
        <Container maxW="container.xl">
          <Flex justify="space-between" align="center">
            <Flex align="center">
              <FaBook  boxSize={6} mr={2} />
              <Heading as="h1" size="lg">
                BibliotecaPDF
              </Heading>
            </Flex>
            <Flex display={{ base: 'none', md: 'flex' }} align="center">
              <Link mr={4} href="#">
                Início
              </Link>
              <Link mr={4} href="#">
                Categorias
              </Link>
              <Link mr={4} href="#">
                Sobre
              </Link>
            </Flex>
            <Flex align="center">
              <Box display={{ base: 'none', md: 'block' }} mr={4}>
                <Input placeholder="Buscar livros..." size="sm" />
              </Box>
              <Button
                leftIcon={<SearchIcon />}
                variant="ghost"
                size="sm"
                display={{ base: 'none', md: 'flex' }}
              >
                Buscar
              </Button>
              <Button leftIcon={<SearchIcon />} variant="ghost" size="sm">
                Perfil
              </Button>
            </Flex>
          </Flex>
        </Container>
      </Box>

      <Box as="main" flexGrow={1} bg={bgColor}>
        <Container maxW="container.xl" py={8}>
          <Box bg={useColorModeValue('gray.100', 'gray.700')} p={8} borderRadius="lg" mb={12}>
            <Heading as="h2" size="xl" mb={4}>
              Destaque da Semana
            </Heading>
            <Flex direction={{ base: 'column', md: 'row' }} align="center">
              <Image
                src="/placeholder.svg?height=300&width=200"
                alt="Capa do livro em destaque"
                boxSize="300px"
                objectFit="cover"
                borderRadius="md"
                mr={{ base: 0, md: 6 }}
                mb={{ base: 4, md: 0 }}
              />
              <Box>
                <Heading as="h3" size="lg" mb={2}>
                  O Grande Gatsby
                </Heading>
                <Text mb={4}>
                  F. Scott Fitzgerald nos leva a uma jornada pela alta sociedade americana dos anos 1920.
                </Text>
                <Button colorScheme="blue">Ler Agora</Button>
              </Box>
            </Flex>
          </Box>

          <Box>
            <Heading as="h2" size="xl" mb={6}>
              Biblioteca
            </Heading>
            <Grid templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)', lg: 'repeat(6, 1fr)' }} gap={6}>
              {[...Array(12)].map((_, i) => (
                <VStack key={i} align="center">
                  <Image
                    src={`/placeholder.svg?height=240&width=160&text=Livro ${i + 1}`}
                    alt={`Capa do Livro ${i + 1}`}
                    boxSize="200px"
                    objectFit="cover"
                    borderRadius="md"
                  />
                  <Text fontWeight="semibold" textAlign="center">
                    Título do Livro {i + 1}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    Autor {i + 1}
                  </Text>
                </VStack>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>

      <Box as="footer" bg={useColorModeValue('gray.100', 'gray.700')} mt={12}>
        <Container maxW="container.xl" py={6}>
          <Text textAlign="center" color="gray.500">
            &copy; 2024 BibliotecaPDF. Todos os direitos reservados.
          </Text>
        </Container>
      </Box>
    </Box>
  )
}