import type { FC } from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input, message } from 'antd';
import { useLocation, useNavigate } from 'react-router';

import { useAuth } from '@/providers/AuthProvider';

type FieldType = {
  username?: string;
  password?: string;
};

const getSafeRedirect = (value: string | null) => {
  if (!value || !value.startsWith('/') || value.startsWith('//') || value.includes('\\')) {
    return '/';
  }

  return value;
};

export const LoginPage: FC = () => {
  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      await login({
        username: values.username ?? '',
        password: values.password ?? '',
      });

      const redirectTo = getSafeRedirect(new URLSearchParams(location.search).get('redirectTo'));
      navigate(redirectTo, { replace: true });
    } catch {
      messageApi.error('Unable to sign in');
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {contextHolder}
      <div className="text-primary text-[24px] font-bold">Login to </div>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        className="w-full"
      >
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input type="text" placeholder="Enter your username..." />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Enter your password..." />
        </Form.Item>

        <Form.Item label={null}>
          <div className="flex justify-center gap-3 pt-4">
            <Button type="primary" htmlType="submit">
              Login
            </Button>
            <Button>Forgot password</Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
