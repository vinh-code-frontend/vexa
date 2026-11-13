import { Layout, theme } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import { useState } from 'react';
import { Outlet } from 'react-router';

import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

import { Scrollbar } from '@/shared/components';

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ height: '100dvh', background: '#fff' }} className="bg-white">
      <Sider
        collapsible
        collapsedWidth={68}
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        theme="light"
        className="border-r border-[#e5e7eb] [&_.ant-layout-sider-trigger]:border-r [&_.ant-layout-sider-trigger]:border-[#e5e7eb]"
        style={{ background: '#fff' }}
      >
        <Sidebar collapsed={collapsed} />
      </Sider>
      <Layout>
        <Header
          style={{
            height: 56,
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Topbar />
        </Header>
        <Content>
          <Scrollbar>
            <div className="m-4">
              <Outlet />
            </div>
          </Scrollbar>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
