import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HomeIcon, CalendarIcon, BookOpenIcon, ClipboardListIcon, MessageCircleIcon, UserIcon } from 'lucide-react';

const BottomNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const navItems = [{
    path: '/',
    icon: HomeIcon,
    label: 'Home'
  }, {
    path: '/schedule',
    icon: CalendarIcon,
    label: 'Schedule'
  }, {
    path: '/assignments',
    icon: ClipboardListIcon,
    label: 'Tasks'
  }, {
    path: '/grades',
    icon: BookOpenIcon,
    label: 'Grades'
  }, {
    path: '/messages',
    icon: MessageCircleIcon,
    label: 'Messages'
  }, {
    path: '/profile',
    icon: UserIcon,
    label: 'Profile'
  }];
  
  return (
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
  );
};

export default BottomNav;