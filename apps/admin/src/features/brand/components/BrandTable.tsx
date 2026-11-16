import { Table, Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Image } from 'lucide-react';
import { Link } from 'react-router';

import BrandDeleteConfirmation from './BrandDeleteConfirmation';

import { QueryModels } from '@/api';
import i18n from '@/i18n';
import { Pagination } from '@/shared/components';
import { EditIcon } from '@/shared/components/motions';

export const BRAND_PAGE_SIZE = 10;

type BrandTableProps = {
  brands: QueryModels.BrandResponse[];
  page: number;
  total: number;
  loading?: boolean;
  deletingBrandId?: number | null;
  onEdit: (brand: QueryModels.BrandResponse) => void;
  onDelete: (brand: QueryModels.BrandResponse) => Promise<void>;
  onPageChange: (page: number) => void;
};

const renderBrandDetails = (brand: QueryModels.BrandResponse) => (
  <div className="flex items-center gap-3">
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#F1F3F5]">
      {brand.logoUrl ? (
        <img src={brand.logoUrl} alt={brand.name} className="h-full w-full object-contain" />
      ) : (
        <Image size={16} className="text-[#495057]" aria-hidden="true" />
      )}
    </div>
    {brand.id !== undefined && brand.id !== null ? (
      <Link
        to={`/brand/${brand.id}`}
        title={brand.name}
        style={{
          color: '#212529',
          fontWeight: 600,
        }}
      >
        {brand.name}
      </Link>
    ) : (
      <Typography.Text style={{ color: '#212529' }} strong title={brand.name}>
        {brand.name}
      </Typography.Text>
    )}
  </div>
);

const getColumns = (
  onEdit: (brand: QueryModels.BrandResponse) => void,
  onDelete: (brand: QueryModels.BrandResponse) => Promise<void>,
  deletingBrandId: number | null,
): ColumnsType<QueryModels.BrandResponse> => [
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
      <Tag color={isActive ? 'green' : 'red'} style={{ fontWeight: 500 }}>
        {isActive ? i18n.t('brands.filter.status.active') : i18n.t('brands.filter.status.inactive')}
      </Tag>
    ),
  },
  {
    title: i18n.t('brands.table.row-actions'),
    key: 'actions',
    align: 'right',
    render: (_value, brand) => (
      <div className="flex items-center justify-end gap-3">
        <EditIcon onClick={() => onEdit(brand)} />
        <BrandDeleteConfirmation
          brand={brand}
          deletingBrandId={deletingBrandId}
          onDelete={onDelete}
        />
      </div>
    ),
  },
];

const BrandTable = ({
  brands,
  page,
  total,
  loading = false,
  deletingBrandId = null,
  onEdit,
  onDelete,
  onPageChange,
}: BrandTableProps) => {
  return (
    <>
      <Table<QueryModels.BrandResponse>
        rowKey={(brand) => (brand.id == null ? brand.slug : String(brand.id))}
        columns={getColumns(onEdit, onDelete, deletingBrandId)}
        dataSource={brands}
        pagination={false}
        loading={loading}
        locale={{ emptyText: i18n.t('brands.table.empty') }}
      />
      <Pagination
        current={page}
        total={total}
        pageSize={BRAND_PAGE_SIZE}
        onChange={onPageChange}
        ariaLabel={i18n.t('brands.pagination.navigation-label')}
      />
    </>
  );
};

export default BrandTable;
