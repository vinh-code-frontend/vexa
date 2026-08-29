import { Outlet } from 'react-router';

const MainLayout = () => {
  return (
    <div className="main-layout">
      <Outlet />
    </div>
  );
};

export default MainLayout;
