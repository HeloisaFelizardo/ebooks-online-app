import {BrowserRouter as Router, Routes, Route, Outlet} from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Upload from '../pages/Upload';
import Downloads from '../pages/Downloads';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Layout from "../components/Layout.jsx";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* O Layout é aplicado em todas as rotas */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="downloads" element={<Downloads />} />
          <Route path="upload" element={<Upload />} />
        </Route>

        {/* A página de login é separada, sem Header e Footer */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
