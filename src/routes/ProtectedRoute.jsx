import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from "../context/useAuth.js";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useAuth();

  //console.log('User:', user); // Para depuração

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
