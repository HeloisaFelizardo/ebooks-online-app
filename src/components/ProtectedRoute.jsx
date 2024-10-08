// ProtectedRoute.jsx

import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from "../hooks/useAuth.js";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useAuth();

  console.log('User:', user); // Adicione esta linha para verificar o valor de user

  if (!user) {
    // Se o usuário não estiver autenticado, redireciona para a página de login
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Se o usuário não tem o papel permitido, redireciona para a página de não autorizado
    return <Navigate to="/unauthorized" />;
  }

  // Se o usuário tem acesso, renderiza o componente
  return <Outlet />;
};

export default ProtectedRoute;
