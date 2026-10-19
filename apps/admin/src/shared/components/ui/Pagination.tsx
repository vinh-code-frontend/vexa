import i18n from '@/i18n';

type PaginationProps = {
  current: number;
  total: number;
  pageSize: number;
  onChange: (page: number) => void;
  ariaLabel?: string;
};

export const Pagination = ({ current, total, pageSize, onChange, ariaLabel }: PaginationProps) => {
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const activePage = Math.min(Math.max(current, 1), pageCount);
  const startItem = total === 0 ? 0 : (activePage - 1) * pageSize + 1;
  const endItem = Math.min(activePage * pageSize, total);
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);
  const buttonClassName =
    'inline-flex h-[27px] items-center justify-center rounded-sm border px-2.5 py-1.5 text-xs leading-[normal]';

  return (
    <div className="flex w-full items-center justify-between gap-4 pt-5">
      <span className="text-xs text-[#6C757D]">
        {i18n.t('common.pagination.showing-items', { start: startItem, end: endItem, total })}
      </span>
      <nav
        aria-label={ariaLabel ?? i18n.t('common.pagination.navigation-label')}
        className="flex items-center gap-1"
      >
        <button
          type="button"
          className={`${buttonClassName} border-[#DEE2E6] text-[#212529] hover:bg-[#F8F9FA] disabled:cursor-not-allowed disabled:text-[#ADB5BD]`}
          disabled={activePage <= 1}
          onClick={() => onChange(activePage - 1)}
        >
          {i18n.t('common.pagination.previous')}
        </button>
        {pages.map((page) => (
          <button
            type="button"
            key={page}
            aria-label={i18n.t('common.pagination.page', { page })}
            aria-current={activePage === page ? 'page' : undefined}
            className={
              activePage === page
                ? `${buttonClassName} border-primary bg-primary text-white hover:bg-primary`
                : `${buttonClassName} border-[#DEE2E6] text-[#212529] hover:bg-[#F8F9FA]`
            }
            onClick={() => onChange(page)}
          >
            {page}
          </button>
        ))}
        <button
          type="button"
          className={`${buttonClassName} border-[#DEE2E6] text-[#212529] hover:bg-[#F8F9FA] disabled:cursor-not-allowed disabled:text-[#ADB5BD]`}
          disabled={activePage >= pageCount}
          onClick={() => onChange(activePage + 1)}
        >
          {i18n.t('common.pagination.next')}
        </button>
      </nav>
    </div>
  );
};
