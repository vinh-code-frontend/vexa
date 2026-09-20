import { Outlet } from 'react-router';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

const MainLayout = () => {
  return (
    <div className="main-layout flex">
      <Sidebar />
      <div>
        <Topbar />
        <main className="main-section p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
