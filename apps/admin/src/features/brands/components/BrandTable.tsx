import { useEffect, useState } from 'react';

import { Table, Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Image, MoreHorizontal } from 'lucide-react';

import type { BrandResponse } from '@/api/generated/query/model/types/brand';
import { Pagination } from '../../../shared/components/ui/Pagination';
import i18n from '@/i18n';

const PAGE_SIZE = 4;

type BrandTableProps = {
  brands: BrandResponse[];
  loading?: boolean;
  onEdit: () => void;
};

const renderBrandDetails = (brand: BrandResponse) => (
  <div className="flex items-center gap-3">
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#F1F3F5]">
      {brand.logoUrl ? (
        <img src={brand.logoUrl} alt={brand.name} className="h-full w-full object-contain" />
      ) : (
        <Image size={16} className="text-[#495057]" aria-hidden="true" />
      )}
    </div>
    <Typography.Text className="text-[#212529]" strong title={brand.name}>
      {brand.name}
    </Typography.Text>
  </div>
);

const getColumns = (onEdit: () => void): ColumnsType<BrandResponse> => [
  {
    title: i18n.t('brands.table.brand-details'),
    key: 'brandDetails',
    render: (_value, brand) => renderBrandDetails(brand),
  },
  {
    title: i18n.t('brands.table.slug'),
    dataIndex: 'slug',
    key: 'slug',
  },
  {
    title: i18n.t('brands.table.display-order'),
    dataIndex: 'displayOrder',
    key: 'displayOrder',
    render: (displayOrder?: number | string | null) => displayOrder ?? '—',
  },
  {
    title: i18n.t('brands.table.status'),
    dataIndex: 'isActive',
    key: 'isActive',
    render: (isActive?: boolean) => (
      <Tag color={isActive ? 'green' : 'default'} style={{ fontWeight: 500 }}>
        {isActive ? i18n.t('brands.filter.status.active') : i18n.t('brands.filter.status.inactive')}
      </Tag>
    ),
  },
  {
    title: i18n.t('brands.table.row-actions'),
    key: 'actions',
    align: 'right',
    render: () => (
      <div className="flex items-center justify-end gap-3">
        <button type="button" className="font-medium text-violet-700" onClick={onEdit}>
          {i18n.t('brands.actions.edit')}
        </button>
        <MoreHorizontal size={18} className="text-[#6C757D]" aria-hidden="true" />
      </div>
    ),
  },
];

export const BrandTable = ({ brands, loading = false, onEdit }: BrandTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageCount = Math.max(1, Math.ceil(brands.length / PAGE_SIZE));
  const visiblePage = Math.min(currentPage, pageCount);

  useEffect(() => {
    setCurrentPage(1);
  }, [brands]);

  const paginatedBrands = brands.slice((visiblePage - 1) * PAGE_SIZE, visiblePage * PAGE_SIZE);

  return (
    <>
      <Table<BrandResponse>
        rowKey={(brand) => String(brand.id)}
        columns={getColumns(onEdit)}
        dataSource={paginatedBrands}
        pagination={false}
        loading={loading}
        locale={{ emptyText: i18n.t('brands.table.empty') }}
      />
      <Pagination
        current={visiblePage}
        total={brands.length}
        pageSize={PAGE_SIZE}
        onChange={setCurrentPage}
        ariaLabel={i18n.t('brands.pagination.navigation-label')}
      />
    </>
  );
};
