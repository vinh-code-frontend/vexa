import i18n from '@/i18n';
import { Input, Select, Space } from 'antd';

export type BrandStatusFilter = 'all' | 'active' | 'inactive';

type BrandFilterProps = {
  search: string;
  status: BrandStatusFilter;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: BrandStatusFilter) => void;
};

export const BrandFilter = ({ search, status, onSearchChange, onStatusChange }: BrandFilterProps) => {
  return (
    <Space wrap className="mb-4 h-8 w-full">
      <Input
        placeholder={i18n.t('brands.filter.search-placeholder')}
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        allowClear
        styles={{ root: { width: '280px', height: '32px', fontSize: 13 } }}
      />
      <Select
        value={status}
        onChange={onStatusChange}
        labelRender={() => (
          <span className="text-[13px]">
            {i18n.t('brands.filter.status-label')}:{' '}
            <span className="px-2 font-semibold">{i18n.t(`brands.filter.status.${status}`)}</span>
          </span>
        )}
        className="flex h-8 w-43.25 px-2 py-3"
        options={[
          { label: i18n.t('brands.filter.status.all'), value: 'all' },
          { label: i18n.t('brands.filter.status.active'), value: 'active' },
          { label: i18n.t('brands.filter.status.inactive'), value: 'inactive' },
        ]}
      />
    </Space>
  );
};
