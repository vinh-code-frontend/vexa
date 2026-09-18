import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    input: {
      target: 'http://localhost:5073/openapi/admin.json',
    },

    output: {
      mode: 'tags',
      target: './src/api/generated',
      schemas: {
        path: './src/api/generated/model',
        routes: {
          default: 'types',
          enum: 'enums',
        },
        splitByTags: true,
      },
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
