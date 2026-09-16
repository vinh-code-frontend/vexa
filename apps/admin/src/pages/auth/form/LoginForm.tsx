import { useState } from 'react';
import type { FormProps } from 'antd';
import { Alert, Button, Checkbox, Form, Input, Typography } from 'antd';
import { useLocation, useNavigate } from 'react-router';

import { CloseCircleOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import i18n from '@/i18n';
import { useLoginValidation } from '@/pages/hooks/useValidation';
import { useAuth } from '@/providers/AuthProvider';

import './styles/form.css';

type FieldType = {
  email?: string;
  password?: string;
  remember?: boolean;
};

const getSafeRedirect = (value: string | null) => {
  if (!value || !value.startsWith('/') || value.startsWith('//') || value.includes('\\')) {
    return '/';
  }

  return value;
};

export const LoginForm = () => {
  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [form] = Form.useForm<FieldType>();
  const [loginError, setLoginError] = useState('');
  const { usernameRules, passwordRules } = useLoginValidation();

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    setLoginError('');

    try {
      await login({
        username: values.email ?? '',
        password: values.password ?? '',
      });

      const redirectTo = getSafeRedirect(new URLSearchParams(location.search).get('redirectTo'));
      navigate(redirectTo, { replace: true });
    } catch {
      setLoginError(i18n.t('admin-login.incorrect-info'));
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = () => {
    setLoginError(i18n.t('admin-login.incorrect-info'));
  };

  return (
    <Form
      form={form}
      name="login"
      className="login-form"
      layout="vertical"
      initialValues={{ remember: true }}
      validateTrigger="onBlur"
      requiredMark={false}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      {loginError && (
        <Alert
          type="error"
          showIcon
          icon={<CloseCircleOutlined style={{ fontSize: '16px' }} />}
          description={loginError}
          style={{
            marginBottom: 20,
            padding: 8,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      )}

      <Form.Item label={i18n.t('admin-login.email-label')} name="email" rules={usernameRules}>
        <Input
          prefix={<MailOutlined style={{ fontSize: '16px', color: 'black' }} />}
          placeholder={i18n.t('admin-login.email-placeholder')}
          style={{ height: '40px' }}
        />
      </Form.Item>

      <Form.Item label={i18n.t('admin-login.password-label')} name="password" rules={passwordRules}>
        <Input.Password
          prefix={<LockOutlined style={{ fontSize: '16px', color: 'black' }} />}
          placeholder={i18n.t('admin-login.password-placeholder')}
          style={{ height: '40px' }}
        />
      </Form.Item>

      {!loginError && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 22,
            lineHeight: 22,
            marginBottom: 16,
          }}
        >
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox style={{ color: 'gray' }}>{i18n.t('admin-login.remember-me')}</Checkbox>
          </Form.Item>

          <Typography.Link href="#">{i18n.t('admin-login.forgot-password')}</Typography.Link>
        </div>
      )}

      <Form.Item style={{ marginBottom: 0 }}>
        <Button type="primary" htmlType="submit" block style={{ height: '40px' }}>
          {i18n.t('admin-login.submit')}
        </Button>
      </Form.Item>
    </Form>
  );
};
