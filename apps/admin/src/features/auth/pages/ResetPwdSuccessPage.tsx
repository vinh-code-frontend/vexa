import {
  CheckOutlined,
  ClockCircleOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';
import { Button, Card, Typography } from 'antd';
import { useNavigate } from 'react-router';

import i18n from '@/i18n';

const ResetPwdSuccessPage = () => {
  const navigate = useNavigate();

  return (
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
                4
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#C48CFF]">
                {i18n.t('admin-forgot-password.side.step')}
              </span>
            </div>
            <h1 className="font-bold text-4xl text-white">
              {i18n.t('admin-forgot-password.success.side.title')}
            </h1>
            <span className="text-[#C48CFF]">
              {i18n.t('admin-forgot-password.success.side.description')}
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
        <section className="w-full max-w-102.5">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0AA77A] text-white">
            <CheckOutlined style={{ fontSize: 18 }} aria-hidden="true" />
          </div>
          <Typography.Text
            className="uppercase"
            style={{ color: '#6610F2', fontSize: 12, fontWeight: 600 }}
          >
            {i18n.t('admin-forgot-password.success.eyebrow')}
          </Typography.Text>
          <Typography.Title
            level={1}
            style={{ margin: '4px 0 6px', fontSize: 28, fontWeight: 700 }}
          >
            {i18n.t('admin-forgot-password.success.title')}
          </Typography.Title>
          <Typography.Paragraph
            type="secondary"
            style={{ marginBottom: 16, fontSize: 14, lineHeight: 1.6 }}
          >
            {i18n.t('admin-forgot-password.success.description')}
          </Typography.Paragraph>

          <Card
            className="w-full"
            styles={{
              body: { display: 'flex', flexDirection: 'column', gap: '12px', padding: 16 },
            }}
          >
            <div className="flex items-center gap-2">
              <SafetyCertificateOutlined
                className="shrink-0 text-[#0AA77A]"
                style={{ fontSize: 15 }}
                aria-hidden="true"
              />
              <Typography.Text strong style={{ fontSize: 12 }}>
                {i18n.t('admin-forgot-password.success.card-title')}
              </Typography.Text>
            </div>
            <Typography.Paragraph
              type="secondary"
              style={{ margin: '8px 0 10px', fontSize: 13, lineHeight: 1.5 }}
            >
              {i18n.t('admin-forgot-password.success.card-description')}
            </Typography.Paragraph>
            <div className="flex items-center gap-2 text-[12px] text-[#8993A0]">
              <ClockCircleOutlined style={{ fontSize: 13 }} aria-hidden="true" />
              {i18n.t('admin-forgot-password.success.changed-time')}
            </div>
          </Card>

          <Button
            type="primary"
            block
            onClick={() => navigate('/auth/login')}
            style={{ height: 40, marginTop: 16, fontSize: 14, fontWeight: 600 }}
          >
            {i18n.t('admin-forgot-password.success.return-to-login')}
          </Button>

          <Typography.Paragraph
            type="secondary"
            style={{ margin: '20px 0 0', textAlign: 'center', fontSize: 12, lineHeight: 1.5 }}
          >
            {i18n.t('admin-forgot-password.success.support-note')}{' '}
            <a
              href={`mailto:${i18n.t('admin-forgot-password.confirmation.support-email')}`}
              style={{ color: '#6610F2' }}
            >
              {i18n.t('admin-forgot-password.confirmation.support-email')}
            </a>
          </Typography.Paragraph>
        </section>
      </main>
    </div>
  );
};

export default ResetPwdSuccessPage;
