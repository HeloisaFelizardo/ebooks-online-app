import {Box, Button, Input, Heading, Link, Text, FormLabel, FormControl, FormErrorMessage} from '@chakra-ui/react';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {registerUser} from "../services/userService.js";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState({});

  const validate = () => {
    const newError = {};
    if (!formData.name) newError.name = 'Nome é obrigatório';
    if (!formData.email) newError.email = 'Email é obrigatório';
    if (!formData.password) newError.password = 'Senha é obrigatória';
    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async () => {
    if (validate()) {

      // requisição para registrar o usuário
      try {
        await registerUser(formData);
        console.log('Dados do novo usuário:', formData);
        // Suponha que o registro seja bem-sucedido, então navega para o login
        navigate('/login');

      } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        setError({...error, general: 'Erro ao registrar usuário. Verifique os dados e tente novamente.'});
      }
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Box p={8} maxWidth="400px" borderWidth={1} borderRadius={8} boxShadow="lg" backgroundColor="blackAlpha.500">
        <Heading as="h2" mb={6} textAlign="center" color="white">Registro</Heading>
        <FormControl isInvalid={error.name} mb={4}>
          <FormLabel color="white" fontWeight="thin">Nome:</FormLabel>
          <Input
            name="name"
            placeholder="Nome"
            color='white'
            value={formData.name}
            onChange={handleChange}
          />
          {error.name && <FormErrorMessage>{error.name}</FormErrorMessage>}
        </FormControl>
        <FormControl isInvalid={error.email} mb={4}>
          <FormLabel color="white" fontWeight="thin">Email:</FormLabel>
          <Input
            name="email"
            placeholder="Email"
            color='white'
            value={formData.email}
            onChange={handleChange}
          />
          {error.email && <FormErrorMessage>{error.email}</FormErrorMessage>}
        </FormControl>
        <FormControl isInvalid={error.password} mb={4}>
          <FormLabel color="white" fontWeight="thin">Senha:</FormLabel>
          <Input
            name="password"
            type="password"
            placeholder="Senha"
            color='white'
            value={formData.password}
            onChange={handleChange}
          />
          {error.password && <FormErrorMessage>{error.password}</FormErrorMessage>}
        </FormControl>
        <Button width="full" colorScheme="teal" onClick={handleRegister}>Registrar</Button>
        <Text mt={4} color="white">
          Já tem conta?{' '}
          <Link color="teal.200" onClick={() => navigate('/login')}>
            Faça login
          </Link>
        </Text>
      </Box>
    </Box>
  );
};

export default Register;
