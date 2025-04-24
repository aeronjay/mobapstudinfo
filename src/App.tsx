import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Schedule from './pages/Schedule';
import Assignments from './pages/Assignments';
import Notifications from './pages/Notifications';
import Grades from './pages/Grades';
import Calendar from './pages/Calendar';
import Directory from './pages/Directory';
import Messages from './pages/Messages';
import Profile from './pages/Profile';
import { useAuth } from './context/AuthContext';
const ProtectedRoute: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
    const {
      isAuthenticated,
      isLoading
    } = useAuth();
    if (isLoading) {
      return <div>Loading...</div>;
    }
    if (!isAuthenticated) {
      return <Navigate to="/welcome" replace />;
    }
    return <>{children}</>;
  };
const PublicRoute: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
    const {
      isAuthenticated,
      isLoading
    } = useAuth();
    if (isLoading) {
      return <div>Loading...</div>;
    }
    if (isAuthenticated) {
      return <Navigate to="/" replace />;
    }
    return <>{children}</>;
  };
export function App() {
  return <Router>
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          <Route path="/welcome" element={<PublicRoute>
            <Welcome />
          </PublicRoute>} />
          <Route path="/login" element={<PublicRoute>
            <Login />
          </PublicRoute>} />
          <Route path="/forgot-password" element={<PublicRoute>
            <ForgotPassword />
          </PublicRoute>} />
          <Route path="/" element={<ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>} />
          <Route path="/schedule" element={<ProtectedRoute>
            <Layout>
              <Schedule />
            </Layout>
          </ProtectedRoute>} />
          <Route path="/assignments" element={<ProtectedRoute>
            <Layout>
              <Assignments />
            </Layout>
          </ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute>
            <Layout>
              <Notifications />
            </Layout>
          </ProtectedRoute>} />
          <Route path="/grades" element={<ProtectedRoute>
            <Layout>
              <Grades />
            </Layout>
          </ProtectedRoute>} />
          <Route path="/calendar" element={<ProtectedRoute>
            <Layout>
              <Calendar />
            </Layout>
          </ProtectedRoute>} />
          <Route path="/directory" element={<ProtectedRoute>
            <Layout>
              <Directory />
            </Layout>
          </ProtectedRoute>} />
          <Route path="/messages" element={<ProtectedRoute>
            <Layout>
              <Messages />
            </Layout>
          </ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute>
            <Layout>
              <Profile />
            </Layout>
          </ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/welcome" replace />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  </Router>;
}