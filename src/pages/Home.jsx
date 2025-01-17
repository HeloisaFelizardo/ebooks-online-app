import {Box, Heading, Text, Button, Container} from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container maxW='container.xl'>
      <Box pt={100} display="flex" flexDirection='column' justifyContent="center" alignItems="left" height="80vh">
        <Heading as="h1"
                 color='white'
                 fontFamily='Poltawski Nowy'
                 textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)"
                 fontWeight='bold'
                 fontSize="96px"
                 mb={4}>
          Baixe Livros
        </Heading>
        <Text color='white'
              fontFamily='Poltawski Nowy'
              textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)"
              fontStyle='italic'
              fontSize="32px"
              mb={6}>
          Transforme seu tempo livre em uma aventura literária!
        </Text>
        <Button colorScheme="gray"
                variant='outline'
                boxShadow="xl"
                textShadow="2px 2px 4px rgba(0, 0, 0, 0.8)"
                color='white'
                borderRadius='50px'
                size="lg"
                width='200px'
                onClick={() => navigate('/downloads')}>
          Explore Agora
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
