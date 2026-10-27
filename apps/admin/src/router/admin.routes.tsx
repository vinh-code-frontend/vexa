import { ProductDetailPage, ProductFormPage, ProductListPage } from '@/features/product';
import i18n from '@/i18n';
import { BrandPage } from '@/features/brand';
import { CategoryPage } from '@/features/category';
import type { LucideIcon } from 'lucide-react';
import {
  FolderTree,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  Tag,
  Users,
} from 'lucide-react';
import { Navigate, type RouteObject } from 'react-router';

export type AdminNavItem = {
  path: string;
  label: string;
  element: React.ReactNode;
  icon?: LucideIcon;
  sidebar?: boolean;
};

export const productNavItems: AdminNavItem[] = [
  {
    path: 'product',
    label: i18n.t('sidebar.product'),
    icon: Package,
    element: <ProductListPage />,
    sidebar: true,
  },
  {
    path: 'product/:id',
    label: i18n.t('sidebar.product'),
    icon: Package,
    element: <ProductFormPage mode="create" />,
  },
  {
    path: 'product/:id/edit',
    label: i18n.t('sidebar.product'),
    icon: Package,
    element: <ProductFormPage mode="edit" />,
  },
  {
    path: 'product/new',
    label: i18n.t('sidebar.product'),
    icon: Package,
    element: <ProductDetailPage />,
  },
];

// Single source of truth: sidebar menu and router children are both derived from this list.
export const adminNavItems: AdminNavItem[] = [
  {
    path: 'dashboard',
    label: i18n.t('sidebar.dashboard'),
    icon: LayoutDashboard,
    element: <h2>Dashboard</h2>,
    sidebar: true,
  },
  ...productNavItems,
  {
    path: 'brand',
    label: i18n.t('sidebar.brand'),
    icon: Tag,
    element: <BrandPage />,
    sidebar: true,
  },
  {
    path: 'category',
    label: i18n.t('sidebar.category'),
    icon: FolderTree,
    sidebar: true,
    element: <CategoryPage />,
  },
  {
    path: 'user',
    label: i18n.t('sidebar.user'),
    icon: Users,
    element: <h2>Users</h2>,
    sidebar: true,
  },
  {
    path: 'order',
    label: i18n.t('sidebar.order'),
    icon: ShoppingCart,
    sidebar: true,
    element: <h2>Orders</h2>,
  },
  {
    path: 'setting',
    label: i18n.t('sidebar.setting'),
    icon: Settings,
    sidebar: true,
    element: <h2>Settings</h2>,
  },
] as const;

export const adminRoutes: RouteObject[] = [
  {
    index: true,
    element: <Navigate to={adminNavItems[0].path} replace />,
  },
  ...adminNavItems.map(({ path, element }) => ({ path, element })),
];
