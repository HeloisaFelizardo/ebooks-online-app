import { createContext, useState, useEffect } from 'react';
import {Spinner, Flex, useToast} from '@chakra-ui/react'; // Importe o Spinner do Chakra UI
import api from "../api/api.js"; // Certifique-se de que seu serviço API está configurado corretamente
import PropTypes from 'prop-types';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Inicialize o estado como null
  const [loading, setLoading] = useState(true); // Para gerenciar o estado de carregamento
  const toast = useToast();

  useEffect(() => {
    // Verifica se o usuário já está logado ao montar o componente
    const checkUserLoggedIn = () => {
      const storedUser = localStorage.getItem('user'); // Recupera o usuário do localStorage
      if (storedUser) {
        setUser(JSON.parse(storedUser)); // Define o usuário se encontrado
      }
      setLoading(false); // Conclui o carregamento
    };

    checkUserLoggedIn();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await api.post('/users/login', credentials); // Faz o login no backend
      setUser(response.data); // Armazena o usuário no estado
      localStorage.setItem('user', JSON.stringify(response.data)); // Armazena o usuário no localStorage
      console.log("Usuário logado com sucesso", response.data); // Mensagem de confirmação de login

      const name = response.data.name;

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
      console.log("Usuário deslogado com sucesso"); // Mensagem de confirmação de logout
    } catch (error) {
      console.error("Erro ao fazer logout", error);
    }
  };

  if (loading) {
    // Exibe o Spinner enquanto os dados estão carregando
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, token: user?.token }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};