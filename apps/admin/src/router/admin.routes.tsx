import i18n from '@/i18n';
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
  icon: LucideIcon;
  element: React.ReactNode;
};

// Single source of truth: sidebar menu and router children are both derived from this list.
export const adminNavItems: AdminNavItem[] = [
  {
    path: 'dashboard',
    label: i18n.t('sidebar.dashboard'),
    icon: LayoutDashboard,
    element: <h2>Dashboard</h2>,
  },
  {
    path: 'product',
    label: i18n.t('sidebar.product'),
    icon: Package,
    element: <h2>Products</h2>,
  },
  { path: 'brand', label: i18n.t('sidebar.brand'), icon: Tag, element: <h2>Brands</h2> },
  {
    path: 'category',
    label: i18n.t('sidebar.category'),
    icon: FolderTree,
    element: <h2>Categories</h2>,
  },
  { path: 'user', label: i18n.t('sidebar.user'), icon: Users, element: <h2>Users</h2> },
  {
    path: 'order',
    label: i18n.t('sidebar.order'),
    icon: ShoppingCart,
    element: <h2>Orders</h2>,
  },
  {
    path: 'setting',
    label: i18n.t('sidebar.setting'),
    icon: Settings,
    element: <h2>Settings</h2>,
  },
];

export const adminRoutes: RouteObject[] = [
  {
    index: true,
    element: <Navigate to={adminNavItems[0].path} replace />,
  },
  ...adminNavItems.map(({ path, element }) => ({ path, element })),
];
