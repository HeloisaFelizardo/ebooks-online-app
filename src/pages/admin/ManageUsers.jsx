import {useEffect, useState, useRef} from 'react';
import {
  Box,
  Button,
  Heading,
  useToast,
  Container,
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
  Input, useBreakpointValue, Grid, GridItem
} from '@chakra-ui/react';
import {useAuth} from "../../hooks/useAuth.js";
import {deleteUser, fetchUsers, updateUser} from "../../services/userService.js";
import LoadingSpinner from "../../components/LoadingSpinner.jsx";
import {MdDelete, MdEdit} from "react-icons/md";
import {useNavigate} from "react-router-dom";

const ManageUsers = () => {
  const [usersMap, setUsersMap] = useState(new Map());
  const [loading, setLoading] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState(null); // Armazena o ID do usuário a ser atualizado/excluído
  const [selectedUser, setSelectedUser] = useState({name: '', email: '', password: ''}); // Armazena os dados do usuário a ser atualizado
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false); // Estado para o modal de atualização
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Estado para o modal de exclusão
  const toast = useToast();
  const {token} = useAuth();
  const initialRef = useRef(null);
  const navigate = useNavigate();

  const isMobile = useBreakpointValue({base: true, md: false});

  // Função para carregar os usuários
  const loadUsers = async () => {
    try {
      const usersData = await fetchUsers(token);
      const usersMap = new Map(usersData.map(user => [user._id, user])); // Cria o Map com ID como chave
      setUsersMap(usersMap);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Função para excluir um usuário
  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId, token); // Chama a função de exclusão
      const user = usersMap.get(userId); // Obtém o usuário diretamente do Map
      toast({
        title: 'Usuário excluído',
        description: `O usuário ${user.name} foi excluído com sucesso.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      const updatedUsersMap = new Map(usersMap); // Cria uma cópia do Map
      updatedUsersMap.delete(userId); // Remove o usuário
      setUsersMap(updatedUsersMap); // Atualiza o Map
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

  // Função para validar campos vazios
  const validateForm = () => {
    if (!selectedUser.name.trim() || !selectedUser.email.trim() || !selectedUser.password.trim()) {
      toast({
        title: 'Erro na atualização',
        description: 'Todos os campos devem ser preenchidos.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return false; // Se algum campo estiver vazio, retorna falso
    }
    return true; // Se todos os campos estiverem preenchidos, retorna verdadeiro
  };

  // Função para atualizar o usuário
  const handleUpdate = async (userId) => {

    if (!validateForm()) return; // Valida antes de tentar atualizar

    try {
      const response = await updateUser(userId, selectedUser, token); // Passa o objeto atualizado
      console.log('Response from updateUser:', response); // Verifique a estrutura da resposta

      const updatedUser = usersMap.get(userId); // Pega o usuário atualizado do Map

      if (response.message) {
        // Se a resposta for apenas uma mensagem de sucesso
        toast({
          title: `Usuário ${updatedUser.name} atualizado`,
          description: response.message, // Use a mensagem de sucesso
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }

      await loadUsers(); // Carrega a lista de usuários novamente

      setIsUpdateModalOpen(false); // Fecha o modal após a atualização

      // Agora, verifique o papel do usuário para redirecionar
      if (updatedUser && updatedUser.role === 'admin') {
        navigate('/login'); // Redireciona para a página de login se for admin
      }
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

  if (loading) return <LoadingSpinner/>;

  return (
    <Container maxW="container.xl" p={4}>
      <Heading as="h1" my={6}> Gerenciar Usuários </Heading>
      <Box>
        {/* Cabeçalho para telas maiores */}
        {!isMobile && (
          <Grid templateColumns="repeat(4, 1fr)" gap={4} fontWeight="bold" mb={4}>
            <GridItem>ID</GridItem>
            <GridItem>Nome</GridItem>
            <GridItem>Email</GridItem>
            <GridItem>Ações</GridItem>
          </Grid>
        )}

        {/* Tabela de Usuários */}
        {[...usersMap.values()].map((user) => ( // Converte os valores do Map em um array
          <Grid
            key={user._id}
            templateColumns={isMobile ? "1fr" : "repeat(4, 1fr)"}
            gap={4}
            p={4}
            bg="gray.100"
            border="1px solid"
            borderColor="gray.200"
            borderRadius="md"
            mb={4}
            alignItems="center"
          >
            <GridItem>
              {isMobile && <Box fontWeight="bold" color="gray.500" mb={1}>ID:</Box>}
              {user._id}
            </GridItem>
            <GridItem>
              {isMobile && <Box fontWeight="bold" color="gray.500" mb={1}>Nome:</Box>}
              {user.name}
            </GridItem>
            <GridItem>
              {isMobile && <Box fontWeight="bold" color="gray.500" mb={1}>Email:</Box>}
              {user.email}
            </GridItem>
            <GridItem>
              {isMobile && <Box fontWeight="bold" color="gray.500" mb={1}>Ações:</Box>}
              <Button
                colorScheme="blue"
                size="sm"
                onClick={() => openUpdateModal(user)}
                mr={2}
              >
                <MdEdit/> Editar
              </Button>
              <Button
                colorScheme="red"
                size="sm"
                onClick={() => {
                  setSelectedUserId(user._id);
                  setIsDeleteModalOpen(true);
                }}
              >
                <MdDelete/> Excluir
              </Button>
            </GridItem>
          </Grid>
        ))}
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
                required
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
