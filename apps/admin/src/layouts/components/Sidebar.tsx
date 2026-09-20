import { Menu, type MenuProps } from 'antd';
import { useLocation, useNavigate } from 'react-router';

import i18n from '@/i18n';
import { adminNavItems } from '@/router/admin.routes';

const menuItems: MenuProps['items'] = adminNavItems.map(({ path, label, icon: Icon }) => ({
  key: path,
  icon: <Icon size={16} />,
  label,
}));

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const activeKey = location.pathname.split('/').filter(Boolean)[0] ?? adminNavItems[0].path;

  const handleClick: MenuProps['onClick'] = ({ key }) => {
    navigate(`/${key}`);
  };

  return (
    <div className="w-62.5 h-dvh border-r border-gray-200">
      <div className="px-6 py-4 font-bold text-lg">{i18n.t('common.app-name')}</div>
      <Menu
        mode="inline"
        items={menuItems}
        selectedKeys={[activeKey]}
        onClick={handleClick}
        className="border-none!"
      />
    </div>
  );
};

export default Sidebar;
