import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Profil from './pages/Profil';
import Prodi from './pages/Prodi';
import Berita from './pages/Berita';
import BeritaDetail from './pages/BeritaDetail';
import Kontak from './pages/Kontak';
import Login from './pages/Login';

import Dashboard from './pages/admin/Dashboard';
import BannerAdmin from './pages/admin/BannerAdmin';
import BeritaAdmin from './pages/admin/BeritaAdmin';
import ProdiAdmin from './pages/admin/ProdiAdmin';
import ProfilAdmin from './pages/admin/ProfilAdmin';
import UsersAdmin from './pages/admin/UsersAdmin';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="/prodi" element={<Prodi />} />
            <Route path="/berita" element={<Berita />} />
            <Route path="/berita/:slug" element={<BeritaDetail />} />
            <Route path="/kontak" element={<Kontak />} />
          </Route>

          <Route path="/login" element={<Login />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="banner" element={<BannerAdmin />} />
            <Route path="berita" element={<BeritaAdmin />} />
            <Route path="prodi" element={<ProdiAdmin />} />
            <Route path="profil" element={<ProfilAdmin />} />
            <Route path="users" element={<UsersAdmin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
