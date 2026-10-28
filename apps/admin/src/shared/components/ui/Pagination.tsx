import { Pagination as AntdPagination } from 'antd';

import i18n from '@/i18n';
import './Pagination.css';

type PaginationProps = {
  current: number;
  total: number;
  pageSize: number;
  onChange: (page: number) => void;
  ariaLabel?: string;
};
 const Pagination = ({ current, total, pageSize, onChange, ariaLabel }: PaginationProps) => {
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const activePage = Math.min(Math.max(current, 1), pageCount);

  return (
    <div className="flex w-full items-center justify-between gap-4 pt-5">
      <span className="text-xs text-[#6C757D]">
        {i18n.t('common.pagination.showing-items', {
          start: total === 0 ? 0 : (activePage - 1) * pageSize + 1,
          end: Math.min(activePage * pageSize, total),
          total,
        })}
      </span>
      <AntdPagination
        current={activePage}
        total={total}
        pageSize={pageSize}
        size="small"
        showSizeChanger={false}
        rootClassName="pagination-control"
        aria-label={ariaLabel ?? i18n.t('common.pagination.navigation-label')}
        itemRender={(page, type) => {
          if (type === 'page') {
            return (
              <a
                rel="nofollow"
                aria-label={i18n.t('common.pagination.page', { page })}
                aria-current={page === activePage ? 'page' : undefined}
              >
                {page}
              </a>
            );
          }

          if (type === 'prev' || type === 'next') {
            return (
              <a rel="nofollow">
                {i18n.t(type === 'prev' ? 'common.pagination.previous' : 'common.pagination.next')}
              </a>
            );
          }

          return null;
        }}
        onChange={onChange}
      />
    </div>
  );
};

export default Pagination