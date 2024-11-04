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
  useToast, Flex, Spinner
} from '@chakra-ui/react';
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from "../../hooks/useAuth.js";
import {checkEmailExists, deleteUser, fetchUserById, updateUser} from "../../services/userService.js";
import useForm from "../../hooks/useForm.js";

const Profile = () => {
  // Define as regras de validação aqui
  const validationRules = {
    name: (value) => (!value ? 'Nome é obrigatório' : ''),
    email: (value) => (!value ? 'Email é obrigatório' : ''),
    password: (value) => (!value ? 'Senha é obrigatória' : ''),
  };

  // Passa `validationRules` como argumento para `useForm`
  const {formData, setFormData, error, setError, validate, handleChange} = useForm(
    {name: '', email: '', password: ''},
    validationRules
  );

  const toast = useToast();
  const {token, userId} = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    try {
      const userData = await fetchUserById(userId, token);

      console.log(userData);
      setFormData({
        name: userData?.name || '',
        email: userData?.email || '',
        password: '',  // mantenha o campo de senha vazio por motivos de segurança
      });
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);

      toast({
        title: 'Erro ao carregar dados do usuário',
        description: 'Não foi possível carregar os dados do usuário.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadUser();
  }, []);

  const handleSave = async () => {
    if (!validate()) return;

    try {
      // Verifica se o e-mail já está cadastrado por outro usuário
      const {emailExists} = await checkEmailExists(token, formData.email, userId);

      // Se o e-mail já existe para outro usuário, mostre um erro
      if (emailExists) {
        setError({email: 'Email já cadastrado'});

        toast({
          title: 'Erro ao atualizar usuário',
          description: 'O email informado já está cadastrado por outro usuário.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      // Atualiza o usuário se o e-mail for válido
      await updateUser(userId, formData, token);
      console.log('Dados atualizados:', formData);

      toast({
        title: 'Usuário atualizado',
        description: `O usuário ${formData.name} foi atualizado com sucesso.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      navigate('/');
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);

      toast({
        title: 'Erro ao atualizar usuário',
        description: 'Não foi possível atualizar o usuário.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUser(userId, token)

      toast({
        title: 'Conta excluída',
        description: `O usuário ${formData.name} foi excluído com sucesso.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/login');
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);

      toast({
        title: 'Erro ao excluir usuário',
        description: 'Não foi possível excluir o usuário.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      {loading ? (
        <Flex justify="center" align="center">
          <Spinner size="xl"/>
        </Flex>
      ) : (
        <Box p={8} maxWidth="400px" borderWidth={1} borderRadius={8} boxShadow="lg" backgroundColor="blackAlpha.500">
          <Heading as="h2" mb={6} textAlign="center" color="white">Meus Dados</Heading>
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
            <FormLabel color="white" fontWeight="thin">Nova Senha:</FormLabel>
            <Input
              name="password"
              type="password"
              placeholder="Nova Senha"
              color='white'
              value={formData.password}
              onChange={handleChange}
            />
            {error.password && <FormErrorMessage>{error.password}</FormErrorMessage>}
          </FormControl>
          <Button width="full" colorScheme="teal" onClick={handleSave}>Salvar Alterações</Button>
          <Button width="full" colorScheme="red" mt={4} onClick={handleDelete}>Excluir Conta</Button>
          <Text mt={4} color="white">
            Quer voltar para a home?{' '}
            <Link color="teal.200" onClick={() => navigate('/')}>
              Clique aqui
            </Link>
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default Profile;
