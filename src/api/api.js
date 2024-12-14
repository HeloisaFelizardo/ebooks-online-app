import axios from 'axios';

const api = axios.create({
  baseURL: 'https://livraria-online-api.onrender.com', // URL base da API
});

export default api;
