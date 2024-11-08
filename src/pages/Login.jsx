import {Box, Button, Input, Heading, Link, Text, FormLabel, FormControl, FormErrorMessage, Spinner} from '@chakra-ui/react';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../hooks/useAuth.js';

const Login = () => {
  const navigate = useNavigate();
  const {login} = useAuth();
  const [credentials, setCredentials] = useState({email: '', password: ''});
  const [error, setError] = useState({email: '', password: '', general: ''});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setCredentials(prev => ({...prev, [name]: value}));
  };

  const validate = () => {
    const newError = {};
    if (!credentials.email) newError.email = 'Email é obrigatório';
    if (!credentials.password) newError.password = 'Senha é obrigatória';
    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      await login(credentials);
      navigate('/downloads');
    } catch (err) {
      setError({...err, general: 'Falha no login. Verifique suas credenciais.'});
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" className='home-background'>
      <Box p={8} maxWidth="400px" borderWidth={1} borderRadius={8} boxShadow="lg" backgroundColor="blackAlpha.500">
        <Heading as="h2" mb={6} textAlign="center" color="white">Login</Heading>
        <FormControl isInvalid={error.email} mb={4} isRequired>
          <FormLabel color="white" fontWeight="thin" htmlFor="email">Email:</FormLabel>
          <Input
            itemID='email'
            id="email"
            name="email"
            placeholder="Usuário"
            color='white'
            value={credentials.email}
            onChange={handleChange}
            autoComplete="email"
            autoFocus
          />
          {error.email && <FormErrorMessage>{error.email}</FormErrorMessage>}
        </FormControl>
        <FormControl isInvalid={error.password} mb={4} isRequired>
          <FormLabel color="white" fontWeight="thin" htmlFor="password">Senha:</FormLabel>
          <Input
            itemID='password'
            id='password'
            name="password"
            type="password"
            placeholder="Senha"
            color='white'
            value={credentials.password}
            onChange={handleChange}
            autoComplete="current-password"
          />
          {error.password && <FormErrorMessage>{error.password}</FormErrorMessage>}
        </FormControl>
        {error.general && <Text color="red.500" mb={4}>{error.general}</Text>}
        <Button width="full" colorScheme="teal" onClick={handleLogin} isLoading={loading}>
          {loading ? <Spinner size="sm" /> : 'Entrar'}
        </Button>
        <Text mt={4} color="white">
          Não tem conta?{' '}
          <Link color="teal.200" onClick={() => navigate('/register')}>Crie uma conta</Link>
        </Text>
      </Box>
    </Box>
  );
};

export default Login;
