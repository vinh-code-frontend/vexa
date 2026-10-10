import { useState } from 'react';
import { Spin, type FormProps } from 'antd';
import { Alert, Button, Checkbox, Form, Input, Typography } from 'antd';
import { useLocation, useNavigate } from 'react-router';

import { Mail, Lock, Info } from 'lucide-react';
import i18n from '@/i18n';
import { useLoginValidation } from '../../hooks/useValidation';
import { useAuth } from '@/providers/AuthProvider';

import './LoginForm.css';

type FieldType = {
  username?: string;
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
  const [isLoading, setIsLoading] = useState(false);
  const { usernameRules, passwordRules } = useLoginValidation();

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    setLoginError('');
    setIsLoading(true);

    try {
      await login({
        username: values.username ?? '',
        password: values.password ?? '',
      });

      const redirectTo = getSafeRedirect(new URLSearchParams(location.search).get('redirectTo'));
      navigate(redirectTo, { replace: true });
    } catch (error) {
      console.error(error);
      setLoginError(i18n.t('admin-login.error-message'));
    } finally {
      setIsLoading(false);
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = () => {
    setLoginError(i18n.t('admin-login.error-message'));
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
          icon={<Info size={16} />}
          description={<span style={{ color: 'red' }}>{loginError}</span>}
          style={{
            marginBottom: 20,
            padding: 8,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'transparent',
          }}
        />
      )}
      <Form.Item label={i18n.t('admin-login.username-label')} name="username" rules={usernameRules}>
        <Input
          prefix={<Mail size={16} color="black" />}
          placeholder={i18n.t('admin-login.username-placeholder')}
          style={{ height: '40px', fontSize: 14 }}
        />
      </Form.Item>
      <Form.Item
        className="password-form-item"
        label={
          <div className="flex w-full items-center justify-between">
            <span>{i18n.t('admin-login.password-label')}</span>
            <Typography.Link href="#" style={{ color: '#6610F2' }}>
              {i18n.t('admin-login.forgot-password')}
            </Typography.Link>
          </div>
        }
        name="password"
        rules={passwordRules}
      >
        <Input.Password
          prefix={<Lock size={16} color="black" />}
          placeholder={i18n.t('admin-login.password-placeholder')}
          style={{ height: '40px', fontSize: 14 }}
        />
      </Form.Item>
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
      </div>
      <Form.Item style={{ marginBottom: 0 }}>
        <Button
          type="primary"
          htmlType="submit"
          block
          loading={isLoading}
          style={{ height: '40px' }}
        >
          {isLoading ? (
            <Spin />
          ) : (
            <span style={{ fontSize: 14 }}>{i18n.t('admin-login.submit')}</span>
          )}
        </Button>
      </Form.Item>
    </Form>
  );
};
