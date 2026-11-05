## Cấu trúc từng feature

Dưới đây là ví dụ, tên đặt cho từng file `.tsx` không cần giống hoàn toàn.

```text
features/
└── brand/
    ├── components/
    │   ├── styles/                  # Local styles for components
    │   ├── BrandComponent1Name.tsx
    │   ├── BrandComponent2Name.tsx
    │   └── index.ts                 # Export components
    │
    ├── hooks/                       # (Optional) Local hooks for this feature, interact with state
    │   ├── useBrandPage.ts
    │   └── index.ts
    │
    ├── context/                     # (Optional) Local context providers
    │   ├── BrandContext.tsx
    │   └── index.ts
    │
    ├── types/                       # (Optional) Local types/interfaces among this feature
    │   └── index.ts
    │
    ├── pages/
    │   ├── styles/                  # Local styles for pages
    │   ├── BrandListPage.tsx
    │   └── BrandDetailPage.tsx
    │
    ├── utils/                       # (Optional) Local utils, pure JS/TS logic among this feature
    │   ├── brandMapper.ts
    │   └── index.ts
    │
    └── index.ts                     # Export pages
```