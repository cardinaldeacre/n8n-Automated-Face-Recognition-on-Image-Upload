import { Navigate, Outlet, useOutletContext } from 'react-router-dom';

type Props = { allowed: Array<'admin' | 'student'> };

export default function RoleRoute({ allowed }: Props) {
  const ctx = useOutletContext();
  const role =
    (localStorage.getItem('role') as 'admin' | 'student' | null) ?? null;

  if (!role) return <Navigate to="/login" replace />;

  if (!allowed.includes(role)) {
    alert('Akses ditolak, siswa tidak bisa masuk admin dashboard');
    return <Navigate to="/dashboard/student" replace />;
  }
  return <Outlet context={ctx} />;
}
