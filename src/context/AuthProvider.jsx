import {createContext, useState, useEffect} from 'react';
import {useToast} from '@chakra-ui/react'; // Importe o Spinner do Chakra UI
import PropTypes from 'prop-types';
import {userLogin} from "../services/userService.js";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
// Importe a função de login do seu serviço de usuário

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null); // Inicialize o estado como null
  const [loading, setLoading] = useState(true); // Para gerenciar o estado de carregamento
  const toast = useToast(); // Use o hook useToast para exibir mensagens

  // Verifica se o usuário já está logado ao montar o componente
  const checkUserLoggedIn = () => {
    const storedUser = localStorage.getItem('user'); // Recupera o usuário do localStorage
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Define o usuário se encontrado
    }
    setLoading(false); // Conclui o carregamento
  };

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await userLogin(credentials); // Faz o login no backend

      const { token, _id: userId, name } = response; // Extrai o token da resposta

      setUser({ ...response, userId }); // Armazena o usuário no estado
      localStorage.setItem('user', JSON.stringify({ ...response, userId })); // Armazena o usuário no localStorage
      localStorage.setItem('token', token); // Armazena o token no localStorage

      console.log("Usuário logado com sucesso", response); // Mensagem de confirmação de login

      // Exibe o toast de sucesso
      toast({
        title: 'Login realizado com sucesso.',
        description: `Bem vindo ${name}!`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

    } catch (error) {
      console.error("Erro ao fazer login", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      setUser(null); // Remove o usuário do estado
      localStorage.removeItem('user'); // Remove o usuário do localStorage
      localStorage.removeItem('token'); // Remove o token do localStorage

      console.log("Usuário deslogado com sucesso"); // Mensagem de confirmação de logout

      toast({
        title: 'Logout realizado',
        description: 'Você saiu da sua conta com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Erro ao fazer logout", error);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <AuthContext.Provider value={{user, login, logout, token: user?.token, userId: user?.id}}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};