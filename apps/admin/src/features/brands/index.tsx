import { useEffect, useMemo, useState } from 'react';

import { Alert, Button, Tabs, Typography } from 'antd';
import { ArrowLeftRight, Plus } from 'lucide-react';
import i18n from '@/i18n';

import { BrandTable } from './components/BrandTable';
import { BrandFilter, type BrandStatusFilter } from './components/BrandFilter';
import BrandFormDrawer from './components/BrandFormDrawer';
import { useGetApiAdminBrands } from '@/api';
import { BrandVerification } from './components/BrandVerification';

export const BrandPage = () => {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [status, setStatus] = useState<BrandStatusFilter>('all');
  const [activeTab, setActiveTab] = useState('all');
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
    <section className="flex h-full min-h-0 w-full flex-col gap-4">
      <header className="flex flex-col">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <Typography.Title level={2} styles={{ root: { margin: 0 } }}>
              {i18n.t('brands.page.title')}
            </Typography.Title>
            <Typography.Text type="secondary">{i18n.t('brands.page.description')}</Typography.Text>
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
      </header>
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        styles={{
          item: { paddingBlock: 0, lineHeight: 1.5, paddingBottom: 10 , gap: 24 , fontSize: 14 },
          indicator: { display: 'none' },
        }}
        items={[
          {
            key: 'all',
            label: i18n.t('brands.tabs.all'),
            children: (
              <BrandTable
                brands={filteredBrands}
                loading={brandsQuery.isFetching}
                onEdit={openEditDrawer}
              />
            ),
          },
          {
            key: 'verification',
            label: i18n.t('brands.tabs.verification'),
            children: <BrandVerification />,
          },
        ]}
      />
      <BrandFormDrawer
        open={isBrandDrawerOpen}
        mode={formMode}
        onClose={() => setIsBrandDrawerOpen(false)}
      />
    </section>
  );
};
