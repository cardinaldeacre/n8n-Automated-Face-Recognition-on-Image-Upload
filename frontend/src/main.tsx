import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import './styles/global.css';

import DashboardLayout from './components/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';
import RoleRoute from './components/RoleRoute';

import App from './App';
import StudentDashboard from './components/StudentDashboard';
import AdminDashboard from './components/AdminDashboard';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* login required */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route element={<App />}>
              <Route index element={<Navigate to="student" replace />} />

              {/* untuk student */}

              <Route path="student" element={<StudentDashboard />} />

              {/* admin route */}

              <Route element={<RoleRoute allowed={['admin']} />}>
                <Route path="admin" element={<AdminDashboard />} />
              </Route>
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<Navigate to={'/login'} replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
