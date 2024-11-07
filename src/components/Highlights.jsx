import {Box, Button, Container, Flex, Heading, Image, Text, useColorModeValue} from "@chakra-ui/react";

export const Highlights = () => {
  return(
    <Box as="main" flexGrow={1} >
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
              <Button colorScheme="teal">Ler Agora</Button>
            </Box>
          </Flex>
        </Box>
      </Container>
    </Box>
  )
}