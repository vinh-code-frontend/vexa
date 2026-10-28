import { useEffect, useMemo, useState } from 'react';

import { Alert, Button, Tabs, Typography } from 'antd';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router';

import { useGetApiAdminCategories } from '@/api';
import type { CategoryResponse } from '@/api/generated/query/model/types/category';
import i18n from '@/i18n';

import { CategoryFilter, CategoryTable } from '@/features/category/components';

const EMPTY_CATEGORIES: CategoryResponse[] = [];

export const CategoryPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [status, setStatus] = useState<'active' | 'inactive'>('active');

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setDebouncedSearch(search), 300);
    return () => window.clearTimeout(timeoutId);
  }, [search]);

  const categoriesQuery = useGetApiAdminCategories();

  const categories = categoriesQuery.data?.data?.items ?? EMPTY_CATEGORIES;

  const filteredCategories = useMemo(() => {
    const query = debouncedSearch.trim().toLocaleLowerCase();
    return categories.filter((category) => {
      const isRootCategory = category.parentId == null;
      const matchesSearch = !query || category.name.toLocaleLowerCase().includes(query);
      const matchesStatus = status === 'active' ? category.isActive : !category.isActive;
      return isRootCategory && matchesSearch && matchesStatus;
    });
  }, [categories, debouncedSearch, status]);

  const categoryTable = (
    <CategoryTable
      categories={filteredCategories}
      allCategories={categories}
      loading={categoriesQuery.isFetching}
      onEdit={(category) =>
        navigate(`/category/${category.id}/edit`, { state: { category } })
      }
    />
  );

  if (categoriesQuery.error) {
    return (
      <Alert
        type="error"
        showIcon
        title={i18n.t('categories.errors.load-title')}
        description={
          categoriesQuery.error instanceof Error
            ? categoriesQuery.error.message
            : i18n.t('common.errors.unexpected')
        }
      />
    );
  }

  return (
    <section className="flex h-full min-h-0 w-full flex-col gap-4">
      <header className="flex flex-col">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <Typography.Title level={2} styles={{ root: { margin: 0 } }}>
              {i18n.t('categories.page.title')}
            </Typography.Title>
            <Typography.Text type="secondary">
              {i18n.t('categories.page.description')}
            </Typography.Text>
          </div>
          <div className="flex items-center gap-2">
            <Button
              style={{ fontSize: 13 }}
              onClick={() => navigate('/category/new')}
            >
              {i18n.t('categories.actions.create-child')}
            </Button>
            <Button
              type="primary"
              icon={<Plus size={13} />}
              style={{ fontSize: 13 }}
              onClick={() => navigate('/category/new')}
            >
              {i18n.t('categories.actions.create-root')}
            </Button>
          </div>
        </div>
        <CategoryFilter search={search} onSearchChange={setSearch} />
      </header>
      <Tabs
        activeKey={status}
        onChange={(key) => {
          if (key === 'active' || key === 'inactive') setStatus(key);
        }}
        styles={{
          item: { paddingBlock: 0, lineHeight: 1.5, paddingBottom: 10, gap: 24, fontSize: 14 },
          indicator: { display: 'none' },
        }}
        items={[
          {
            key: 'active',
            label: i18n.t('categories.filter.status.active'),
            children: categoryTable,
          },
          {
            key: 'inactive',
            label: i18n.t('categories.filter.status.inactive'),
            children: categoryTable,
          },
        ]}
      />
    </section>
  );
};
