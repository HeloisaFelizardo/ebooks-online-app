import { Box, Button, Input, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Suponha que o login seja bem-sucedido, então navega para a Home
    navigate('/');
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Box p={8} maxWidth="400px" borderWidth={1} borderRadius={8} boxShadow="lg">
        <Heading as="h2" mb={6} textAlign="center">Login</Heading>
        <Input placeholder="Usuário" mb={4} />
        <Input placeholder="Senha" mb={4} type="password" />
        <Button width="full" colorScheme="teal" onClick={handleLogin}>Entrar</Button>
      </Box>
    </Box>
  );
};

export default Login;
