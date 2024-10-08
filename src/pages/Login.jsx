import { Box, Button, Input, Heading, Link, Text, FormLabel, FormControl, FormErrorMessage } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js'; // Importando o hook de autenticação

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Obtendo a função de login do contexto
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
    if (!validate()) return;

    // Simulação de login com dois usuários diferentes (admin e user)
    if (email === 'admin@admin.com' && password === 'admin') {
      login({ role: 'admin', email }); // Utilizando a função login do contexto
      navigate('/');
    } else if (email === 'user@user.com' && password === 'user') {
      login({ role: 'user', email }); // Utilizando a função login do contexto
      navigate('/');
    } else {
      setError({ email: '', password: '', general: 'Credenciais inválidas' });
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
        {error.general && <Text color="red.500" mb={4}>{error.general}</Text>}
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
