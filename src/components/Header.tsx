import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeftIcon, BellIcon, MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = (user?.role === 'student' && location.pathname === '/') || 
                    (user?.role === 'professor' && location.pathname === '/professor');

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Dashboard';
      case '/schedule':
        return 'Class Schedule';
      case '/assignments':
        return 'Assignments';
      case '/notifications':
        return 'Notifications';
      case '/grades':
        return 'Grades';
      case '/calendar':
        return 'Calendar';
      case '/directory':
        return 'Directory';
      case '/messages':
        return 'Messages';
      case '/profile':
        return 'Profile';
      // Professor routes
      case '/professor':
        return 'Professor Dashboard';
      case '/professor/classes':
        return 'Manage Classes';
      case '/professor/students':
        return 'Students';
      case '/professor/announcements':
        return 'Announcements';
      case '/professor/schedule':
        return 'Schedule';
      case '/professor/profile':
        return 'Profile';
      default:
        return 'Student App';
    }
  };

  return <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center">
          {!isHomePage && <button onClick={() => navigate(-1)} className="mr-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <ChevronLeftIcon size={24} className="text-gray-700 dark:text-gray-300" />
            </button>}
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            {getPageTitle()}
          </h1>
        </div>
        <div className="flex items-center space-x-2">
          {isHomePage && <button onClick={() => navigate('/notifications')} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <BellIcon size={20} className="text-gray-700 dark:text-gray-300" />
            </button>}
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            {theme === 'light' ? <MoonIcon size={20} className="text-gray-700" /> : <SunIcon size={20} className="text-gray-300" />}
          </button>
        </div>
      </div>
    </header>;
};
export default Header;