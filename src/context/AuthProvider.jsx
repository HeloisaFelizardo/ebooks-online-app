import { createContext, useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { userLogin } from "../services/userService.js";
import LoadingSpinner from "../components/LoadingSpinner.jsx";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
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
      const { _id: userId, name } = response;
      const userData = { ...response, userId };

      saveUserData(userData);

      console.log("Usuário logado com sucesso", response);
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
    if (user) {
      const updatedUser = { ...user, token: newToken };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      if (newToken) {
        localStorage.setItem('token', newToken);
      } else {
        localStorage.removeItem('token');
      }
    }
  };

  return loading ? <LoadingSpinner /> : (
    <AuthContext.Provider value={{ user, login, logout, token: user?.token, setToken, userId: user?.id }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
