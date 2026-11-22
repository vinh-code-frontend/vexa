import { ArrowLeftOutlined, InfoCircleOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, List, Typography } from 'antd';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';

import { getAuth } from '@/api';
import i18n from '@/i18n';
import { QueryErrorAlert } from '@/shared/components';

type ForgotPasswordFields = {
  email: string;
};

type ForgotPasswordLocationState = {
  email?: string;
} | null;

const validationMessage = (message: string) => (
  <span className="inline-flex items-center gap-1 text">
    <InfoCircleOutlined />
    {message}
  </span>
);

export const ForgotPasswordForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const initialEmail = (location.state as ForgotPasswordLocationState)?.email;

  const securityNotes = [
    { id: 'email', text: i18n.t('admin-forgot-password.security-note.email') },
    { id: 'protection', text: i18n.t('admin-forgot-password.security-note.protection') },
  ];

  const handleSubmit = async ({ email }: ForgotPasswordFields) => {
    setSubmitError(false);
    setIsSubmitting(true);

    try {
      await getAuth().postApiAdminAuthForgotPassowrd({ email });
      navigate('/auth/reset-link-sent', {
        state: { email, cooldownEndsAt: Date.now() + 60 * 1000 },
      });
    } catch {
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="mb-2">
        <Typography.Title level={2} style={{ marginBottom: 8, fontWeight: 700 }}>
          {i18n.t('admin-forgot-password.title')}
        </Typography.Title>
        <Typography.Text type="secondary">
          {i18n.t('admin-forgot-password.description')}
        </Typography.Text>
      </div>

      <Form<ForgotPasswordFields>
        name="forgot-password"
        layout="vertical"
        initialValues={initialEmail ? { email: initialEmail } : undefined}
        requiredMark={false}
        validateTrigger="onBlur"
        onFinish={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        {submitError && <QueryErrorAlert title={i18n.t('admin-forgot-password.request-error')} />}
        <Form.Item
          label={i18n.t('admin-forgot-password.email-label')}
          name="email"
          rules={[
            {
              required: true,
              message: validationMessage(i18n.t('admin-forgot-password.email-required')),
            },
            {
              type: 'email',
              message: validationMessage(i18n.t('admin-forgot-password.email-invalid')),
            },
          ]}
        >
          <Input
            type="email"
            autoComplete="email"
            prefix={<MailOutlined style={{ fontSize: 16 }} />}
            placeholder={i18n.t('admin-forgot-password.email-placeholder')}
            style={{ height: 40, fontSize: 14 }}
          />
        </Form.Item>

        <Form.Item style={{ margin: 0 }}>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={isSubmitting}
            style={{ height: 40 }}
          >
            {i18n.t('admin-forgot-password.submit')}
          </Button>
        </Form.Item>
      </Form>

      <div className="flex w-full justify-center">
        <Link
          to="/auth/login"
          className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#6C757D] hover:text-[#520DC2]"
        >
          <ArrowLeftOutlined style={{ fontSize: 16 }} aria-hidden="true" />
          {i18n.t('admin-forgot-password.back-to-login')}
        </Link>
      </div>

      <Card
        className="w-full"
        styles={{ body: { padding: 12, display: 'flex', flexDirection: 'column', gap: 8 } }}
      >
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
          <Typography.Text strong style={{ fontSize: 12 }}>
            {i18n.t('admin-forgot-password.security-note.title')}
          </Typography.Text>
          <Typography.Text type="secondary" style={{ fontSize: 11 }}>
            {i18n.t('admin-forgot-password.security-note.expires')}
          </Typography.Text>
        </div>
        <List
          className="mt-2"
          size="small"
          split={false}
          dataSource={securityNotes}
          rowKey="id"
          renderItem={(note) => (
            <List.Item
              style={{
                padding: 0,
                border: 0,
              }}
            >
              <div className="flex items-start gap-2 text-[12px] leading-4 text-[#6C757D]">
                <span
                  aria-hidden="true"
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6610F2]"
                />
                {note.text}
              </div>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};
