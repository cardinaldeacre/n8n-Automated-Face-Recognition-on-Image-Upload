import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useState, type Dispatch, type SetStateAction } from 'react';
import Sidebar from './Sidebar';
import { logout } from '../services/auth';

export type EventItem = { name: string; details: string };

export type DashboardOutletContext = {
  events: EventItem[];
  setEvents: Dispatch<SetStateAction<EventItem[]>>;
};

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const role =
    (localStorage.getItem('role') as 'admin' | 'student' | null) ?? null;
  const current: 'student' | 'admin' = location.pathname.includes(
    'dashboard/admin'
  )
    ? 'admin'
    : 'student';

  const [events, setEvents] = useState<EventItem[]>([]);

  async function handleLogout() {
    await logout();
    localStorage.removeItem('role');
    localStorage.removeItem('accessToken');
    navigate('/login', { replace: true });
  }

  return (
    <div className="dashboard-container">
      <Sidebar current={current} role={role} onLogout={handleLogout} />
      <div className="main-content">
        <Outlet context={{ events, setEvents }} />
      </div>
    </div>
  );
}
