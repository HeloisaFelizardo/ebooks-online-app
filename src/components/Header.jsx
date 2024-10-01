import {Box, Flex, Heading, Button, Container, Spacer, Link} from '@chakra-ui/react';
import {useNavigate} from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <Box bg="white" p={4} boxShadow="base" zIndex='1' position='relative'>
      <Flex justify="space-between" align="center">
        <Container maxW="container.xl">
          <Flex>
            <Heading as='h1' color="#BD0000" textShadow="2px 2px 4px rgba(0, 0, 0, 0.3)">
              Ebooks Online
            </Heading>
            <Spacer/>
            <Button colorScheme="teal" variant="outline" mr={4}
                    onClick={() => navigate('/')}
            >
              Início
            </Button>
            <Button colorScheme="teal" variant="outline" mr={4}
                    onClick={() => navigate('/downloads')}
            >
              Downloads
            </Button>
            <Button colorScheme="teal" variant="outline" mr={4}
                    onClick={() => navigate('/upload')}
            >
              Cadastro
            </Button>
            <Button colorScheme="teal" onClick={() => navigate('/login')}>Começe Agora</Button>
          </Flex>
        </Container>
      </Flex>
    </Box>
  );
};

export default Header;
