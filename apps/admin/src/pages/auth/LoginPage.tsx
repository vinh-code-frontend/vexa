import type { FC } from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import { api } from '@/api/axios/instance';

type FieldType = {
  username?: string;
  password?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
  console.log('Success:', values);
  const res = await api.post('/auth/login', {
    username: values.username,
    password: values.password,
  });

  console.log(res.data);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

export const LoginPage: FC = () => (
  <div className="w-full flex flex-col items-center">
    <div className="text-primary text-[24px] font-bold">Login to </div>
    <Form
      name="basic"
      initialValues={{ remember: true }}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
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

export default LoginPage;
