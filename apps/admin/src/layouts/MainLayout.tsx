import { Outlet } from 'react-router';
import Sidebar from './components/Sidebar';

const MainLayout = () => {
  return (
    <div className="main-layout">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
