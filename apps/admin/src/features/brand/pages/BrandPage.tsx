import { useMemo, useState } from 'react';

import { Alert, Button, Tabs, Typography } from 'antd';
import { ArrowLeftRight, Plus } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import i18n from '@/i18n';

import { useGetApiAdminBrands, usePostApiAdminBrands, usePutApiAdminBrandsId } from '@/api';
import { useDebounce } from '@/shared/hooks';
import type { BrandResponse } from '@/api/generated/query/model';

import {
  BrandTable,
  BrandFilter,
  BrandFormDrawer,
  BrandVerification,
  type BrandFormValues,
  type BrandStatusFilter,
} from '@/features/brand/components';

const BrandPage = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<BrandStatusFilter>('all');
  const [activeTab, setActiveTab] = useState('all');
  const [isBrandDrawerOpen, setIsBrandDrawerOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [selectedBrand, setSelectedBrand] = useState<BrandResponse | null>(null);

  const createBrandMutation = usePostApiAdminBrands();
  const updateBrandMutation = usePutApiAdminBrandsId();
  const debouncedSearch = useDebounce(search);

  const openCreateDrawer = () => {
    setFormMode('create');
    setSelectedBrand(null);
    setIsBrandDrawerOpen(true);
  };

  const openEditDrawer = (brand: BrandResponse) => {
    setFormMode('edit');
    setSelectedBrand(brand);
    setIsBrandDrawerOpen(true);
  };

  const handleBrandSubmit = async (values: BrandFormValues) => {
    const payload = {
      name: values.name,
      description: values.description || null,
      displayOrder: values.displayOrder ?? 1,
      isActive: true,
      logoUrl: values.logo?.[0]?.url ?? null,
    };

    if (formMode === 'create') {
      await createBrandMutation.mutateAsync({ data: payload });
    } else if (selectedBrand?.id) {
      await updateBrandMutation.mutateAsync({
        id: Number(selectedBrand.id),
        data: payload,
      });
    }

    await queryClient.invalidateQueries({ queryKey: ['/api/admin/brands'] });
    setIsBrandDrawerOpen(false);
    setSelectedBrand(null);
  };

  const brandsQuery = useGetApiAdminBrands({
    search: debouncedSearch.trim() || undefined,
    page: 1,
    pageSize: 100,
  });

  const brands = brandsQuery.data?.data?.items ?? [];

  const filteredBrands = useMemo(() => {
    return brands.filter(
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
          item: { paddingBlock: 0, lineHeight: 1.5, paddingBottom: 10, gap: 24, fontSize: 14 },
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
        brand={selectedBrand}
        onClose={() => {
          setIsBrandDrawerOpen(false);
          setSelectedBrand(null);
        }}
        onSubmit={handleBrandSubmit}
      />
    </section>
  );
};

export default BrandPage;
