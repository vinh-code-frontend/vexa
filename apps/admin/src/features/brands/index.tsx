import { useEffect, useMemo, useState } from 'react';

import { Alert, Button, Typography } from 'antd';
import { ArrowLeftRight, Plus } from 'lucide-react';
import i18n from '@/i18n';

import { BrandTable } from './components/BrandTable';
import { BrandFilter, type BrandStatusFilter } from './components/BrandFilter';
import BrandFormDrawer from './components/BrandFormDrawer';
import { useGetApiAdminBrands } from '@/api';
import { BrandPending } from './components/BrandPending';
import SectionCard from '@/shared/components/ui/SectionCard';

export const BrandPage = () => {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [status, setStatus] = useState<BrandStatusFilter>('all');
  const [isBrandDrawerOpen, setIsBrandDrawerOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');

  const openCreateDrawer = () => {
    setFormMode('create');
    setIsBrandDrawerOpen(true);
  };

  const openEditDrawer = () => {
    setFormMode('edit');
    setIsBrandDrawerOpen(true);
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setDebouncedSearch(search), 300);
    return () => window.clearTimeout(timeoutId);
  }, [search]);

  const brandsQuery = useGetApiAdminBrands({
    Search: debouncedSearch.trim() || undefined,
    Page: 1,
    PageSize: 100,
  });

  const brands = brandsQuery.data?.data?.items;

  const filteredBrands = useMemo(() => {
    return (brands ?? []).filter(
      (brand) => status === 'all' || (status === 'active' ? brand.isActive : !brand.isActive),
    );
  }, [brands, status]);

  if (brandsQuery.error) {
    return (
      <Alert
        type="error"
        showIcon
        title={i18n.t('brands.errors.load-title')}
        description={
          brandsQuery.error instanceof Error
            ? brandsQuery.error.message
            : i18n.t('common.errors.unexpected')
        }
      />
    );
  }

  return (
    <section className="flex h-full min-h-0 w-full overflow-hidden">
      <SectionCard
        header={
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <Typography.Title level={2} styles={{ root: { margin: 0 } }}>
                  {i18n.t('brands.page.title')}
                </Typography.Title>
                <Typography.Text type="secondary">
                  {i18n.t('brands.page.description')}
                </Typography.Text>
              </div>
              <div className="flex items-center gap-2">
                <Button icon={<ArrowLeftRight size={13} />} style={{ fontSize: 13 }}>
                  {i18n.t('brands.actions.import-csv')}
                </Button>
                <Button
                  type="primary"
                  icon={<Plus size={13} />}
                  style={{ fontSize: 13 }}
                  onClick={openCreateDrawer}
                >
                  {i18n.t('brands.actions.create')}
                </Button>
              </div>
            </div>
            <BrandFilter
              search={search}
              status={status}
              onSearchChange={setSearch}
              onStatusChange={setStatus}
            />
          </div>
        }
        aside={<BrandPending />}
      >
        <BrandTable
          brands={filteredBrands}
          loading={brandsQuery.isFetching}
          onEdit={openEditDrawer}
        />
      </SectionCard>
      <BrandFormDrawer
        open={isBrandDrawerOpen}
        mode={formMode}
        onClose={() => setIsBrandDrawerOpen(false)}
      />
    </section>
  );
};
