import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Upload from '../pages/admin/Upload.jsx';
import ManageUsers from '../pages/admin/ManageUsers.jsx';
import Downloads from '../pages/users/Downloads.jsx';
import Layout from "../components/Layout.jsx";
import Register from "../pages/Register.jsx";
import Profile from "../pages/users/Profile.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import {AuthProvider} from "../context/AuthProvider.jsx";
import {ManageBooks} from "../pages/admin/ManageBooks.jsx";

const AppRouter = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* O Layout é aplicado em todas as rotas */}
          <Route path="/" element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path="/downloads" element={<Downloads/>}/>

            {/* Rota protegida para usuários autenticados */}
            <Route element={<ProtectedRoute allowedRoles={['user', 'admin']}/>}>
              <Route path="/profile" element={<Profile/>}/>
            </Route>

            {/* Rota protegida apenas para administradores */}
            <Route element={<ProtectedRoute allowedRoles={['admin']}/>}>
              <Route path="/admin/upload" element={<Upload/>}/>
              <Route path="/admin/manage-users" element={<ManageUsers/>}/>
              <Route path="/admin/manage-books" element={<ManageBooks/>}/>
            </Route>

          </Route>

          {/* A página de login é separada, sem Header e Footer */}
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default AppRouter;
