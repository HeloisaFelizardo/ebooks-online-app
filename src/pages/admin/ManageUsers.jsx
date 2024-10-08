// src/pages/admin/ManageUsers.jsx

import { useEffect, useState } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Button, Heading, Spinner, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Importando o axios

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();

  // Função para buscar a lista de usuários da API usando axios
  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users'); // Usando axios para requisição GET
      setUsers(response.data); // O data do response contém os usuários
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      toast({
        title: 'Erro ao carregar usuários',
        description: 'Não foi possível carregar a lista de usuários.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  // Função para excluir um usuário usando axios
  const handleDelete = async (userId) => {
    try {
      await axios.delete(`/api/users/${userId}`); // Requisição DELETE com axios
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
    <Box p={8}>
      <Heading as="h1" mb={6}>Gerenciar Usuários</Heading>
      {loading ? (
        <Spinner size="xl" />
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
  );
};

export default ManageUsers;
