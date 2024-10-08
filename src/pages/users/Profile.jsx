import { Box, Button, Input, Heading, Link, Text, FormLabel, FormControl, FormErrorMessage } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState({});

  useEffect(() => {
    // Aqui você pode carregar os dados atuais do usuário através de uma requisição à API
    const fetchUserData = async () => {
      const userData = {
        name: 'Heloisa', // Substitua pelos dados reais do usuário
        email: 'email@email.com'
      };
      setFormData(userData);
    };
    fetchUserData();
  }, []);

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

  const handleSave = () => {
    if (validate()) {
      // Aqui você faria a requisição para salvar os dados atualizados do usuário
      console.log('Dados atualizados:', formData);
      // Navega para outra página, se necessário
      navigate('/');
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Box p={8} maxWidth="400px" borderWidth={1} borderRadius={8} boxShadow="lg" backgroundColor="blackAlpha.500">
        <Heading as="h2" mb={6} textAlign="center" color="white">Meus Dados</Heading>
        <FormControl isInvalid={error.name} mb={4}>
          <FormLabel color="white" fontWeight="thin">Nome:</FormLabel>
          <Input
            name="name"
            placeholder="Nome"
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
            value={formData.email}
            onChange={handleChange}
          />
          {error.email && <FormErrorMessage>{error.email}</FormErrorMessage>}
        </FormControl>
        <FormControl isInvalid={error.password} mb={4}>
          <FormLabel color="white" fontWeight="thin">Nova Senha:</FormLabel>
          <Input
            name="password"
            type="password"
            placeholder="Nova Senha"
            value={formData.password}
            onChange={handleChange}
          />
          {error.password && <FormErrorMessage>{error.password}</FormErrorMessage>}
        </FormControl>
        <Button width="full" colorScheme="teal" onClick={handleSave}>Salvar Alterações</Button>
        <Text mt={4} color="white">
          Quer voltar para a home?{' '}
          <Link color="teal.200" onClick={() => navigate('/')}>
            Clique aqui
          </Link>
        </Text>
      </Box>
    </Box>
  );
};

export default Profile;
