import { Breadcrumb } from 'antd';
import { useLocation } from 'react-router';

import { adminNavItems } from '@/router/admin.routes';

interface IBreadCrumbName {
  name?: string;
  category?: { name?: string };
}

const Topbar = () => {
  const { pathname, state } = useLocation();
  const [route, ...segments] = pathname.split('/').filter(Boolean);

  if (!route) {
    return <div className="h-full flex items-center px-4 py-3" />;
  }

  const navItem = adminNavItems.find((item) => item.path === route && item.sidebar);

  const routeState = state as IBreadCrumbName | null;

  const detail =
    routeState?.name ??
    routeState?.category?.name ??
    segments.find((segment) => segment !== 'new' && segment !== 'edit');

  const label = navItem?.label ?? route;

  const breadcrumbItems = [
    ...(navItem?.group ? [{ key: 'group', title: navItem.group }] : []),
    {
      key: `/${route}`,
      title: label,
    },
    ...(detail ? [{ key: pathname, title: detail }] : []),
  ];

  return (
    <div className="h-full flex items-center px-4 py-3">
      <Breadcrumb items={breadcrumbItems} separator="/" />
    </div>
  );
};

export default Topbar;
