import { Table, Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Folder } from 'lucide-react';
import slugify from 'slugify';

import type { CategoryResponse } from '@/api/generated/query/model/types/category';
import i18n from '@/i18n';

type CategoryTableProps = {
  categories: CategoryResponse[];
  allCategories: CategoryResponse[];
  loading?: boolean;
};

const renderCategoryDetails = (category: CategoryResponse) => (
  <div className="flex items-center gap-3">
    <Folder size={14} className="shrink-0 text-violet-700" aria-hidden="true" />
    <Typography.Text className="text-[#212529]" strong title={category.name}>
      {category.name}
    </Typography.Text>
  </div>
);

const getColumns = (categories: CategoryResponse[]): ColumnsType<CategoryResponse> => [
  {
    title: i18n.t('categories.table.category-name-hierarchy'),
    key: 'categoryName',
    render: (_value, category) => renderCategoryDetails(category),
  },
  {
    title: i18n.t('categories.table.slug'),
    key: 'slug',
    render: (_value, category) => (
      <Typography.Text type="secondary">
        /{slugify(category.name, { lower: true, strict: true })}
      </Typography.Text>
    ),
  },
  {
    title: i18n.t('categories.table.status'),
    dataIndex: 'isActive',
    key: 'isActive',
    render: (isActive?: boolean) => (
      <Tag color={isActive ? 'green' : 'default'} style={{ fontWeight: 500 }}>
        {isActive
          ? i18n.t('categories.filter.status.active')
          : i18n.t('categories.filter.status.inactive')}
      </Tag>
    ),
  },
  {
    title: i18n.t('categories.table.child-count'),
    key: 'childCount',
    render: (_value, category) =>
      categories.filter((item) => String(item.parentId) === String(category.id)).length,
  },
];

export const CategoryTable = ({
  categories,
  allCategories,
  loading = false,
}: CategoryTableProps) => (
  <Table<CategoryResponse>
    rowKey={(category) => String(category.id)}
    columns={getColumns(allCategories)}
    dataSource={categories}
    pagination={false}
    loading={loading}
    locale={{ emptyText: i18n.t('categories.table.empty') }}
  />
);
