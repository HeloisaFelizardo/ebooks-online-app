// src/pages/admin/ManageUsers.jsx

import {useEffect, useState} from 'react';
import {Box, Table, Thead, Tbody, Tr, Th, Td, Button, Heading, Spinner, useToast, Container} from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom';
import api from "../../services/api.js"; // Importando o axios

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();

  // Função para buscar a lista de usuários da API usando axios
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token'); // Exemplo de onde você pode buscar o token
      const response = await api.get('/users', {
        headers: {
          Authorization: `Bearer ${token}`, // Passa o token no cabeçalho
        },
      });
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      setLoading(false);
    }
  };


  // Função para excluir um usuário usando axios
  const handleDelete = async (userId) => {
    try {
      await api.delete(`/users/${userId}`); // Requisição DELETE com axios
      toast({
        title: 'Usuário excluído',
        description: 'O usuário foi excluído com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      // Atualiza a lista de usuários removendo o usuário excluído
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      toast({
        title: 'Erro ao excluir usuário',
        description: 'Não foi possível excluir o usuário.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Carrega os usuários ao montar o componente
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Container maxW="container.xl" backgroundColor="white" p={10} boxShadow="xl">
      <Box>
        <Heading as="h1" mb={6}>Gerenciar Usuários</Heading>
        {loading ? (
          <Spinner size="xl"/>
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
                <Tr key={user.id}>
                  <Td>{user.id}</Td>
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
