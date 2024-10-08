import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Inicializa o estado com o usuário do localStorage, apenas uma vez
    const storedUser = JSON.parse(localStorage.getItem('user'));
    return storedUser || null; // Retorne o usuário ou null se não houver
  });

  // Efeito que é chamado uma vez ao montar o componente
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser); // Define o usuário se estiver presente
    }
  }, []); // Executa apenas uma vez ao montar

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null); // Atualiza o estado do usuário
    localStorage.removeItem('user'); // Remove do localStorage
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

