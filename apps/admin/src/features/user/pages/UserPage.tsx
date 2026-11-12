import { useMemo, useState } from 'react';

import { Button, Typography } from 'antd';
import { Plus, SquareCheckBig } from 'lucide-react';

import { useGetApiAdminUsers } from '@/api';
import { QueryModels } from '@/api';
import { UserFilter, UserTable } from '@/features/user/components';
import type { UserProps } from '@/features/user/types/types';
import i18n from '@/i18n';
import { QueryErrorAlert } from '@/shared/components';

const formatCreatedAt = (value?: string) => {
  if (!value) return '—';

  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString(i18n.language, {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      });
};

const mapUser = (user: QueryModels.UserResponse): UserProps => ({
  id: user.id ?? '',
  name: user.username ?? user.email ?? i18n.t('users.fallback.unknown-name'),
  email: user.email ?? '',
  role: user.role ?? 'User',
  status:
    user.status === QueryModels.UserStatus.Pending
      ? 'Pending Invitation'
      : (user.status ?? QueryModels.UserStatus.Active),
  createdAt: formatCreatedAt(user.createdAt),
});

const UserPage = () => {
  const usersQuery = useGetApiAdminUsers();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('All Roles');
  const [status, setStatus] = useState('All Statuses');

  const users = useMemo(() => (usersQuery.data?.data ?? []).map(mapUser), [usersQuery.data]);

  const toggleRow = (id: string) => {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((value) => value !== id) : [...current, id],
    );
  };

  const toggleAll = (visibleIds: string[]) => {
    setSelectedIds((current) => {
      const currentSet = new Set(current);
      const shouldSelectAll = visibleIds.some((id) => !currentSet.has(id));

      if (shouldSelectAll) {
        return Array.from(new Set([...current, ...visibleIds]));
      }

      return current.filter((id) => !visibleIds.includes(id));
    });
  };

  if (usersQuery.error) {
    return <QueryErrorAlert title={i18n.t('users.errors.load-title')} error={usersQuery.error} />;
  }

  return (
    <section className="flex h-full min-h-0 w-full flex-col gap-4">
      <header className="flex flex-col">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <Typography.Title level={2} styles={{ root: { margin: 0 } }}>
              {i18n.t('users.page.title')}
            </Typography.Title>
            <Typography.Text type="secondary">{i18n.t('users.page.description')}</Typography.Text>
          </div>

          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-lg border border-[#dfe3ea] bg-[#f3f5f8] px-2.5 py-1.5 text-[12px] font-medium text-[#475467]"></div>
            <Button style={{ fontSize: 13 }}>
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#ebe8ff] text-[#4f46e5]">
                <SquareCheckBig size={12} />
              </span>
              <span>{i18n.t('users.selection.selected-count', { count: selectedIds.length })}</span>

              <span>{i18n.t('users.actions.bulk')}</span>
            </Button>
            <Button style={{ fontSize: 13 }}>{i18n.t('users.actions.export')}</Button>
            <Button type="primary" icon={<Plus size={13} />} style={{ fontSize: 13 }}>
              {i18n.t('users.actions.create')}
            </Button>
          </div>
        </div>
        <UserFilter
          search={search}
          role={role}
          status={status}
          onSearchChange={(value) => {
            setSearch(value);
          }}
          onRoleChange={(value) => {
            setRole(value);
          }}
          onStatusChange={(value) => {
            setStatus(value);
          }}
        />
      </header>

      <UserTable
        users={users}
        selectedIds={selectedIds}
        loading={usersQuery.isFetching}
        onToggleRow={toggleRow}
        onToggleAll={toggleAll}
      />
    </section>
  );
};

export default UserPage;
