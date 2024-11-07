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
  MenuGroup, Text
} from '@chakra-ui/react';
import {useNavigate} from "react-router-dom";
import {AddIcon, ArrowBackIcon, DownloadIcon, EditIcon} from "@chakra-ui/icons";
import {useAuth} from "../hooks/useAuth.js";
import {MdLogin, MdLogout, MdMenu} from "react-icons/md";

const Header = () => {
  const navigate = useNavigate();
  const {user, logout} = useAuth(); // Obtendo o usuário autenticado e seu papel

  const handleLogout = () => {
    logout();  // Remove o usuário do localStorage
    navigate('/login'); // Redireciona para a página de login
  };

  return (
    <Box bg="teal.500" p={4} boxShadow="md" zIndex='1' position='relative'>
      <Flex justify="space-between" align="center">
        <Container maxW="container.xl">
          <Flex>
            <Heading as='h1' color="white">
              Ebooks Online
            </Heading>
            <Spacer/>

            {/* Itens de menu específicos para admin */}
            {user && user.role === 'admin' && (
              <>
                <Menu>
                  <MenuButton as={Button} leftIcon={<MdMenu/>} variant="ghost" mr={4}>
                    Menu
                  </MenuButton>

                  <MenuList>
                    <MenuItem><Text> Bem vindo {user.name}!</Text></MenuItem>

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


                <MenuButton as={Button} leftIcon={<MdMenu/>} variant="ghost" mr={4}>
                  Menu
                </MenuButton>

                <MenuList>
                  <MenuItem>
                    <Text> Bem vindo {user.name}!</Text>
                  </MenuItem>

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
              <Button leftIcon={<MdLogout/>} variant="ghost" onClick={handleLogout}>Sair</Button>
            ) : (
              <Button leftIcon={<MdLogin/>} variant="ghost" onClick={() => navigate('/login')}>Login</Button>
            )}
          </Flex>
        </Container>
      </Flex>
    </Box>
  );
};

export default Header;
