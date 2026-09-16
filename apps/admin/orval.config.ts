import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    input: {
      target: 'http://localhost:5073/openapi/admin.json',
    },

    output: {
      mode: 'tags',
      target: './src/api/generated',
      schemas: './src/api/generated/model',
      client: 'react-query',
      httpClient: 'axios',

      override: {
        mutator: {
          path: './src/api/axios/instance.ts',
          name: 'httpClient',
        },
      },
    },
  },
});
