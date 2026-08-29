import { RouterProvider } from 'react-router/dom';

import { router } from '@/router';
import { DEFAULT_PRIMARY_COLOR, usePrimaryColor } from '@/theme/primaryColor';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';

const queryClient = new QueryClient();

function App() {
  const [primaryColor] = usePrimaryColor(DEFAULT_PRIMARY_COLOR);

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        componentSize="large"
        theme={{
          token: {
            colorPrimary: primaryColor,
          },
        }}
      >
        <RouterProvider router={router}></RouterProvider>
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default App;
