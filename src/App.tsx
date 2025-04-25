import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import ProfessorLayout from './components/professor/Layout';

// Public pages
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';

// Student pages
import Dashboard from './pages/Dashboard';
import Schedule from './pages/Schedule';
import Assignments from './pages/Assignments';
import Notifications from './pages/Notifications';
import Grades from './pages/Grades';
import Calendar from './pages/Calendar';
import Directory from './pages/Directory';
import Messages from './pages/Messages';
import Profile from './pages/Profile';

// Professor pages
import ProfessorDashboard from './pages/professor/Dashboard';
import ProfessorClasses from './pages/professor/Classes';
import ProfessorStudents from './pages/professor/Students';
import ProfessorAnnouncements from './pages/professor/Announcements';
import ProfessorSchedule from './pages/professor/Schedule';
import ProfessorProfile from './pages/professor/Profile';

import { useAuth } from './context/AuthContext';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  console.log('ProtectedRoute:', {
    isAuthenticated,
    isLoading,
    user,
    pathname: location.pathname
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/welcome" replace />;
  }

  // Update path checks to use location.pathname
  if (user?.role === 'professor' && location.pathname === '/') {
    return <Navigate to="/professor" replace />;
  }
  if (user?.role === 'student' && location.pathname.startsWith('/professor')) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/welcome" element={<PublicRoute><Welcome /></PublicRoute>} />
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />

            {/* Student routes */}
            <Route path="/" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
            <Route path="/schedule" element={<ProtectedRoute><Layout><Schedule /></Layout></ProtectedRoute>} />
            <Route path="/assignments" element={<ProtectedRoute><Layout><Assignments /></Layout></ProtectedRoute>} />
            <Route path="/notifications" element={<ProtectedRoute><Layout><Notifications /></Layout></ProtectedRoute>} />
            <Route path="/grades" element={<ProtectedRoute><Layout><Grades /></Layout></ProtectedRoute>} />
            <Route path="/calendar" element={<ProtectedRoute><Layout><Calendar /></Layout></ProtectedRoute>} />
            <Route path="/directory" element={<ProtectedRoute><Layout><Directory /></Layout></ProtectedRoute>} />
            <Route path="/messages" element={<ProtectedRoute><Layout><Messages /></Layout></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Layout><Profile /></Layout></ProtectedRoute>} />

            {/* Professor routes */}
            <Route path="/professor" element={<ProtectedRoute><ProfessorLayout><ProfessorDashboard /></ProfessorLayout></ProtectedRoute>} />
            <Route path="/professor/classes" element={<ProtectedRoute><ProfessorLayout><ProfessorClasses /></ProfessorLayout></ProtectedRoute>} />
            <Route path="/professor/students" element={<ProtectedRoute><ProfessorLayout><ProfessorStudents /></ProfessorLayout></ProtectedRoute>} />
            <Route path="/professor/announcements" element={<ProtectedRoute><ProfessorLayout><ProfessorAnnouncements /></ProfessorLayout></ProtectedRoute>} />
            <Route path="/professor/schedule" element={<ProtectedRoute><ProfessorLayout><ProfessorSchedule /></ProfessorLayout></ProtectedRoute>} />
            <Route path="/professor/profile" element={<ProtectedRoute><ProfessorLayout><ProfessorProfile /></ProfessorLayout></ProtectedRoute>} />
            
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/welcome" replace />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}