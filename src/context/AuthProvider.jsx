import { createContext, useState, useEffect } from 'react';
import api from "../services/api"; // Certifique-se de que seu serviço API está configurado corretamente

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Inicialize o estado como null
  const [loading, setLoading] = useState(true); // Para gerenciar o estado de carregamento

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
    // Enquanto os dados do usuário estão sendo carregados, você pode exibir um loader
    return <div>Carregando...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, token: user?.token }}>
      {children}
    </AuthContext.Provider>
  );
};
