import type { Rule } from "antd/es/form";
import i18n from "@/app/i18n";

export const useLoginValidation = () => {
  const emailRules: Rule[] = [
    {
      required: true,
      message: i18n.t("admin-login.incorrect-info"),
    },
    {
      type: "email",
      message: i18n.t("admin-login.incorrect-info"),
    },
  ];

  const passwordRules: Rule[] = [
    {
      required: true,
      message: i18n.t("admin-login.incorrect-info"),
    },
  ];

  return { emailRules, passwordRules };
};
