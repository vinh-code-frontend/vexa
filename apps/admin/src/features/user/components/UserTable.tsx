import { useState } from 'react';

import { Checkbox, Tag } from 'antd';
import { MoreHorizontal } from 'lucide-react';

import { Loading, Pagination } from '@/shared/components';
import i18n from '@/i18n';

import type { UserProps } from '../types/types';

const PAGE_SIZE = 10;

type UserTableProps = {
  users: UserProps[];
  selectedIds: string[];
  loading: boolean;
  onToggleRow: (id: string) => void;
  onToggleAll: (visibleIds: string[]) => void;
};

const statusColors: Record<UserProps['status'], string> = {
  Active: 'green',
  Suspended: 'red',
  'Pending Invitation': 'gold',
  Deleted: 'default',
};
const getStatusLabel = (status: UserProps['status']) => {
  switch (status) {
    case 'Active':
      return i18n.t('users.status.active');
    case 'Suspended':
      return i18n.t('users.status.suspended');
    case 'Pending Invitation':
      return i18n.t('users.status.pending');
    case 'Deleted':
      return i18n.t('users.status.deleted');
  }
};

const UserTable = ({ users, selectedIds, loading, onToggleRow, onToggleAll }: UserTableProps) => {
  const [page, setPage] = useState(1);
  const pageCount = Math.max(1, Math.ceil(users.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const pageUsers = users.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const allSelected =
    pageUsers.length > 0 && pageUsers.every((user) => selectedIds.includes(user.id));
  const isIndeterminate = !allSelected && pageUsers.some((user) => selectedIds.includes(user.id));

  return (
    <>
      <div className="w-full overflow-hidden rounded-xl border border-[#dfe3ea] bg-white">
        <div className="flex items-center border-b border-[#e7e9ee] bg-[#f3f5f8] px-4 py-3 text-[12px] font-semibold tracking-[0.01em] text-[#5d6878]">
          <div className="flex w-12 shrink-0 items-center justify-center">
            <Checkbox
              checked={allSelected}
              indeterminate={isIndeterminate}
              onChange={() => onToggleAll(pageUsers.map((user) => user.id))}
            />
          </div>
          <span className="min-w-0 flex-[1.4]">{i18n.t('users.table.profile')}</span>
          <span className="min-w-0 flex-[1.4]">{i18n.t('users.table.email')}</span>
          <span className="min-w-0 flex-1">{i18n.t('users.table.role')}</span>
          <span className="min-w-0 flex-1">{i18n.t('users.table.status')}</span>
          <span className="min-w-0 flex-1">{i18n.t('users.table.created-date')}</span>
          <span className="w-30 shrink-0 text-right">{i18n.t('users.table.row-actions')}</span>
        </div>

        {loading ? (
          <Loading />
        ) : pageUsers.length === 0 ? (
          <div className="py-8 text-center text-[13px] text-[#667085]">
            {i18n.t('users.table.empty')}
          </div>
        ) : (
          pageUsers.map((user) => {
            const isSelected = selectedIds.includes(user.id);
            const rowClassName = isSelected ? 'bg-[#f4def9]' : 'bg-white';
            const roleLabel =
              user.role === 'Admin'
                ? i18n.t('users.roles.admin')
                : user.role === 'User'
                  ? i18n.t('users.roles.user')
                  : user.role;

            return (
              <div
                key={user.id}
                className={`flex items-center border-b border-[#edf0f2] px-4 py-4 text-[13px] text-[#2b2f36] ${rowClassName}`}
              >
                <div className="flex w-12 shrink-0 items-center justify-center">
                  <Checkbox checked={isSelected} onChange={() => onToggleRow(user.id)} />
                </div>

                <div className="flex min-w-0 flex-[1.4] items-center gap-3">
                  <span className="truncate font-medium text-[#1f2937]">{user.name}</span>
                </div>

                <span className="min-w-0 flex-[1.4] truncate text-[#4d5868]">{user.email}</span>
                <span className="min-w-0 flex-1 truncate font-medium text-[#4b5565]">
                  {roleLabel}
                </span>
                <div className="min-w-0 flex-1">
                  <Tag
                    color={statusColors[user.status]}
                    style={{ fontWeight: 500, marginInlineEnd: 0 }}
                  >
                    {getStatusLabel(user.status)}
                  </Tag>
                </div>
                <span className="min-w-0 flex-1 truncate text-[#4d5868]">{user.createdAt}</span>
                <div className="flex w-30 shrink-0 items-center justify-end gap-3">
                  <button
                    type="button"
                    className="text-[13px] font-medium text-[#5f48c7] hover:text-[#4b3eaa]"
                  >
                    {i18n.t('users.table.view')}
                  </button>
                  <button
                    type="button"
                    className="text-[#6b7280] hover:text-[#374151]"
                    aria-label={i18n.t('users.table.actions-for', { name: user.name })}
                  >
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
      <Pagination
        current={currentPage}
        total={users.length}
        pageSize={PAGE_SIZE}
        onChange={setPage}
        ariaLabel={i18n.t('users.pagination.navigation-label')}
      />
    </>
  );
};

export default UserTable;
