import {Outlet, useLocation} from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import {Box, Flex} from "@chakra-ui/react";

const Layout = () => {
  const location = useLocation();

  //Verifica se a página atual é a home
  const isHomePage = location.pathname === '/';

  // Verifica se a página atual é a de login
  const isLoginPage = location.pathname === '/login';

  // Verifica se a página atual é a de registro
    const isRegisterPage = location.pathname === '/register';

  return (
    <Flex direction="column" minHeight="100vh" className={isHomePage || isRegisterPage ? 'home-background' : ''}>
      {/* Renderiza o Header em todas as páginas, exceto na de login */}
      {!isLoginPage && <Header/>}

      {/* O conteúdo principal da página é renderizado aqui */}
      <Box flex="1">
        <Outlet/>
      </Box>

      {/* Renderiza o Footer em todas as páginas, exceto na de login */}
      {!isLoginPage && <Footer/>}
    </Flex>
  );
};

export default Layout;
