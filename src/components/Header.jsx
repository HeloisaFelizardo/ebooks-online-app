import {
  Box,
  Flex,
  Heading,
  Button,
  Container,
  Spacer,
  Link,
  Menu,
  MenuButton,
  IconButton,
  MenuList, MenuItem, MenuGroup
} from '@chakra-ui/react';
import {useNavigate} from "react-router-dom";
import {AddIcon, ArrowBackIcon, DownloadIcon, EditIcon, ExternalLinkIcon} from "@chakra-ui/icons";


const Header = () => {
  const navigate = useNavigate();
  return (
    <Box bg="white" p={4} boxShadow="base" zIndex='1' position='relative'>
      <Flex justify="space-between" align="center">
        <Container maxW="container.xl">
          <Flex>
            <Heading as='h1' color="#BD0000" textShadow="2px 2px 4px rgba(0, 0, 0, 0.3)">
              Ebooks Online
            </Heading>
            <Spacer/>


            <Menu>
              <MenuButton as={Button} colorScheme="teal" variant="outline" mr={4}>
                Menu
              </MenuButton>
              <MenuList>

                <MenuItem icon={<ArrowBackIcon/>} onClick={() => navigate('/')}>
                 Início
                </MenuItem>

                <MenuGroup title='Minha Conta'>
                  <MenuItem icon={<EditIcon/>}>
                    Meus dados
                  </MenuItem>

                </MenuGroup>
                <MenuGroup title='Ebooks'>
                  <MenuItem icon={<DownloadIcon/>} onClick={() => navigate('/downloads')}>
                    Downloads
                  </MenuItem>
                  <MenuItem icon={<AddIcon/>} onClick={() => navigate('/upload')}>
                    Upload
                  </MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>

            <Button colorScheme="teal" onClick={() => navigate('/login')}>Login</Button>
          </Flex>
        </Container>
      </Flex>
    </Box>
  );
};

export default Header;
