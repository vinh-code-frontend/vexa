import { Alert } from 'antd';

import i18n from '@/i18n';

type QueryErrorAlertProps = {
  title: string;
  error: unknown;
};

const QueryErrorAlert = ({ title, error }: QueryErrorAlertProps) => (
  <Alert
    type="error"
    showIcon
    title={title}
    description={error instanceof Error ? error.message : i18n.t('common.errors.unexpected')}
  />
);

export default QueryErrorAlert;
