import { Input, Select, Space } from 'antd';

import i18n from '@/i18n';

type UserFilterProps = {
  search: string;
  role: string;
  status: string;
  onSearchChange: (value: string) => void;
  onRoleChange: (value: string) => void;
  onStatusChange: (value: string) => void;
};

const UserFilter = ({
  search,
  role,
  status,
  onSearchChange,
  onRoleChange,
  onStatusChange,
}: UserFilterProps) => {
  const roleOptions = [
    { label: i18n.t('users.filter.roles.all'), value: 'All Roles' },
    { label: i18n.t('users.filter.roles.admin'), value: 'Admin' },
    { label: i18n.t('users.filter.roles.user'), value: 'User' },
  ];
  const statusOptions = [
    { label: i18n.t('users.filter.statuses.all'), value: 'All Statuses' },
    { label: i18n.t('users.filter.statuses.active'), value: 'Active' },
    { label: i18n.t('users.filter.statuses.suspended'), value: 'Suspended' },
    { label: i18n.t('users.filter.statuses.pending'), value: 'Pending Invitation' },
    { label: i18n.t('users.filter.statuses.deleted'), value: 'Deleted' },
  ];
  const selectedRole = roleOptions.find((option) => option.value === role)?.label ?? role;
  const selectedStatus = statusOptions.find((option) => option.value === status)?.label ?? status;

  return (
    <Space wrap className="mb-4 h-8 w-full">
      <Input
        allowClear
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder={i18n.t('users.filter.search-placeholder')}
        styles={{ root: { width: 280, height: 32, fontSize: 13 } }}
      />
      <Select
        value={role}
        onChange={onRoleChange}
        labelRender={() => (
          <span className="text-[13px]">
            {i18n.t('users.filter.role-label')}:{' '}
            <span className="px-2 font-semibold">{selectedRole}</span>
          </span>
        )}
        className="flex h-8 w-43.25 px-2 py-3"
        options={roleOptions}
      />
      <Select
        value={status}
        onChange={onStatusChange}
        labelRender={() => (
          <span className="text-[13px]">
            {i18n.t('users.filter.status-label')}:{' '}
            <span className="px-2 font-semibold">{selectedStatus}</span>
          </span>
        )}
        className="flex h-8 w-43.25 px-2 py-3"
        options={statusOptions}
      />
    </Space>
  );
};

export default UserFilter;
