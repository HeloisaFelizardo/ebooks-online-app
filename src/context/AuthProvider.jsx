import {createContext, useState, useEffect} from 'react';
import {useToast} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import {userLogin} from "../services/userService.js";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const expirationTime = decodedToken.exp * 1000; // Expiração em milissegundos
        if (Date.now() >= expirationTime) {
          logout(); // Se o token expirou, realiza o logout
        }
      } catch (error) {
        console.error("Token inválido", error);
        logout(); // Se não conseguir decodificar o token, realiza o logout
      }
    } else {
      logout(); // Se não houver token, realiza o logout
    }
    setLoading(false);
  }, []);

  const showToast = (title, description, status) => {
    toast({
      title,
      description,
      status,
      duration: 3000,
      isClosable: true,
    });
  };

  const saveUserData = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', userData.token);
  };

  const login = async (credentials) => {
    try {
      const response = await userLogin(credentials);
      const {_id: userId, name} = response;
      const userData = {...response, userId};

      saveUserData(userData);

      console.log("Usuário logado com sucesso");
      showToast('Login realizado com sucesso.', `Bem-vindo(a) ${name}!`, 'success');
    } catch (error) {
      console.error("Erro ao fazer login", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    console.log("Usuário deslogado com sucesso");
    showToast('Logout realizado', 'Você saiu da sua conta com sucesso.', 'success');
  };

  const setToken = (newToken) => {
    if (newToken) {
      if (user) {
        const updatedUser = {...user, token: newToken};
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        localStorage.setItem('token', newToken);
      }
    } else {
      logout(); // Logout quando o token for removido ou inválido
    }
  };

  return loading ? <LoadingSpinner/> : (
    <AuthContext.Provider value={{user, login, logout, token: user?.token, setToken, userId: user?.id}}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
