import { useQueryClient } from '@tanstack/react-query';
import { Button, Tabs, Typography } from 'antd';
import { ArrowLeftRight, Plus } from 'lucide-react';
import { useState } from 'react';

import {
  getGetApiAdminBrandsQueryKey,
  QueryModels,
  useDeleteApiAdminBrandsId,
  useGetApiAdminBrands,
} from '@/api';
import {
  BrandTable,
  BrandFilter,
  BrandFormDrawer,
  BrandVerification,
} from '@/features/brand/components';
import type { BrandStatusFilter } from '@/features/brand/types/types';
import i18n from '@/i18n';
import { QueryErrorAlert } from '@/shared/components/ui';
import { useDebounce } from '@/shared/hooks';
import { BRAND_PAGE_SIZE } from '../components/BrandTable';

const EMPTY_BRANDS: QueryModels.BrandResponse[] = [];

const BrandPage = () => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<BrandStatusFilter>('all');
  const [activeTab, setActiveTab] = useState<'all' | 'verification'>('all');
  const [isBrandDrawerOpen, setIsBrandDrawerOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<QueryModels.BrandResponse | null>(null);
  const [page, setPage] = useState(1);
  const [deleteError, setDeleteError] = useState<unknown>(null);
  const queryClient = useQueryClient();
  const deleteBrandMutation = useDeleteApiAdminBrandsId();

  const debouncedSearch = useDebounce(search);

  const openDrawer = (brand?: QueryModels.BrandResponse) => {
    setSelectedBrand(brand ?? null);
    setIsBrandDrawerOpen(true);
  };

  const brandsQuery = useGetApiAdminBrands({
    search: debouncedSearch.trim() || undefined,
    isActive: status === 'all' ? undefined : status === 'active',
    page,
    pageSize: BRAND_PAGE_SIZE,
  });

  const brandPage = brandsQuery.data?.data;
  const brands = brandPage?.items ?? EMPTY_BRANDS;
  const totalCount = Number(brandPage?.totalCount ?? 0);
  const deletingBrandId = deleteBrandMutation.isPending
    ? Number(deleteBrandMutation.variables?.id)
    : null;

  const handleDelete = async (brand: QueryModels.BrandResponse) => {
    const brandId = Number(brand.id);
    if (!Number.isSafeInteger(brandId) || brandId <= 0) {
      setDeleteError(new Error(i18n.t('brands.detail.errors.invalid-id')));
      return;
    }

    setDeleteError(null);
    try {
      await deleteBrandMutation.mutateAsync({ id: brandId });
      const nextPageCount = Math.max(1, Math.ceil((totalCount - 1) / BRAND_PAGE_SIZE));
      if (page > nextPageCount) setPage(nextPageCount);
      await queryClient.invalidateQueries({ queryKey: getGetApiAdminBrandsQueryKey() });
    } catch (error) {
      setDeleteError(error);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleStatusChange = (value: BrandStatusFilter) => {
    setStatus(value);
    setPage(1);
  };

  if (brandsQuery.error) {
    return <QueryErrorAlert title={i18n.t('brands.errors.load-title')} error={brandsQuery.error} />;
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
              onClick={() => openDrawer()}
            >
              {i18n.t('brands.actions.create')}
            </Button>
          </div>
        </div>
        <BrandFilter
          search={search}
          status={status}
          onSearchChange={handleSearchChange}
          onStatusChange={handleStatusChange}
        />
      </header>
      {deleteError !== null && (
        <QueryErrorAlert title={i18n.t('brands.errors.delete-title')} error={deleteError} />
      )}
      <Tabs
        activeKey={activeTab}
        onChange={(key) => {
          if (key === 'all' || key === 'verification') setActiveTab(key);
        }}
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
                brands={brands}
                page={page}
                total={totalCount}
                loading={brandsQuery.isFetching}
                deletingBrandId={deletingBrandId}
                onEdit={openDrawer}
                onDelete={handleDelete}
                onPageChange={setPage}
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
        brand={selectedBrand}
        onClose={() => {
          setIsBrandDrawerOpen(false);
          setSelectedBrand(null);
        }}
      />
    </section>
  );
};

export default BrandPage;
