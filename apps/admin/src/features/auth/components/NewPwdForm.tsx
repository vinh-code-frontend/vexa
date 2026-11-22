import {
  CheckCircleFilled,
  CheckCircleOutlined,
  ClockCircleOutlined,
  LockOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import { Alert, Button, Form, Input, Spin, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';

import { getAuth } from '@/api';
import i18n from '@/i18n';
import { QueryErrorAlert } from '@/shared/components';

type NewPwdFields = {
  newPassword: string;
  confirmPassword: string;
};

type PasswordRequirementKey = 'length' | 'uppercase' | 'number' | 'symbol';
type ResetTokenStatus = 'checking' | 'valid' | 'invalid';

const NewPwdForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = new URLSearchParams(location.search).get('token') ?? '';
  const [form] = Form.useForm<NewPwdFields>();
  const [tokenStatus, setTokenStatus] = useState<ResetTokenStatus>(token ? 'checking' : 'invalid');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  useEffect(() => {
    if (!token) return;

    let active = true;
    getAuth()
      .postApiAdminAuthVerifyResetPasswordToken({ token })
      .then(() => {
        if (active) setTokenStatus('valid');
      })
      .catch(() => {
        if (active) setTokenStatus('invalid');
      });

    return () => {
      active = false;
    };
  }, [token]);

  const requirements: { key: PasswordRequirementKey; passed: boolean }[] = [
    { key: 'length', passed: password.length >= 12 },
    { key: 'uppercase', passed: /[A-Z]/.test(password) },
    { key: 'number', passed: /\d/.test(password) },
    { key: 'symbol', passed: /[^A-Za-z0-9]/.test(password) },
  ];
  const strength = requirements.filter((requirement) => requirement.passed).length;
  const strengthColor = strength === 4 ? '#08A77A' : strength >= 2 ? '#E59B17' : '#E5484D';
  const strengthLabel =
    strength === 4
      ? i18n.t('admin-forgot-password.new-password.strength-strong')
      : strength >= 2
        ? i18n.t('admin-forgot-password.new-password.strength-medium')
        : i18n.t('admin-forgot-password.new-password.strength-weak');

  const handleSubmit = async ({ newPassword }: NewPwdFields) => {
    setSubmitError(false);
    setIsSubmitting(true);

    try {
      await getAuth().postApiAdminAuthResetPassword({ token, newPassword });
      navigate('/auth/reset-pwd-success', { replace: true });
    } catch {
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const pageHeader = (
    <>
      <Typography.Text
        className="uppercase"
        style={{ color: '#6610F2', fontSize: 12, fontWeight: 600 }}
      >
        {i18n.t('admin-forgot-password.new-password.eyebrow')}
      </Typography.Text>
      <Typography.Title level={1} style={{ margin: '4px 0 6px', fontSize: 28, fontWeight: 700 }}>
        {i18n.t('admin-forgot-password.new-password.title')}
      </Typography.Title>
      <Typography.Paragraph
        type="secondary"
        style={{ marginBottom: 16, fontSize: 14, lineHeight: 1.6 }}
      >
        {i18n.t('admin-forgot-password.new-password.description')}
      </Typography.Paragraph>
    </>
  );

  if (tokenStatus === 'checking') {
    return (
      <section className="w-full">
        {pageHeader}
        <div className="flex min-h-40 flex-col items-center justify-center gap-3">
          <Spin />
          <Typography.Text type="secondary">
            {i18n.t('admin-forgot-password.new-password.verifying-link')}
          </Typography.Text>
        </div>
      </section>
    );
  }

  if (tokenStatus === 'invalid') {
    return (
      <section className="w-full">
        {pageHeader}
        <QueryErrorAlert
          title={i18n.t('admin-forgot-password.new-password.invalid-link-title')}
          error={i18n.t('admin-forgot-password.new-password.invalid-link-description')}
        />
        <div className="mt-4">
          <Link
            to="/auth/forgot-password"
            className="text-center text-[13px] font-semibold text-[#6610F2] hover:text-[#520DC2]"
          >
            {i18n.t('admin-forgot-password.new-password.request-new-link')}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full">
      {pageHeader}

      <Alert
        type="warning"
        showIcon
        icon={<WarningOutlined style={{ fontSize: 16, paddingTop: 2 }} />}
        title={i18n.t('admin-forgot-password.new-password.link-status-title')}
        description={i18n.t('admin-forgot-password.new-password.link-status-description')}
        styles={{
          root: {
            marginBottom: 18,
            padding: '8px 10px',
            border: '1px solid #F5B041',
            borderRadius: 4,
            backgroundColor: '#FFF9DB',
          },
          icon: { marginInlineEnd: 8, color: '#E67700' },
          section: { gap: 1 },
          title: { color: '#E67700', fontSize: 13, fontWeight: 600, margin: 0 },
          description: { color: '#E67700', fontSize: 12 },
        }}
      />

      {submitError && (
        <QueryErrorAlert error={i18n.t('admin-forgot-password.new-password.submit-error')} />
      )}

      <Form<NewPwdFields>
        form={form}
        name="set-new-password"
        layout="vertical"
        requiredMark={false}
        validateTrigger="onBlur"
        onFinish={handleSubmit}
        onValuesChange={(_, values) => setPassword(values.newPassword ?? '')}
      >
        <Form.Item
          label={i18n.t('admin-forgot-password.new-password.password-label')}
          name="newPassword"
          validateFirst
          rules={[
            {
              required: true,
              message: i18n.t('admin-forgot-password.new-password.password-required'),
            },
            {
              validator: async (_rule, value?: string) => {
                if (!value) return;
                if (value.length < 12) {
                  throw new Error(i18n.t('admin-forgot-password.new-password.password-min-length'));
                }
                if (value.length > 72) {
                  throw new Error(i18n.t('admin-forgot-password.new-password.password-max-length'));
                }
                if (!/[A-Z]/.test(value)) {
                  throw new Error(i18n.t('admin-forgot-password.new-password.password-uppercase'));
                }
                if (!/\d/.test(value)) {
                  throw new Error(i18n.t('admin-forgot-password.new-password.password-number'));
                }
                if (!/[^A-Za-z0-9]/.test(value)) {
                  throw new Error(i18n.t('admin-forgot-password.new-password.password-symbol'));
                }
              },
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined style={{ fontSize: 15 }} />}
            placeholder={i18n.t('admin-forgot-password.new-password.password-placeholder')}
            maxLength={72}
            style={{ height: 40, fontSize: 13 }}
          />
        </Form.Item>

        <div className="-mt-2 mb-4">
          <div className="mb-1 flex justify-between text-[12px] text-[#8993A0]">
            <span>{i18n.t('admin-forgot-password.new-password.strength-label')}</span>
            {password && <span style={{ color: strengthColor }}>{strengthLabel}</span>}
          </div>
          <div className="flex gap-1">
            {[0, 1, 2, 3].map((segment) => (
              <span
                key={segment}
                className="h-1 flex-1 rounded-full"
                style={{ backgroundColor: segment < strength ? strengthColor : '#E5E7EB' }}
              />
            ))}
          </div>
        </div>

        <div className="mb-4">
          <Typography.Text strong style={{ fontSize: 13  }}>
            {i18n.t('admin-forgot-password.new-password.requirements-title')}
          </Typography.Text>
          <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-2">
            {requirements.map(({ key, passed }) => {
              const RequirementIcon = passed ? CheckCircleFilled : CheckCircleOutlined;
              return (
                <div
                  key={key}
                  className="flex items-center gap-1.5 text-[12px]"
                  style={{ color: passed ? '#08A77A' : '#667085' }}
                >
                  <RequirementIcon style={{ fontSize: 13 }} aria-hidden="true" />
                  <span>{i18n.t(`admin-forgot-password.new-password.requirements.${key}`)}</span>
                </div>
              );
            })}
          </div>
        </div>

        <Form.Item
          label={i18n.t('admin-forgot-password.new-password.confirm-label')}
          name="confirmPassword"
          dependencies={['newPassword']}
          validateFirst
          rules={[
            {
              required: true,
              message: i18n.t('admin-forgot-password.new-password.confirm-required'),
            },
            {
              validator: async (_rule, value?: string) => {
                if (value && value !== form.getFieldValue('newPassword')) {
                  throw new Error(i18n.t('admin-forgot-password.new-password.password-mismatch'));
                }
              },
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined style={{ fontSize: 15 }} />}
            placeholder={i18n.t('admin-forgot-password.new-password.confirm-placeholder')}
            maxLength={72}
            style={{ height: 40, fontSize: 13 }}
          />
        </Form.Item>

        <Form.Item style={{ margin: 0 }}>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={isSubmitting}
            style={{ height: 40, fontSize: 13, fontWeight: 600 }}
          >
            {i18n.t('admin-forgot-password.new-password.submit')}
          </Button>
        </Form.Item>
      </Form>

      <div className="mt-4 text-center">
        <Link
          to="/auth/forgot-password"
          className="inline-flex items-center gap-2 text-[12px] font-medium text-[#667085] hover:text-[#6610F2]"
        >
          <ClockCircleOutlined style={{ fontSize: 13 }} aria-hidden="true" />
          {i18n.t('admin-forgot-password.new-password.request-new-link')}
        </Link>
      </div>
    </section>
  );
};

export default NewPwdForm;
