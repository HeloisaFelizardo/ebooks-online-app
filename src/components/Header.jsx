import {
  Box,
  Flex,
  Heading,
  Button,
  Container,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup
} from '@chakra-ui/react';
import {useNavigate} from "react-router-dom";
import {AddIcon, ArrowBackIcon, DownloadIcon, EditIcon} from "@chakra-ui/icons";
import {useAuth} from "../hooks/useAuth.js";

const Header = () => {
  const navigate = useNavigate();
  const {user, logout} = useAuth(); // Obtendo o usuário autenticado e seu papel

  const handleLogout = () => {
    logout();  // Remove o usuário do localStorage
    navigate('/login'); // Redireciona para a página de login
  };

  return (
    <Box bg="white" p={4} boxShadow="md" zIndex='1' position='relative'>
      <Flex justify="space-between" align="center">
        <Container maxW="container.xl">
          <Flex>
            <Heading as='h1' color="#BD0000" textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)">
              Ebooks Online
            </Heading>
            <Spacer/>

            {/* Itens de menu específicos para admin */}
            {user && user.role === 'admin' && (
              <>
                <Menu>
                  <MenuButton as={Button} colorScheme="teal" variant="outline" mr={4}>
                    Menu
                  </MenuButton>

                  <MenuList>
                    <MenuItem icon={<ArrowBackIcon/>} onClick={() => navigate('/')}>
                      Início
                    </MenuItem>

                    <MenuGroup title='Ebooks'>
                      <MenuItem icon={<AddIcon/>} onClick={() => navigate('/admin/upload')}>
                        Upload
                      </MenuItem>

                      <MenuItem icon={<DownloadIcon/>} onClick={() => navigate('/downloads')}>
                        Downloads
                      </MenuItem>
                    </MenuGroup>

                    <MenuGroup title='Admin'>
                      <MenuItem icon={<EditIcon/>} onClick={() => navigate('/admin/manage-users')}>
                        Gerenciar Usuários
                      </MenuItem>
                    </MenuGroup>

                  </MenuList>
                </Menu>
              </>
            )}

            {/* Itens de menu específicos para usuários comuns */}
            {user && user.role === 'user' && (
              <Menu>

                <MenuButton as={Button} colorScheme="teal" variant="outline" mr={4}>
                  Menu
                </MenuButton>

                <MenuList>
                  <MenuItem icon={<ArrowBackIcon/>} onClick={() => navigate('/')}>
                    Início
                  </MenuItem>

                  <MenuGroup title='Ebooks'>
                    <MenuItem icon={<DownloadIcon/>} onClick={() => navigate('/downloads')}>
                      Downloads
                    </MenuItem>
                  </MenuGroup>

                  <MenuGroup title='Minha Conta'>
                    <MenuItem icon={<EditIcon/>} onClick={() => navigate('/profile')}>
                      Meus dados
                    </MenuItem>
                  </MenuGroup>

                </MenuList>
              </Menu>
            )}


            {user ? (
              <Button colorScheme="teal" onClick={handleLogout}>Sair</Button>
            ) : (
              <Button colorScheme="teal" onClick={() => navigate('/login')}>Login</Button>
            )}
          </Flex>
        </Container>
      </Flex>
    </Box>
  );
};

export default Header;
