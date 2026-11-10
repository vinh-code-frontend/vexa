import { Button, Table, Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Edit2, Folder } from 'lucide-react';
import slugify from 'slugify';

import i18n from '@/i18n';
import { QueryModels } from '@/api';

type CategoryTableProps = {
  categories: QueryModels.CategoryResponse[];
  allCategories: QueryModels.CategoryResponse[];
  loading?: boolean;
  onEdit: (category: QueryModels.CategoryResponse) => void;
};

const renderCategoryDetails = (category: QueryModels.CategoryResponse) => (
  <div className="flex items-center gap-3">
    <Folder size={14} className="shrink-0 text-violet-700" aria-hidden="true" />
    <Typography.Text className="text-[#212529]" strong title={category.name}>
      {category.name}
    </Typography.Text>
  </div>
);

const getColumns = (
  categories: QueryModels.CategoryResponse[],
  onEdit: (category: QueryModels.CategoryResponse) => void,
): ColumnsType<QueryModels.CategoryResponse> => [
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
  {
    title: i18n.t('categories.table.actions'),
    key: 'actions',
    align: 'right',
    render: (_value, category) => (
      <Button
        type="text"
        size="small"
        icon={<Edit2 size={14} />}
        aria-label={i18n.t('categories.actions.edit', { name: category.name })}
        onClick={() => onEdit(category)}
      />
    ),
  },
];

export const CategoryTable = ({
  categories,
  allCategories,
  loading = false,
  onEdit,
}: CategoryTableProps) => {
  return (
    <Table<QueryModels.CategoryResponse>
      rowKey={(category) => String(category.id)}
      columns={getColumns(allCategories, onEdit)}
      dataSource={categories}
      pagination={false}
      loading={loading}
      locale={{ emptyText: i18n.t('categories.table.empty') }}
    />
  );
};
