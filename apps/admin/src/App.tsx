import { ConfigProvider } from 'antd';
import { RouterProvider } from 'react-router/dom';

import { AuthProvider } from '@/providers/AuthProvider';
import { QueryProvider } from '@/providers/QueryProvider';
import { router } from '@/router';
import { DEFAULT_PRIMARY_COLOR, usePrimaryColor } from '@/shared/theme/primaryColor';

function App() {
  const [primaryColor] = usePrimaryColor(DEFAULT_PRIMARY_COLOR);

  return (
    <QueryProvider>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: primaryColor,
          },
          components: {
            Card: {
              bodyPadding: 20,
              bodyPaddingSM: 20,
              headerPadding: 20,
              headerPaddingSM: 20,
            },
          },
        }}
      >
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ConfigProvider>
    </QueryProvider>
  );
}

export default App;
