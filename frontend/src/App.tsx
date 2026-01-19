import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/auth/RegisterPage';
import Login from './pages/auth/LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/student/dashboard" element={<div>Halaman Dashboard Mahasiswa</div>} />
        <Route path="/admin/dashboard" element={<div>Halaman Dashboard Admin</div>} />
      </Routes>
    </Router>
  );
}

export default App;