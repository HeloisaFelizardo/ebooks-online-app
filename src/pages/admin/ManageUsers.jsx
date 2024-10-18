// src/pages/admin/ManageUsers.jsx

import {useEffect, useState} from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Heading,
  Spinner,
  useToast,
  Container,
  Flex
} from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from "../../hooks/useAuth.js";
import {deleteUser, fetchUsers} from "../../services/userService.js";


const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();
  const {token} = useAuth();

  // Função para carregar os usuários
  const loadUsers = async () => {
    try {
      const usersData = await fetchUsers(token);
      setUsers(usersData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Função para excluir um usuário
  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId, token);
      toast({
        title: 'Usuário excluído',
        description: 'O usuário foi excluído com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      toast({
        title: 'Erro ao excluir usuário',
        description: 'Não foi possível excluir o usuário.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <Container maxW="container.xl" backgroundColor="white" p={10} boxShadow="xl">
      <Box>
        <Heading as="h1" mb={6}>Gerenciar Usuários</Heading>
        {loading ? (
          <Flex justify="center" align="center" height="100vh">
            <Spinner size="xl"/>
          </Flex>
        ) : (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Nome</Th>
                <Th>Email</Th>
                <Th>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user) => (
                <Tr key={user._id}>
                  <Td>{user._id}</Td>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                  <Td>
                    <Button
                      colorScheme="blue"
                      size="sm"
                      onClick={() => navigate(`/admin/edit-user/${user.id}`)}
                      mr={2}
                    >
                      Editar
                    </Button>
                    <Button
                      colorScheme="red"
                      size="sm"
                      onClick={() => handleDelete(user.id)}
                    >
                      Excluir
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Box>
    </Container>
  );
};

export default ManageUsers;
