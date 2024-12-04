import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // URL base da API
});

export default api;
