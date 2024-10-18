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
    if (!token) {
      throw new Error('Usuário não autenticado!');
    }

    const response = await api.get('/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Verifica se a resposta contém os usuários e se é um array
    const usersData = response.data.users;
    return Array.isArray(usersData) ? usersData : [];
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    throw error;
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
