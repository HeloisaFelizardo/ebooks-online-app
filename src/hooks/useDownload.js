import { useNavigate } from "react-router-dom";
import { downloadBook } from "../services/bookService.js";
import { useAuth } from "./useAuth.js";

const useDownload = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  return async (bookId) => {
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const blob = await downloadBook(bookId, token);
      const url = window.URL.createObjectURL(blob);

      // Abrir o PDF em uma nova aba para leitura
      window.open(url, '_blank');

      // A URL do Blob será revogada após um pequeno tempo para liberar memória
      setTimeout(() => window.URL.revokeObjectURL(url), 5000);

    } catch (error) {
      console.error("Erro ao abrir o PDF:", error);
    }
  };
};

export default useDownload;
