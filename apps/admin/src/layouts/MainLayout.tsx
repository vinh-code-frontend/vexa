import { Outlet } from 'react-router';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

const MainLayout = () => {
  return (
    <div className="main-layout flex h-dvh overflow-hidden">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="shrink-0">
          <Topbar />
        </div>
        <main className="main-section min-h-0 flex-1 overflow-y-auto p-6 bg-[#F8F9FA]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
