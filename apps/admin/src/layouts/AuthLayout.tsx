import { Outlet } from 'react-router';

const AuthLayout = () => {
  return (
    <div className="auth-layout flex items-center justify-center min-h-screen">
      <div className="p-4 max-w-150 w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
