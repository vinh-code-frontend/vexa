import { Alert } from 'antd';

type QueryErrorAlertProps = {
  title?: string;
  error?: unknown;
};

const QueryErrorAlert = ({ title, error }: QueryErrorAlertProps) => (
  <Alert
    type="error"
    showIcon
    title={title}
    description={error instanceof Error ? error.message : ''}
  />
);

export default QueryErrorAlert;
