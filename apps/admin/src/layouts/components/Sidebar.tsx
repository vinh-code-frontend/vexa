import { Menu, Tag, theme, type MenuProps } from 'antd';
import {
  ArrowDownToLine,
  Box,
  FolderTree,
  LayoutDashboard,
  Layers3,
  Package,
  Settings,
  ShoppingCart,
  Tag as TagIcon,
  Users,
} from 'lucide-react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import i18n from '@/i18n';
import { adminNavItems } from '@/router/admin.routes';
import { DribbbleIcon } from '@/shared/components/motions/DribbleIcon';
import clsx from 'clsx';

const rootSubmenuKeys = ['catalog', 'inventory'];

const catalogItems: MenuProps['items'] = [
  {
    key: 'product',
    icon: <Box size={16} strokeWidth={2.2} />,
    label: 'Products',
  },
  {
    key: 'brand',
    icon: <TagIcon size={16} strokeWidth={2.2} />,
    label: 'Brands',
  },
  {
    key: 'category',
    icon: <FolderTree size={16} strokeWidth={2.2} />,
    label: 'Categories',
  },
  {
    key: 'attribute',
    icon: <FolderTree size={16} strokeWidth={2.2} />,
    label: 'Attributes',
  },
  {
    key: 'import',
    icon: <ArrowDownToLine size={16} strokeWidth={2.2} />,
    label: 'Imports',
  },
];

const inventoryItems: MenuProps['items'] = [
  {
    key: 'user',
    icon: <Users size={16} strokeWidth={2.2} />,
    label: 'Users',
  },
  {
    key: 'order',
    icon: <ShoppingCart size={16} strokeWidth={2.2} />,
    label: 'Orders',
  },
  {
    key: 'setting',
    icon: <Settings size={16} strokeWidth={2.2} />,
    label: 'Settings',
  },
];

const menuItems: MenuProps['items'] = [
  {
    key: 'dashboard',
    icon: <LayoutDashboard size={16} strokeWidth={2.2} />,
    label: i18n.t('sidebar.dashboard'),
  },
  {
    key: 'catalog',
    icon: <Layers3 size={16} strokeWidth={2.2} />,
    label: 'Catalog',
    children: catalogItems,
  },
  {
    key: 'inventory',
    icon: <Package size={16} strokeWidth={2.2} />,
    label: 'Inventory',
    children: inventoryItems,
  },
];

const Sidebar = ({ collapsed }: { collapsed: boolean }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openKeys, setOpenKeys] = useState<string[]>(['catalog']);

  const activeKey = location.pathname.split('/').filter(Boolean)[0] ?? adminNavItems[0].path;

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);

    if (latestOpenKey && rootSubmenuKeys.includes(latestOpenKey)) {
      setOpenKeys([latestOpenKey]);
      return;
    }

    setOpenKeys(keys);
  };

  const handleClick: MenuProps['onClick'] = ({ key }) => {
    const target = String(key);

    if (target === 'catalog' || target === 'inventory') {
      return;
    }

    if (target === 'attribute' || target === 'import') {
      return;
    }

    navigate(`/${target}`);
  };

  const { token } = theme.useToken();

  return (
    <div>
      <div className="flex items-center gap-2.5 p-4 pb-0">
        <div className="rounded-sm bg-primary p-1.5">
          <DribbbleIcon size={23} className="text-white" />
        </div>
        {!collapsed && (
          <div
            aria-hidden={collapsed}
            className={`min-w-0 overflow-hidden whitespace-nowrap transition-[max-width] duration-200 ease-in-out ${
              collapsed ? 'max-w-0' : 'max-w-40'
            }`}
          >
            <div
              className={`flex items-center gap-2.5 transition-opacity duration-200 ease-in-out ${
                collapsed ? 'pointer-events-none opacity-0 delay-0' : 'opacity-100 delay-200'
              }`}
            >
              <div className="text-lg font-bold">Vexa</div>
              <Tag
                style={{
                  color: token.colorPrimary,
                  backgroundColor: token.colorPrimaryBg,
                  borderColor: token.colorPrimaryBorder,
                }}
              >
                Admin
              </Tag>
            </div>
          </div>
        )}
      </div>
      <div className={clsx('p-4 transition-all', collapsed && 'px-2')}>
        <Menu
          mode="inline"
          items={menuItems}
          selectedKeys={[activeKey]}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          onClick={handleClick}
          style={{
            background: 'transparent',
            border: 'none',
            fontSize: 14,
          }}
          inlineIndent={18}
        />
      </div>
    </div>
  );
};

export default Sidebar;
