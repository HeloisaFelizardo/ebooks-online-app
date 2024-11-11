import axios from 'axios';
import {useNavigate} from "react-router-dom";

const api = axios.create({
  baseURL: 'http://localhost:3000', // Coloque aqui a URL base da sua API
});

api.interceptors.response.use(
  (response) => response, // Se a requisição for bem-sucedida, retorna a resposta
  (error) => {
    const navigate = useNavigate(); // Navegar para login
    if (error.response.status === 401 || error.response.status === 403) {
      // Se o token for expirado ou o usuário não tiver permissão
      localStorage.removeItem("token"); // Remove o token expirado
      navigate("/login"); // Redireciona para a página de login
    }
    return Promise.reject(error); // Se houver outro erro, continua o fluxo de erro
  }
);

export default api;
