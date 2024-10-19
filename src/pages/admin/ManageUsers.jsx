import {useEffect, useState, useRef} from 'react';
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
  Modal,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  Text,
  ModalBody,
  ModalFooter,
  ModalHeader,
  FormControl,
  FormLabel,
  Input
} from '@chakra-ui/react';
import {useAuth} from "../../hooks/useAuth.js";
import {deleteUser, fetchUsers, updateUser} from "../../services/userService.js";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState(null); // Armazena o ID do usuário a ser atualizado/excluído
  const [selectedUser, setSelectedUser] = useState({name: '', email: '', password: ''}); // Armazena os dados do usuário a ser atualizado
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false); // Estado para o modal de atualização
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Estado para o modal de exclusão
  const toast = useToast();
  const {token} = useAuth();
  const initialRef = useRef(null);

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
      setIsDeleteModalOpen(false); // Fecha o modal após a exclusão
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
  };

  // Função para atualizar o usuário
  const handleUpdate = async (userId) => {
    try {
      const updatedUser = await updateUser(userId, selectedUser, token); // Passa o objeto atualizado
      console.log('Updated User:', updatedUser);

      const user = users.find((user) => user._id === userId); // Encontra o usuário na lista

      setUsers(users.map((user) => user._id === userId ? updatedUser : user)); // Atualiza o usuário na lista

      loadUsers(); // Recarrega a lista de usuários

      toast({
        title: 'Usuário atualizado',
        description: `O usuário ${user.name} foi atualizado com sucesso.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      setIsUpdateModalOpen(false); // Fecha o modal após a atualização

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

  // Função para abrir o modal de atualização e preencher os campos
  const openUpdateModal = (user) => {
    setSelectedUserId(user._id);
    setSelectedUser({name: user.name, email: user.email, password: ''}); // Define os dados do usuário nos inputs
    setIsUpdateModalOpen(true);
  };

  // Manipula a mudança nos inputs
  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setSelectedUser((prevUser) => ({...prevUser, [name]: value}));
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
                      onClick={() => openUpdateModal(user)}
                      mr={2}
                    >
                      Editar
                    </Button>
                    <Button
                      colorScheme="red"
                      size="sm"
                      onClick={() => {
                        setSelectedUserId(user._id);
                        setIsDeleteModalOpen(true);
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

      {/* Modal de confirmação de exclusão de usuário */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>Excluir Usuário</ModalHeader>
          <ModalCloseButton/>
          <ModalBody pb={6}>
            <Text>Tem certeza que deseja excluir este usuário? Esta operação não pode ser desfeita.</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={() => handleDelete(selectedUserId)}>
              Confirmar
            </Button>
            <Button onClick={() => setIsDeleteModalOpen(false)}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal de atualização de usuário */}
      <Modal initialFocusRef={initialRef}
             isOpen={isUpdateModalOpen}
             onClose={() => setIsUpdateModalOpen(false)}
      >
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>Atualizar Usuário</ModalHeader>
          <ModalCloseButton/>
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Nome</FormLabel>
              <Input
                ref={initialRef}
                name="name"
                value={selectedUser.name}
                onChange={handleInputChange}
                placeholder="Nome"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                value={selectedUser.email}
                onChange={handleInputChange}
                placeholder="Email"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Senha</FormLabel>
              <Input
                name="password"
                value={selectedUser.password}
                onChange={handleInputChange}
                placeholder="Senha"
                type="password"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={() => handleUpdate(selectedUserId)}>
              Salvar
            </Button>
            <Button onClick={() => setIsUpdateModalOpen(false)}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default ManageUsers;
