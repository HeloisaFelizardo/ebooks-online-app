import axios from 'axios';

const api = axios.create({
  baseURL: 'https://livraria-online-api.onrender.com', // URL base da API
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      localStorage.removeItem("token"); // Remove o token expirado
      window.location.href = "/login"; // Redireciona para a página de login
    }
    return Promise.reject(error);
  }
);

export default api;
