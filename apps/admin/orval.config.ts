import { defineConfig } from 'orval';

const target = 'http://localhost:5073/openapi/admin.json';

const mutator = {
  path: './src/api/axios/instance.ts',
  name: 'httpClient',
};

export default defineConfig({
  // Only tag "auth" → pure axios, no react-query
  auth: {
    input: {
      target,
      filters: {
        tags: ['Auth'],
      },
    },
    output: {
      mode: 'tags',
      target: './src/api/generated/auth',
      schemas: {
        path: './src/api/generated/auth/model',
        routes: {
          default: 'types',
          enum: 'enums',
        },
        splitByTags: true,
      },
      client: 'axios',
      httpClient: 'axios',
      clean: true,
      override: { mutator },
    },
  },

  // other tags (except "auth") → react-query
  api: {
    input: {
      target,
      filters: {
        tags: [/^(?!Auth$)/i],
      },
    },
    output: {
      mode: 'tags',
      target: './src/api/generated/query',
      schemas: {
        path: './src/api/generated/query/model',
        routes: {
          default: 'types',
          enum: 'enums',
        },
        splitByTags: true,
      },
      client: 'react-query',
      httpClient: 'axios',
      clean: true,
      override: { mutator },
    },
  },
});
