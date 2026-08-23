import { useState } from "react";
import type { FormProps } from "antd";
import { Alert, Button, Checkbox, Form, Input, Typography } from "antd";
import i18n from "@/app/i18n";
import { useLoginValidation } from "../hooks/useValidation";
import {
  CloseCircleOutlined,
  LockOutlined,
  MailOutlined,
} from "@ant-design/icons";
export const LoginForm = () => {
  const [form] = Form.useForm();
  const [loginError, setLoginError] = useState("");

  const { emailRules, passwordRules } = useLoginValidation();

  const onFinish: FormProps["onFinish"] = async (values) => {
    setLoginError("");

    try {
      // await login(values);
      console.log(values);
    } catch {
      setLoginError(i18n.t("admin-login.incorrect-info"));
    }
  };

  const onFinishFailed: FormProps["onFinishFailed"] = () => {
    setLoginError(i18n.t("admin-login.incorrect-info"));
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
          icon={<CloseCircleOutlined style={{ fontSize: "16px" }} />}
          description={loginError}
          style={{
            marginBottom: 20,
            padding: 8,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      )}

      <Form.Item
        label={
          <span style={{ fontWeight: 500 }}>
            {i18n.t("admin-login.email-label")}
          </span>
        }
        name="email"
        rules={emailRules}
      >
        <Input
          prefix={<MailOutlined style={{ fontSize: "16px", color: "black" }} />}
          placeholder={i18n.t("admin-login.email-placeholder")}
          style={{ height: "40px" }}
        />
      </Form.Item>

      <Form.Item
        label={
          <span style={{ fontWeight: 500 }}>
            {i18n.t("admin-login.password-label")}
          </span>
        }
        name="password"
        rules={passwordRules}
      >
        <Input.Password
          prefix={<LockOutlined style={{ fontSize: "16px", color: "black" }} />}
          placeholder={i18n.t("admin-login.password-placeholder")}
          style={{ height: "40px" }}
        />
      </Form.Item>

      <Form.Item>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox style={{ color: "gray" }}>
              {i18n.t("admin-login.remember-me")}
            </Checkbox>
          </Form.Item>

          <Typography.Link href="#">
            {i18n.t("admin-login.forgot-password")}
          </Typography.Link>
        </div>
      </Form.Item>

      <Form.Item style={{ marginBottom: 0 }}>
        <Button
          type="primary"
          htmlType="submit"
          block
          style={{ height: "40px" }}
        >
          {i18n.t("admin-login.submit")}
        </Button>
      </Form.Item>
    </Form>
  );
};
