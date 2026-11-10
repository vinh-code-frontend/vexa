import { useMemo, useState } from 'react';

import { Button, Tabs, Typography } from 'antd';
import { ArrowLeftRight, Plus } from 'lucide-react';
import { useDebounce } from '@/shared/hooks';
import i18n from '@/i18n';

import { QueryModels } from '@/api';

import { useGetApiAdminBrands } from '@/api';

import {
  BrandTable,
  BrandFilter,
  BrandFormDrawer,
  BrandVerification,
} from '@/features/brand/components';
import type { BrandStatusFilter } from '@/features/brand/types/types';
import { QueryErrorAlert } from '@/shared/components/ui';

const EMPTY_BRANDS: QueryModels.BrandResponse[] = [];

const BrandPage = () => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<BrandStatusFilter>('all');
  const [activeTab, setActiveTab] = useState<'all' | 'verification'>('all');
  const [isBrandDrawerOpen, setIsBrandDrawerOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<QueryModels.BrandResponse | null>(null);

  const debouncedSearch = useDebounce(search);

  const openDrawer = (brand?: QueryModels.BrandResponse) => {
    setSelectedBrand(brand ?? null);
    setIsBrandDrawerOpen(true);
  };

  const brandsQuery = useGetApiAdminBrands({
    search: debouncedSearch.trim() || '',
    page: 1,
    pageSize: 100,
  });

  const brands = brandsQuery.data?.data?.items ?? EMPTY_BRANDS;

  const filteredBrands = useMemo(() => {
    return brands.filter(
      (brand) => status === 'all' || (status === 'active' ? brand.isActive : !brand.isActive),
    );
  }, [brands, status]);

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
          onSearchChange={setSearch}
          onStatusChange={setStatus}
        />
      </header>
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
                brands={filteredBrands}
                loading={brandsQuery.isFetching}
                onEdit={openDrawer}
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
