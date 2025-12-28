import { useNavigate } from 'react-router-dom';

interface Props {
  current: 'student' | 'admin';
  role: 'student' | 'admin' | null;
  onLogout: () => void;
  // onChange: (v: 'student' | 'admin') => void;
}

export default function Sidebar({ current, role }: Props) {
  const navigate = useNavigate();

  const goStudent = () => navigate('/dashboard/student');

  const goAdmin = () => {
    if (role !== 'admin') {
      alert('Akses ditolak: siswa tidak bisa masuk ke Admin Dashboard');
      return;
    }
    navigate('/dashboard/admin');
  };

  return (
    <div className="sidebar">
      <h2>📜 Licensing Portal</h2>

      <nav>
        <a
          className={current === 'student' ? 'active' : ''}
          onClick={goStudent}
        >
          Student Dashboard
        </a>

        <a className={current === 'admin' ? 'active' : ''} onClick={goAdmin}>
          Admin Dashboard
        </a>
      </nav>
    </div>
  );
}
