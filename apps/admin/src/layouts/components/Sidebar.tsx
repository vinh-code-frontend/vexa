import { Menu, type MenuProps } from 'antd';
import {
  ArrowDownToLine,
  FolderTree,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  Tag,
  Users,
} from 'lucide-react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import i18n from '@/i18n';
import { adminNavItems } from '@/router/admin.routes';

const rootSubmenuKeys = ['catalog', 'inventory'];

const catalogItems: MenuProps['items'] = [
  {
    key: 'product',
    icon: <Package size={16} strokeWidth={2.2} />,
    label: 'Products',
  },
  {
    key: 'brand',
    icon: <Tag size={16} strokeWidth={2.2} />,
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
    label: 'Catalog',
    children: catalogItems,
  },
  {
    key: 'inventory',
    label: 'Inventory',
    children: inventoryItems,
  },
];

const Sidebar = () => {
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

  return (
    <aside className="h-dvh w-65 border-r border-[#e5e7eb] bg-[#f8f9fb]">
      <div className="px-4 py-5">
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
          className="sidebar-menu"
        />
      </div>
    </aside>
  );
};

export default Sidebar;
