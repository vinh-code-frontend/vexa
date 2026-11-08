import type { UploadFile } from 'antd/es/upload/interface';

import type { BrandResponse } from '@/api/generated/query/model/types/brand';

export type { BrandResponse };

export type BrandStatusFilter = 'all' | 'active' | 'inactive';

export type BrandFilterProps = {
  search: string;
  status: BrandStatusFilter;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: BrandStatusFilter) => void;
};

export type BrandFormValues = {
  name: string;
  slug: string;
  description?: string;
  displayOrder?: number;
  logo?: UploadFile[];
};

export type BrandFormDrawerProps = {
  open: boolean;
  brand?: BrandResponse | null;
  onClose: () => void;
  onSubmit: (values: BrandFormValues) => Promise<void> | void;
};

export type BrandTableProps = {
  brands: BrandResponse[];
  loading?: boolean;
  onEdit: (brand: BrandResponse) => void;
};