import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import LoginPage from './pages/auth/LoginPage';
import AdminLayout from './components/layout/AdminLayout';
import DashboardPage from './pages/dashboard/DashboardPage';
import ProjectsListPage from './pages/projects/ProjectsListPage';
import ProjectFormPage from './pages/projects/ProjectFormPage';
import ServicesListPage from './pages/services/ServicesListPage';
import ServiceFormPage from './pages/services/ServiceFormPage';
import BlogsListPage from './pages/blogs/BlogsListPage';
import BlogFormPage from './pages/blogs/BlogFormPage';
import StatsPage from './pages/stats/StatsPage';
import TeamListPage from './pages/team/TeamListPage';
import TeamFormPage from './pages/team/TeamFormPage';
import SettingsPage from './pages/settings/SettingsPage';
import TestimonialsListPage from './pages/testimonials/TestimonialsListPage';
import TestimonialFormPage from './pages/testimonials/TestimonialFormPage';


// Protected Route wrapper
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'var(--bg-primary)', color: 'var(--accent)', fontFamily: 'Syne,sans-serif' }}>Loading...</div>;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected — all inside AdminLayout */}
          <Route path="/" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />

            <Route path="projects" element={<ProjectsListPage />} />
            <Route path="projects/new" element={<ProjectFormPage />} />
            <Route path="projects/edit/:id" element={<ProjectFormPage />} />

            <Route path="services" element={<ServicesListPage />} />
            <Route path="services/new" element={<ServiceFormPage />} />
            <Route path="services/edit/:id" element={<ServiceFormPage />} />

            <Route path="testimonials" element={<TestimonialsListPage />} />
            <Route path="testimonials/new" element={<TestimonialFormPage />} />
            <Route path="testimonials/edit/:id" element={<TestimonialFormPage />} />

            <Route path="blogs" element={<BlogsListPage />} />
            <Route path="blogs/new" element={<BlogFormPage />} />
            <Route path="blogs/edit/:id" element={<BlogFormPage />} />

            <Route path="stats" element={<StatsPage />} />

            <Route path="team" element={<TeamListPage />} />
            <Route path="team/new" element={<TeamFormPage />} />
            <Route path="team/edit/:id" element={<TeamFormPage />} />

            <Route path="settings" element={<SettingsPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}