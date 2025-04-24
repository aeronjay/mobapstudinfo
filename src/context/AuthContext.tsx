import React, { useEffect, useState, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockLogin, mockLogout, checkAuth, UserRole, User } from '../utils/authUtils';
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => Promise<void>;
  isLoading: boolean;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const {
      isAuthenticated: authStatus,
      role,
      userId
    } = checkAuth();
    if (authStatus && role && userId) {
      const user = mockUsers.find(u => u.id === userId);
      if (user) {
        setUser(user);
        setIsAuthenticated(true);
      }
    }
    setIsLoading(false);
  }, []);
  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    const user = await mockLogin(email, password, role);
    const success = !!user;
    if (success && user) {
      setIsAuthenticated(true);
      setUser(user);
      navigate(user.role === 'professor' ? '/professor' : '/');
    }
    setIsLoading(false);
    return success;
  };
  const logout = async () => {
    setIsLoading(true);
    await mockLogout();
    setIsAuthenticated(false);
    setUser(null);
    setIsLoading(false);
    navigate('/welcome');
  };
  return <AuthContext.Provider value={{
    isAuthenticated,
    user,
    login,
    logout,
    isLoading
  }}>
      {children}
    </AuthContext.Provider>;
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};