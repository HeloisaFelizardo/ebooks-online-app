// src/services/userService.js

import api from "../api/api.js";

//Função para cadastrar usuario
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/users/register", userData);
    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    throw error;
  }
};

// Função para buscar a lista de usuários da API
export const fetchUsers = async (token) => {
  try {
    console.log('Token:', token);
    if (!token) {
      throw new Error('Usuário não autenticado!');
    }

    const response = await api.get('/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Resposta da API:', response.data);

    // Verifica se a resposta contém os usuários e se é um array
    const usersData = response.data.users;
    return Array.isArray(usersData) ? usersData : [];
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    throw error;
  }
};

//Função para buscar um usuário pelo id
export const fetchUserById = async (userId, token) => {
  try {
    const response = await api.get(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    throw error;
  }
};

// Função para verificar se o e-mail já está registrado
export const checkEmailExists = async (token, email, userId) => {
  try {
    const response = await api.post('/users/verify-email', { email, userId }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Supondo que response.data seja `true` ou `false`
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.error('Email já registrado por outro usuário.');
      return { emailExists: true }; // Retorna uma flag em vez de lançar o erro
    } else {
      console.error('Erro ao verificar o email.');
      throw error; // Lança erros desconhecidos para serem tratados no handleSave
    }
  }
};

// Função para excluir um usuário da API
export const deleteUser = async (userId, token) => {
  try {
    await api.delete(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    throw error;
  }
};

// Função para fazer login
export const userLogin = async (credentials) => {
  try {
    const response = await api.post('/users/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
};

// Função para atualizar um usuário
export const updateUser = async (userId, userData, token) => {
  try {
    const response = await api.put(`/users/${userId}`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    throw error;
  }
};
