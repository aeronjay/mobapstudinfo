import React from 'react';
import Header from './Header';
import BottomNav from './BottomNav';
import { useTheme } from '../context/ThemeContext';
interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({
  children
}) => {
  const {
    theme
  } = useTheme();
  return <div className={`${theme === 'dark' ? 'dark' : ''} w-full min-h-screen bg-gray-50 dark:bg-gray-900`}>
      <div className="max-w-md mx-auto h-screen flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto pb-16 px-4">{children}</main>
        <BottomNav />
      </div>
    </div>;
};
export default Layout;