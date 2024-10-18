// src/pages/admin/ManageUsers.jsx

import { useEffect, useState } from 'react';
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
  Flex,
  useDisclosure,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  Text,
  ModalBody,
  ModalFooter,
  ModalHeader // Corrigido: agora importado corretamente
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../hooks/useAuth.js";
import { deleteUser, fetchUsers } from "../../services/userService.js";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState(null); // Armazena o ID do usuário a ser excluído
  const toast = useToast();
  const navigate = useNavigate();
  const { token } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      const user = users.find((user) => user._id === userId);
      toast({
        title: 'Usuário excluído',
        description: `O usuário ${user.name} foi excluído com sucesso.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setUsers(users.filter((user) => user._id !== userId));
      onClose(); // Fecha o modal após a exclusão
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
          <Flex justify="center" align="center">
            <Spinner size="xl" />
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
                      onClick={() => navigate(`/admin/edit-user/${user._id}`)}
                      mr={2}
                    >
                      Editar
                    </Button>
                    <Button
                      colorScheme="red"
                      size="sm"
                      onClick={() => {
                        setSelectedUserId(user._id); // Define o ID do usuário a ser excluído
                        onOpen(); // Abre o modal
                      }}
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

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Excluir Usuário</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text>Tem certeza que deseja excluir este usuário? Esta operação não pode ser desfeita.</Text>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme='blue'
              mr={3}
              onClick={() => handleDelete(selectedUserId)} // Passa o ID do usuário selecionado
            >
              Confirmar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default ManageUsers;
