import {useNavigate} from "react-router-dom";
import {downloadBook} from "../services/bookService.js";
import {useAuth} from "./useAuth.js";
import {useToast} from "@chakra-ui/react";

const useDownload = () => {
  const {token, setToken} = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  return async (bookId, fileName) => {
    if (!token) {
      toast({
        title: 'Faça seu login para baixar!',
        description: 'Você precisa estar logado para fazer esse download.',
        status: 'info',
        duration: 5000,
        isClosable: true,
      });
      navigate('/login');
      return;
    }

    try {
      const blob = await downloadBook(bookId, token);
      const url = window.URL.createObjectURL(blob);

      // Defina o nome do arquivo para download, se necessário
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName || "document.pdf"; // Define o nome do arquivo
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();  // Aciona o download automaticamente

      // Limpa o link temporário
      document.body.removeChild(a);

      // Abrir em uma nova aba com o PDF
      window.open(url, "_blank");

      // A URL do Blob será revogada após um pequeno tempo para liberar memória
      setTimeout(() => window.URL.revokeObjectURL(url), 5000);

    } catch (error) {
      // Aqui você pode verificar se o erro é relacionado à expiração do token
      if (error.response && error.response.status === 403) {
        setToken(null); // Limpa o token
        toast({
          title: 'Sessão expirada.',
          description: 'Você precisa estar logado para fazer download de livros.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        navigate('/login'); // Redireciona para a página de login
      } else {
        console.error("Erro ao baixar o PDF:", error);
      }
    }
  };
};

export default useDownload;
