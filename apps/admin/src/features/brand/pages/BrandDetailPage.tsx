import { useState } from 'react';
import { Alert, Button, Card, Tabs, Tag, Typography } from 'antd';
import { Image, Pencil } from 'lucide-react';
import { useParams } from 'react-router';
import { useGetApiAdminBrandsId } from '@/api';
import { Loading, QueryErrorAlert } from '@/shared/components/ui';
import i18n from '@/i18n';
import { BrandFormDrawer } from '@/features/brand/components';

const BrandDetailPage = () => {
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const { id } = useParams();
  const brandId = Number(id);
  const hasValidBrandId = Number.isSafeInteger(brandId) && brandId > 0;
  const brandQuery = useGetApiAdminBrandsId(brandId, {
    query: { enabled: hasValidBrandId },
  });
  const brand = brandQuery.data?.data;

  if (!hasValidBrandId) {
    return <Alert type="error" showIcon title={i18n.t('brands.detail.errors.invalid-id')} />;
  }

  if (brandQuery.isLoading) {
    return <Loading />;
  }

  if (brandQuery.error) {
    return (
      <QueryErrorAlert title={i18n.t('brands.detail.errors.load-title')} error={brandQuery.error} />
    );
  }

  if (!brand) {
    return <Alert type="error" showIcon title={i18n.t('brands.detail.errors.no-data')} />;
  }

  const informationRows = [
    { label: i18n.t('brands.form.name'), value: brand.name },
    { label: i18n.t('brands.table.slug'), value: `/${brand.slug}` },
    { label: i18n.t('brands.table.display-order'), value: brand.displayOrder ?? '—' },
  ];
  const logoAlt = i18n.t('brands.detail.logo-alt', { name: brand.name });
  const slugPrefix = i18n.t('brands.form.slug-prefix');

  return (
    <main className="flex min-h-full w-full flex-col gap-4 py-4">
      <header className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center gap-0.5 rounded-md bg-[#F1F3F5] text-[#212529]">
            {brand.logoUrl ? (
              <img src={brand.logoUrl} alt={logoAlt} className="h-full w-full object-contain" />
            ) : (
              <Image size={17} aria-hidden="true" />
            )}
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <Typography.Title level={4} style={{ margin: 0, fontSize: 16 }}>
                {brand.name}
              </Typography.Title>
              <Tag
                color={brand.isActive ? 'green' : 'red'}
                style={{
                  margin: 0,
                  border: 0,
                  padding: '0 6px',
                  fontSize: 10,
                  lineHeight: '16px',
                }}
              >
                {brand.isActive
                  ? i18n.t('brands.filter.status.active')
                  : i18n.t('brands.filter.status.inactive')}
              </Tag>
            </div>
            <Typography.Text className="text-[11px] text-[#6C757D]">/{brand.slug}</Typography.Text>
          </div>
        </div>
        <Button
          type="primary"
          size="small"
          style={{ height: 28, borderRadius: 6, paddingInline: 12, fontSize: 13 }}
          onClick={() => setIsEditDrawerOpen(true)}
        >
          {i18n.t('brands.detail.actions.edit')}
        </Button>
      </header>

      <Tabs
        defaultActiveKey="overview"
        styles={{
          item: { paddingBlock: 0, lineHeight: 1.5, paddingBottom: 10, gap: 24, fontSize: 14 },
          indicator: { display: 'none' },
        }}
        items={[
          {
            key: 'overview',
            label: i18n.t('brands.detail.tabs.overview'),
            children: (
              <section
                aria-label={i18n.t('brands.detail.overview.aria-label')}
                className="flex flex-col gap-4 lg:flex-row"
              >
                <Card
                  className="w-full lg:w-105 lg:flex-none"
                  title={
                    <span className="font-semibold" style={{ fontSize: 14, color: '#212529' }}>
                      {i18n.t('brands.detail.information-title')}
                    </span>
                  }
                  styles={{
                    root: { borderRadius: 8, borderColor: '#E9ECEF', padding: 20 },
                    header: {
                      borderBottomColor: '#E9ECEF',
                      padding: 0,
                      paddingBottom: 12,
                      minHeight: 0,
                    },
                    body: { padding: 0 },
                  }}
                >
                  <div className="flex flex-col">
                    <div className="flex flex-col py-3 gap-3">
                      {informationRows.map(({ label, value }) => (
                        <div key={label} className="flex items-center justify-between">
                          <Typography.Text style={{ fontSize: 13, color: '#6C757D' }}>
                            {label}
                          </Typography.Text>
                          <Typography.Text style={{ fontSize: 13, color: '#212529' }}>
                            {value}
                          </Typography.Text>
                        </div>
                      ))}
                    </div>
                    <div className="mt-1 border-t border-[#E9ECEF] pt-3">
                      <div className="flex flex-col ">
                        <Typography.Text style={{ color: '#6C757D', fontSize: 13 }}>
                          {i18n.t('brands.form.slug-preview')}
                        </Typography.Text>
                        <Typography.Paragraph
                          style={{ margin: '4px 0 0', fontSize: 13, color: '#212529' }}
                        >
                          {`${slugPrefix}${slugPrefix.endsWith('/') ? '' : '/'}${brand.slug}`}
                        </Typography.Paragraph>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card
                  className="w-full min-w-0 lg:flex-1"
                  title={
                    <span className="font-semibold" style={{ fontSize: 14, color: '#212529' }}>
                      {i18n.t('brands.detail.profile-title')}
                    </span>
                  }
                  styles={{
                    root: { borderRadius: 8, borderColor: '#E9ECEF', padding: 20 },
                    header: {
                      borderBottomColor: '#E9ECEF',
                      padding: 0,
                      paddingBottom: 12,
                      minHeight: 0,
                    },
                    body: { padding: 0 },
                  }}
                >
                  <div className="flex flex-col">
                    <div className="border-b border-[#E9ECEF] py-3">
                      <Typography.Text style={{ fontSize: 13, color: '#6C757D' }}>
                        {i18n.t('brands.form.description-label')}
                      </Typography.Text>
                      <Typography.Paragraph style={{ fontSize: 13, color: '#212529', margin: 0 }}>
                        {brand.description || i18n.t('brands.detail.no-description')}
                      </Typography.Paragraph>
                    </div>
                    <div className="pt-2.5">
                      <Typography.Text style={{ fontSize: 13, color: '#6C757D' }}>
                        {i18n.t('brands.form.logo-image')}
                      </Typography.Text>
                      <div className="mt-1 flex items-center gap-2.5 rounded-md bg-[#F8F9FA] p-2">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-[#F1F3F5] text-[#212529]">
                          {brand.logoUrl ? (
                            <img
                              src={brand.logoUrl}
                              alt={logoAlt}
                              className="h-full w-full object-contain"
                            />
                          ) : (
                            <Image size={15} aria-hidden="true" />
                          )}
                        </div>
                        <div className="flex min-w-0 flex-col">
                          <Typography.Text className="truncate text-[10px] font-medium text-[#212529]">
                            {brand.logoUrl?.split('/').pop() || i18n.t('brands.detail.no-logo')}
                          </Typography.Text>
                          <Typography.Text className="truncate text-[9px] text-[#6C757D]">
                            {brand.logoUrl || i18n.t('brands.detail.logo-unavailable')}
                          </Typography.Text>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </section>
            ),
          },
          { key: 'products', label: i18n.t('sidebar.product'), children: null },
          { key: 'settings', label: i18n.t('sidebar.setting'), children: null },
          { key: 'activity', label: i18n.t('brands.detail.tabs.activity'), children: null },
        ]}
      />
      <BrandFormDrawer
        open={isEditDrawerOpen}
        brand={brand}
        onClose={() => setIsEditDrawerOpen(false)}
      />
    </main>
  );
};

export default BrandDetailPage;
