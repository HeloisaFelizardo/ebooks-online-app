import {
  Box,
  Button,
  Input,
  Heading,
  Link,
  Text,
  FormLabel,
  FormControl,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import useForm from "../hooks/useForm.js";
import { registerUser } from "../services/userService.js";

const Register = () => {
  // Define as regras de validação aqui
  const validationRules = {
    name: (value) => (!value ? 'Nome é obrigatório' : ''),
    email: (value) => (!value ? 'Email é obrigatório' : ''),
    password: (value) => (!value ? 'Senha é obrigatória' : ''),
  };

  // Passa `validationRules` como argumento para `useForm`
  const { formData, error, validate, handleChange } = useForm(
    { name: '', email: '', password: '' },
    validationRules
  );

  const navigate = useNavigate();
  const toast = useToast();

  const handleRegister = async () => {
    if (validate()) {
      try {
        await registerUser(formData);
        toast({
          title: 'Sucesso!',
          description: 'Usuário registrado com sucesso.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        navigate('/login');
      } catch (error) {
        if (error.response && error.response.status === 400) {
          toast({
            title: 'Erro no registro',
            description: error.response.data.error,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        } else {
          toast({
            title: 'Erro inesperado',
            description: 'Algo deu errado ao registrar o usuário.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
      }
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" className='home-background'>
      <Box p={8} maxWidth="400px" borderWidth={1} borderRadius={8} boxShadow="lg" backgroundColor="blackAlpha.500">
        <Heading as="h2" mb={6} textAlign="center" color="white">Registro</Heading>
        <FormControl isInvalid={error.name} mb={4}>
          <FormLabel color="white" fontWeight="thin">Nome:</FormLabel>
          <Input
            name="name"
            placeholder="Nome"
            color="white"
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
            color="white"
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
            color="white"
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
