import { Input } from 'antd';

import i18n from '@/i18n';

type CategoryFilterProps = {
  search: string;
  onSearchChange: (value: string) => void;
};

export const CategoryFilter = ({ search, onSearchChange }: CategoryFilterProps) => (
  <div className="mb-3">
    <Input
      placeholder={i18n.t('categories.filter.search-placeholder')}
      value={search}
      onChange={(event) => onSearchChange(event.target.value)}
      allowClear
      styles={{ root: { width: 'min(100%, 420px)', height: '36px', fontSize: 13 } }}
    />
  </div>
);
