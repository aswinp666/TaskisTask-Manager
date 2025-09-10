import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import { useTheme } from '../../contexts/ThemeContext';

const Layout = () => {
  const { theme } = useTheme();
  const location = useLocation();
  
  // Check if current route is tasks page to use fluid container for Kanban board
  const isTasksPage = location.pathname === '/tasks';
  
  return (
    <div className={`app-container ${theme}`}>
      {/* The Navbar component is now outside the main content container */}
      <Navbar />
      <main className={`${isTasksPage ? 'container-fluid' : 'container'} py-3`}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
