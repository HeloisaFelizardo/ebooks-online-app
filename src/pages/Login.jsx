import { Box, Button, Input, Heading, Link, Text, FormLabel, FormControl, FormErrorMessage } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ email: '', password: '' });

  const validate = () => {
    const newError = {};
    if (!email) {
      newError.email = 'Email é obrigatório';
    }
    if (!password) {
      newError.password = 'Senha é obrigatória';
    }
    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleLogin = () => {
    if (validate()) {
      // Suponha que o login seja bem-sucedido, então navega para a Home
      navigate('/');
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Box p={8} maxWidth="400px" borderWidth={1} borderRadius={8} boxShadow="lg" backgroundColor="blackAlpha.500">
        <Heading as="h2" mb={6} textAlign="center" color="white">Login</Heading>
        <FormControl isInvalid={error.email} mb={4} isRequired>
          <FormLabel color="white" fontWeight="thin">Email:</FormLabel>
          <Input
            placeholder="Usuário"
            value={email}
            color='white'
            onChange={(e) => setEmail(e.target.value)}
          />
          {error.email && <FormErrorMessage>{error.email}</FormErrorMessage>}
        </FormControl>
        <FormControl isInvalid={error.password} mb={4} isRequired>
          <FormLabel color="white" fontWeight="thin">Senha:</FormLabel>
          <Input
            type="password"
            placeholder="Senha"
            color='white'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error.password && <FormErrorMessage>{error.password}</FormErrorMessage>}
        </FormControl>
        <Button width="full" colorScheme="teal" onClick={handleLogin}>Entrar</Button>
        <Text mt={4} color="white">
          Não tem conta?{' '}
          <Link color="teal.200" onClick={() => navigate('/register')}>
            Crie uma conta
          </Link>
        </Text>
      </Box>
    </Box>
  );
};

export default Login;
