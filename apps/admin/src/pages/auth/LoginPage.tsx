import { LoginForm } from './components/LoginForm';
import { Smartphone } from 'lucide-react';
import i18n from '@/i18n';

const LoginPage = () => {
  return (
    <>
      <div className="w-full min-h-dvh flex justify-center items-center bg-[#000c17]">
        <div className="w-100 min-h-101.25 p-10 rounded-lg bg-white">
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="flex flex-row justify-center items-center gap-2">
              <Smartphone color="#1677FF" size={23} />
              <h1 className="font-bold text-2xl">{i18n.t('common.app-name')}</h1>
            </div>
            <div className="pb-3">
              <p className="text-center text-[14px] text-gray-500">
                {i18n.t('admin-login.text-under-icon')}
              </p>
            </div>
          </div>
          <LoginForm />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
