import { NewPwdForm } from '../components';

import i18n from '@/i18n';

const SetNewPwdPage = () => (
  <div className="flex min-h-dvh w-full flex-row">
    <aside className="w-140 bg-[#160059] p-16">
      <div className="h-full flex flex-col justify-between">
        <div className="flex items-center gap-3 text-white">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#6610F2] text-sm font-bold">
            V
          </div>
          <span className="text-lg font-bold">{i18n.t('common.app-name')}</span>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#6610F2] text-[10px] font-semibold text-white">
              3
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#C48CFF]">
              {i18n.t('admin-forgot-password.side.step')}
            </span>
          </div>
          <h1 className="font-bold text-4xl text-white">
            {i18n.t('admin-forgot-password.new-password.side.title')}
          </h1>
          <span className="text-[#C48CFF]">
            {i18n.t('admin-forgot-password.new-password.side.description')}
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <span style={{ fontSize: 13, color: '#A963FF' }}>
            {i18n.t('admin-login.sidebar-footer-app-version').replace('{0}', '2.4.1')}
          </span>
          <span style={{ fontSize: 12, color: '#8C3BFF' }}>
            {i18n.t('admin-login.sidebar-footer-app-copyright')}
          </span>
        </div>
      </div>
    </aside>

    <main className="flex min-h-dvh flex-1 items-center justify-center bg-[#F8F9FA] px-6 py-10 lg:px-12">
      <div className="w-full max-w-102.5">
        <NewPwdForm />
      </div>
    </main>
  </div>
);

export default SetNewPwdPage;
