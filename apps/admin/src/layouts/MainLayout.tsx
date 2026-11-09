import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import { Layout, theme } from 'antd';
import { useState } from 'react';
import Sider from 'antd/es/layout/Sider';
import { Content, Header } from 'antd/es/layout/layout';
import { Outlet } from 'react-router';

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100dvh', background: '#fff' }} className="bg-white">
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
        <Content style={{ margin: '0 16px' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
