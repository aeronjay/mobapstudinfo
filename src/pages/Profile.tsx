import React from 'react';
import { studentInfo } from '../utils/mockData';
import { UserIcon, MailIcon, BookOpenIcon, BellIcon, MoonIcon, LogOutIcon, ChevronRightIcon, HelpCircleIcon, SettingsIcon, ShieldIcon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
const Profile: React.FC = () => {
  const {
    theme,
    toggleTheme
  } = useTheme();
  const {
    logout
  } = useAuth();
  const menuItems = [{
    icon: UserIcon,
    label: 'Personal Information',
    description: 'Update your personal details'
  }, {
    icon: MailIcon,
    label: 'Notifications',
    description: 'Manage your notification preferences'
  }, {
    icon: ShieldIcon,
    label: 'Privacy & Security',
    description: 'Control your privacy settings'
  }, {
    icon: HelpCircleIcon,
    label: 'Help & Support',
    description: 'Get help or contact support'
  }, {
    icon: SettingsIcon,
    label: 'App Settings',
    description: 'Manage app preferences'
  }];
  return <div className="py-4">
      {/* Profile header */}
      <div className="flex flex-col items-center mb-6 bg-white dark:bg-gray-800 rounded-lg p-6">
        <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
          <img src={studentInfo.profileImage} alt={studentInfo.name} className="w-full h-full object-cover" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          {studentInfo.name}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {studentInfo.grade} • Student ID: {studentInfo.id}
        </p>
        <p className="text-gray-600 dark:text-gray-400">{studentInfo.email}</p>
      </div>
      {/* Settings menu */}
      <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden mb-6">
        {menuItems.map((item, index) => <div key={index} className={`flex items-center justify-between p-4 ${index !== menuItems.length - 1 ? 'border-b border-gray-100 dark:border-gray-700' : ''}`}>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mr-3">
                <item.icon size={20} className="text-gray-700 dark:text-gray-300" />
              </div>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-white">
                  {item.label}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
              </div>
            </div>
            <ChevronRightIcon size={20} className="text-gray-500 dark:text-gray-400" />
          </div>)}
      </div>
      {/* Theme toggle */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mr-3">
            <MoonIcon size={20} className="text-gray-700 dark:text-gray-300" />
          </div>
          <div>
            <h4 className="font-medium text-gray-800 dark:text-white">
              Dark Mode
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {theme === 'dark' ? 'On' : 'Off'}
            </p>
          </div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" checked={theme === 'dark'} onChange={toggleTheme} />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
      </div>
      {/* Logout button */}
      <button onClick={logout} className="w-full flex items-center justify-center p-4 bg-red-500 text-white rounded-lg">
        <LogOutIcon size={20} className="mr-2" />
        <span>Log Out</span>
      </button>
    </div>;
};
export default Profile;