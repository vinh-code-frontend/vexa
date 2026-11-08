import type {
  CategoryDetailResponse,
  CategoryResponse,
} from '@/api/generated/query/model/types/category';

export type { CategoryDetailResponse, CategoryResponse };

export type CategoryFilterProps = {
  search: string;
  onSearchChange: (value: string) => void;
};

export type CategoryTableProps = {
  categories: CategoryResponse[];
  allCategories: CategoryResponse[];
  loading?: boolean;
  onEdit: (category: CategoryResponse) => void;
};

export type CategoryFormPageProps = {
  mode: 'create' | 'edit';
};

export type CategoryFormLocationState = {
  category?: CategoryResponse;
} | null;
