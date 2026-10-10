import { CircleX } from 'lucide-react';
import { LoginForm } from './components/LoginForm';
import i18n from '@/i18n';

const LoginPage = () => {
  return (
    <>
      <div className="w-full min-h-dvh flex flex-row">
        <div className="w-140 bg-[#160059] p-16 ">
          <div className="h-full flex flex-col justify-between">
            {/* Header Icon - App name */}
            <div className="flex flex-row text-white items-center gap-3">
              <div className="h-8 w-8 bg-[#6610F2] flex items-center justify-center rounded-md">
                <CircleX size={12} />
              </div>
              <h1 className="font-bold text-[22px]">{i18n.t('common.app-name')}</h1>
            </div>
            {/* Middle Message - Description */}
            <div className="flex flex-col gap-6">
              <h1 className="font-bold text-4xl text-white">
                {i18n.t('admin-login.sidebar-middle-message')}
              </h1>

              <span className="text-[#C48CFF]">
                {i18n.t('admin-login.sidebar-middle-description')}
              </span>
            </div>
            {/* Footer Version - Copyright */}
            <div className="flex flex-col gap-3">
              <span style={{ fontSize: 13, color: '#A963FF' }}>
                {i18n.t('admin-login.sidebar-footer-app-version').replace('{0}', '2.4.1')}
              </span>
              <span style={{ fontSize: 12, color: '#8C3BFF' }}>
                {i18n.t('admin-login.sidebar-footer-app-copyright')}
              </span>
            </div>
          </div>
        </div>
        <div className="w-4/6 min-h-dvh p-20 rounded-lg bg-white flex flex-col justify-center">
          <div className="w-full max-w-md mx-auto flex flex-col items-start gap-2">
            <div className="flex flex-row gap-2">
              <h1 className="font-bold text-2xl">{i18n.t('admin-login.welcome-back')}</h1>
            </div>
            <div className="pb-3">
              <p className="text-center text-[14px] text-gray-500">
                {i18n.t('admin-login.login-description')}
              </p>
            </div>
          </div>
          <div className="w-full max-w-md mx-auto">
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
