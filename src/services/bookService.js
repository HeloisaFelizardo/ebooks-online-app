import api from "../api/api.js";

//função para buscar todos os livros
export const getBooks = async () => {
  try {
    const response = await api.get("/books");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar livros:", error);
    throw error;
  }
};

//função para buscar um livro pelo id
export const getBookById = async (bookId) => {
  try {
    const response = await api.get(`/books/${bookId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar livro:", error);
    throw error;
  }
};

//função para fazer download do livro
export const downloadBook = async (bookId, token) => {
  try {
    const response = await api.get(`/books/${bookId}/download`, {
      responseType: "blob",
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao fazer download do livro:", error);
    throw error;
  }
};

//função para buscar livros por autor
export const getBooksByAuthor = async (author) => {
  try {
    const response = await api.get(`/books?author=${author}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar livros:", error);
    throw error;
  }
};

//função para buscar livros por título
export const getBooksByTerm = async (searchTerm) => {
  try {
    const response = await api.get(`/books/search?searchTerm=${encodeURIComponent(searchTerm.trim())}`);
    console.log('Livros encontrados:', response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar livros:", error);
    throw error;
  }
};

// função para postar livros
export const postBook = async (bookData, token) => {
  try {
    const response = await api.post("/books/upload", bookData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data' // Define o Content-Type para upload de arquivos
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao postar livro:", error);
    throw error;
  }
};

// Função para editar livros no frontend
export const updateBook = async (bookId, formData, token) => {
  try {
    const response = await api.patch(`/books/${bookId}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log("Livro atualizado com sucesso:", response.data);
    return response.data; // Retorna a resposta de sucesso
  } catch (error) {
    console.error("Erro ao editar livro:", error); // Log do erro para depuração
    throw error; // Relança o erro para ser tratado em outro lugar
  }
};

//função para deletar livros
export const deleteBook = async (bookId, token) => {
  try {
    const response = await api.delete(`/books/${bookId}`,  {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    console.log("Livro deletado com sucesso:", bookId, response.data);
  } catch (error) {
    console.error("Erro ao deletar livro:", error);
    throw error;
  }
};
