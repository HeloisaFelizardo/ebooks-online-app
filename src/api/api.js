import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Coloque aqui a URL base da sua API
});

// Interceptor para incluir o token de autenticação
/*api.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken'); // Altere conforme necessário
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});*/

export default api;
