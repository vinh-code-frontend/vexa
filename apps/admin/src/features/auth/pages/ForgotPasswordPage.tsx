import { ForgotPasswordForm } from '../components';

import i18n from '@/i18n';

const ForgotPasswordPage = () => {
  return (
    <>
      <div className="w-full min-h-dvh flex flex-row">
        <div className="w-140 bg-[#160059] p-16 ">
          <div className="h-full flex flex-col justify-between">
            {/* Header Icon - App name */}
            <div className="flex items-center gap-3 text-white">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#6610F2] text-sm font-bold">
                V
              </div>
              <span className="text-lg font-bold">{i18n.t('common.app-name')}</span>
            </div>
            {/* Middle Message - Description */}
            <div className="flex max-w-110 flex-col gap-5">
              <div className="flex items-center gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#6610F2] text-[10px] font-semibold text-white">
                  1
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#C48CFF]">
                  {i18n.t('admin-forgot-password.side.step')}
                </span>
              </div>
              <div className="flex flex-col gap-4">
                <h1 className="max-w-90 text-3xl leading-tight font-bold text-white">
                  {i18n.t('admin-forgot-password.side.title')}
                </h1>
                <p className="max-w-110 text-[13px] leading-5 text-[#C48CFF]">
                  {i18n.t('admin-forgot-password.side.description')}
                </p>
              </div>
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
          <div className="w-full max-w-md mx-auto">
            <ForgotPasswordForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
