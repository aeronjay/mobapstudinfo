import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { HomeIcon, BookOpenIcon, UsersIcon, BellIcon, CalendarIcon, UserIcon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import Header from '../Header';

interface LayoutProps {
  children: React.ReactNode;
}

const ProfessorLayout: React.FC<LayoutProps> = ({ children }) => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [{
    path: '/professor',
    icon: HomeIcon,
    label: 'Dashboard'
  }, {
    path: '/professor/classes',
    icon: BookOpenIcon,
    label: 'Classes'
  }, {
    path: '/professor/students',
    icon: UsersIcon,
    label: 'Students'
  }, {
    path: '/professor/announcements',
    icon: BellIcon,
    label: 'Notices'
  }, {
    path: '/professor/schedule',
    icon: CalendarIcon,
    label: 'Schedule'
  }, {
    path: '/professor/profile',
    icon: UserIcon,
    label: 'Profile'
  }];

  return (
    <div className={`${theme === 'dark' ? 'dark' : ''} w-full min-h-screen bg-gray-50 dark:bg-gray-900`}>
      <div className="max-w-md mx-auto h-screen flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto pb-16 px-4">
          {children}
        </main>
        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-6 w-full">
            {navItems.map(item => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  className={`flex flex-col items-center py-2 ${
                    isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'
                  }`}
                  onClick={() => navigate(item.path)}
                >
                  <item.icon size={18} />
                  <span className="text-[10px] mt-1">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default ProfessorLayout;