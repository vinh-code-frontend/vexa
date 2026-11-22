import {
  ArrowLeftOutlined,
  ClockCircleOutlined,
  MailOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';
import { Alert, Button, Card, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router';

import { getAuth } from '@/api';
import i18n from '@/i18n';

type ResetLinkSentLocationState = {
  email?: string;
  cooldownEndsAt?: number;
} | null;

const RESEND_COOLDOWN_MS = 60 * 1000;

const formatCountdown = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const remainingSeconds = (seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${remainingSeconds}`;
};

const ResetLinkSentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as ResetLinkSentLocationState;
  const email = state?.email ?? '';
  const [resendAvailableAt, setResendAvailableAt] = useState(state?.cooldownEndsAt ?? 0);
  const [now, setNow] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const [resendError, setResendError] = useState(false);

  useEffect(() => {
    const updateTime = () => setNow(Date.now());
    updateTime();
    const timer = window.setInterval(updateTime, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const secondsRemaining = Math.max(0, Math.ceil((resendAvailableAt - now) / 1000));

  const handleResend = async () => {
    setResendError(false);
    setIsResending(true);

    try {
      await getAuth().postApiAdminAuthForgotPassowrd({ email });
      const nextAvailableAt = Date.now() + RESEND_COOLDOWN_MS;
      setResendAvailableAt(nextAvailableAt);
      setNow(Date.now());
    } catch {
      setResendError(true);
    } finally {
      setIsResending(false);
    }
  };

  if (!email) {
    return <Navigate to="/auth/forgot-password" replace />;
  }

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
                2
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#C48CFF]">
                {i18n.t('admin-forgot-password.side.step')}
              </span>
            </div>
            <h1 className="font-bold text-4xl text-white">
              {i18n.t('admin-forgot-password.confirmation.side.title')}
            </h1>
            <span className="text-[#C48CFF]">
              {i18n.t('admin-forgot-password.confirmation.side.description')}
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
          <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#E6F8F2] text-[#00A879]">
            <MailOutlined style={{ fontSize: 17 }} aria-hidden="true" />
          </div>
          <Typography.Text
            className="text-[10px] font-semibold uppercase"
            style={{ color: '#6610F2' }}
          >
            {i18n.t('admin-forgot-password.confirmation.eyebrow')}
          </Typography.Text>
          <Typography.Title
            level={1}
            style={{ margin: '4px 0 6px', fontSize: 28, fontWeight: 700 }}
          >
            {i18n.t('admin-forgot-password.confirmation.title')}
          </Typography.Title>
          <Typography.Paragraph
            type="secondary"
            style={{ marginBottom: 16, fontSize: 12, lineHeight: 1.6 }}
          >
            {i18n.t('admin-forgot-password.confirmation.description')}
          </Typography.Paragraph>

          <Card className="w-full" styles={{ body: { padding: 12 } }}>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#F1EAFE] text-[#6610F2]">
                <MailOutlined style={{ fontSize: 15 }} aria-hidden="true" />
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <Typography.Text type="secondary" style={{ fontSize: 11 }}>
                  {i18n.t('admin-forgot-password.confirmation.sent-to')}
                </Typography.Text>
                <Typography.Text strong className="truncate" style={{ fontSize: 14 }}>
                  {email}
                </Typography.Text>
              </div>
              <Button
                size="small"
                onClick={() => navigate('/auth/forgot-password', { state: { email } })}
                style={{ color: '#6610F2', fontSize: 12, fontWeight: 600 }}
              >
                {i18n.t('admin-forgot-password.confirmation.change-email')}
              </Button>
            </div>
            <div className="my-3 border-t border-[#E9ECEF]" />
            <div className="flex items-start gap-2 text-[11px] leading-4 text-[#6C757D]">
              <SafetyCertificateOutlined
                className="mt-0.5 shrink-0"
                style={{ fontSize: 14 }}
                aria-hidden="true"
              />
              <span>{i18n.t('admin-forgot-password.confirmation.single-use')}</span>
            </div>
          </Card>

          {resendError && (
            <Alert
              type="error"
              showIcon
              description={i18n.t('admin-forgot-password.confirmation.resend-error')}
              style={{ marginTop: 12 }}
            />
          )}

          <div className="my-4 flex items-center justify-between gap-3">
            <Typography.Text
              type="secondary"
              className="flex items-center gap-2"
              style={{ fontSize: 13 }}
            >
              <ClockCircleOutlined style={{ fontSize: 13 }} aria-hidden="true" />
              {secondsRemaining > 0
                ? i18n.t('admin-forgot-password.confirmation.resend-countdown', {
                    time: formatCountdown(secondsRemaining),
                  })
                : i18n.t('admin-forgot-password.confirmation.resend-ready')}
            </Typography.Text>
            <Button
              size="small"
              disabled={secondsRemaining > 0}
              loading={isResending}
              onClick={handleResend}
              style={{ color: '#6610F2', fontSize: 12, fontWeight: 600 }}
            >
              {i18n.t('admin-forgot-password.confirmation.resend')}
            </Button>
          </div>

          <Card className="w-full" styles={{ body: { padding: 12 } }}>
            <Typography.Text strong style={{ fontSize: 13 }}>
              {i18n.t('admin-forgot-password.confirmation.help-title')}
            </Typography.Text>
            <Typography.Paragraph
              type="secondary"
              style={{ margin: '4px 0 6px', fontSize: 12, lineHeight: 1.5 }}
            >
              {i18n.t('admin-forgot-password.confirmation.help-description')}
            </Typography.Paragraph>
            <a
              href={`mailto:${i18n.t('admin-forgot-password.confirmation.support-email')}`}
              style={{ color: '#6610F2', fontSize: 13, fontWeight: 700 }}
            >
              {i18n.t('admin-forgot-password.confirmation.support-email')}
            </a>
          </Card>

          <div className="mt-5 flex justify-center">
            <Link
              to="/auth/login"
              className="inline-flex items-center gap-2 text-[12px] font-medium text-[#6C757D] hover:text-[#520DC2]"
            >
              <ArrowLeftOutlined style={{ fontSize: 14 }} aria-hidden="true" />
              {i18n.t('admin-forgot-password.confirmation.back-to-login')}
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ResetLinkSentPage;
