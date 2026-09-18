# Vexa - Product Tracking

> This document tracks **what exists**, **what should be built next**, and **how work is prioritized**.
> It is organized by product phases rather than sprints and does not replace the detailed technical documents in `docs/roadmap/`.

## How to Read This

- **P0 - Required:** the main workflow cannot operate without it.
- **P1 - Important:** should be built after P0 is stable.
- **P2 - Advanced:** build only when the product has enough data and a clear need.
- **S / M / L / XL:** estimated complexity from small to very large.
- **Basic / Standard / Advanced:** feature detail level. Build the basic version first and add detail later.

Status values:

- `DONE`: implemented and usable at an acceptable level.
- `PARTIAL`: some code or API exists, but the complete workflow is not ready.
- `NEXT`: the next priority.
- `LATER`: intentionally deferred.
- `PLANNED`: expected, but not scheduled yet.

## Current Code Status

| Area | Status | Notes |
| --- | --- | --- |
| .NET API | `PARTIAL` | Clean Architecture, auth, middleware, DTOs, repositories, and migrations exist. |
| React Admin | `PARTIAL` | Vite, routing, auth provider, and login page exist; the admin route currently only has a dashboard placeholder. |
| Nuxt Client | `PARTIAL` | Minimal bootstrap exists; the complete shopping workflow does not exist yet. |
| Admin auth | `PARTIAL` | Login, refresh token, and cookies exist; authorization and UI still need work. |
| User | `PARTIAL` | Entity, DTOs, service, and list/create/delete API exist; detail, edit, status, UI, and validation are still needed. |
| Brand | `PARTIAL` | Entity, migration, DTOs, and paginated repository listing exist; CRUD service methods are still `NotImplemented`. |
| Category | `PARTIAL` | Entity with parent-child relationship, migration, and DTOs exist; repository/service CRUD is not implemented yet. |
| Product | `PLANNED` | No entity, migration, API, or admin screen exists in the current code. |
| Excel import | `PLANNED` | No import module, validation, preview, or error report exists yet. |
| Orders / inventory / payments | `PLANNED` | No corresponding entities or API workflows exist yet. |

## Prioritization Principles

1. Make the admin able to manage real data first: users, brands, categories, and basic products.
2. Every module should provide a minimum workflow: list, detail, create, edit, delete/disable, search, and pagination where needed.
3. Add detailed features only after the basic end-to-end workflow works with sample data.
4. Build Excel import only after single-record CRUD for each module is stable, so validation rules have a reliable baseline.
5. Theme work, visual dashboard polish, and customization must not come before core data-management workflows.
6. Do not mark a feature complete just because an entity or controller exists; use `DONE` only when backend, UI, and minimum tests work together.

## Group 1 - Admin Management

This is the highest-priority group at the current stage.

### Phase 1 - Admin Core and Minimum Catalog

**Goal:** administrators can sign in and manage the data required to create the first catalog.

| Priority | Feature | Initial scope | Complexity | Detail | Status |
| --- | --- | --- | --- | --- | --- |
| P0 | Complete admin auth | Login, refresh, logout, session expiry, protected routes, error feedback | M | Basic | `PARTIAL` |
| P0 | User management | List, search, pagination, detail, create, role/status editing, disable | M | Basic | `PARTIAL` |
| P0 | Brand management | CRUD, slug, active/inactive, display order, search, pagination | M | Basic | `PARTIAL` |
| P0 | Category management | CRUD, slug, active/inactive, parent category, display order, pagination | M | Basic | `PARTIAL` |
| P0 | Admin UI foundation | Main layout, menu, breadcrumbs, loading/error/empty states, shared tables and forms | M | Basic | `PARTIAL` |
| P0 | Basic product management | Entity, migration, brand/category, name, slug, description, base price, draft/published status, admin CRUD | L | Basic | `NEXT` |
| P1 | Catalog Excel import | Import basic brand/category/product data; preview, validation, row-level errors, downloadable error file | L | Basic | `PLANNED` |
| P1 | Data export | Export filtered user/brand/category/product lists | M | Basic | `PLANNED` |

**Recommended implementation order:**

1. Complete Brand and Category backend workflows, then build their list/form screens.
2. Complete admin User management and the required role/status rules.
3. Build one shared UI foundation for these management screens.
4. Create basic Product management with brand/category assignment and publishing.
5. Add Excel import for each module after manual entry is stable.

**Phase 1 exit criteria:**

- Admins can sign in, refresh a session, and are blocked without the required permission.
- An admin can create a brand, category, and product from the UI.
- A product can move from draft to published and display the correct brand/category.
- Lists handle loading, empty, error, search, and pagination states where supported by the API.
- Excel import provides preview and validation and does not write data when there are critical file errors.

### Phase 2 - Catalog and Sales Operations in Admin

**Goal:** administrators can operate real products, inventory, and orders.

| Priority | Feature | Scope | Complexity | Detail | Status |
| --- | --- | --- | --- | --- | --- |
| P0 | Advanced product management | Variants/SKUs, selling price, sale price, images, specifications, publish/unpublish | L | Standard | `PLANNED` |
| P0 | Inventory management | Current stock, adjustments, adjustment history, low-stock alerts | L | Standard | `PLANNED` |
| P0 | Order management | List, detail, status updates, processing notes | L | Basic | `PLANNED` |
| P1 | Customer management | Profile, addresses, order history, lock/unlock account | M | Standard | `PLANNED` |
| P1 | Advanced product import | Variants/SKUs, prices, stock, column mapping, duplicate SKU checks | XL | Standard | `PLANNED` |
| P1 | Basic coupons | Code, validity period, percentage/fixed discount, usage limits | M | Basic | `PLANNED` |

### Phase 3 - Advanced Admin

**Goal:** reduce manual work and improve operational control after the core workflows are stable.

| Priority | Feature | Scope | Complexity | Detail | Status |
| --- | --- | --- | --- | --- | --- |
| P1 | Reports and dashboard | Revenue, orders, best-selling products, inventory, date filters | L | Standard | `PLANNED` |
| P1 | Audit log | Who created/edited/deleted/changed status, with before/after data | L | Standard | `PLANNED` |
| P1 | Large batch import | Queue, progress, retry, chunking, import history | XL | Advanced | `PLANNED` |
| P2 | Fine-grained permissions | Module/action permissions instead of only Admin/User roles | L | Advanced | `PLANNED` |
| P2 | Theme and admin UX polish | Theme, dark mode, color customization, animation, shortcuts | M | Advanced | `PLANNED` |
| P2 | CMS and banners | Banners, homepage content, SEO metadata | L | Advanced | `PLANNED` |

## Group 2 - Client / Customer

This group starts after Phase 1 has produced a catalog with real data. These are product goals, not features currently present in the code.

### Phase 4 - Client Catalog

| Priority | Feature | Initial scope | Complexity | Detail | Status |
| --- | --- | --- | --- | --- | --- |
| P0 | Category navigation | Category menu and category listing pages | M | Basic | `PLANNED` |
| P0 | Product listing | Listing, pagination, brand/category filters, basic sorting | M | Basic | `PLANNED` |
| P0 | Product detail | Information, images, price, variants, basic stock availability | M | Basic | `PLANNED` |
| P1 | Search | Keyword search, empty results, filters, sorting | M | Basic | `PLANNED` |

### Phase 5 - Minimum Shopping Workflow

| Priority | Feature | Initial scope | Complexity | Detail | Status |
| --- | --- | --- | --- | --- | --- |
| P0 | Customer auth | Register, login, logout, forgot/change password | M | Basic | `PLANNED` |
| P0 | Cart | Add, update quantity, remove, validate stock and price | M | Basic | `PLANNED` |
| P0 | COD checkout | Address, order creation, confirmation, cash on delivery | L | Basic | `PLANNED` |
| P0 | Order tracking | Order history, detail, and status | M | Basic | `PLANNED` |
| P1 | Customer profile | Profile, addresses, password change | M | Basic | `PLANNED` |

### Phase 6 - Client Expansion

| Priority | Feature | Scope | Complexity | Detail | Status |
| --- | --- | --- | --- | --- | --- |
| P1 | Online payments | Payment gateway, callbacks, reconciliation, failure handling | XL | Standard | `PLANNED` |
| P1 | Promotions | Coupons, flash sales, bundles, conditional pricing | L | Standard | `PLANNED` |
| P1 | Wishlist and recently viewed | Save products and browsing history | M | Basic | `PLANNED` |
| P1 | Reviews / Q&A | Ratings, images, questions, moderation | L | Standard | `PLANNED` |
| P1 | Returns / warranty | Return requests, refunds, warranty cases | XL | Standard | `PLANNED` |
| P2 | Notifications | Email/SMS/push for auth, orders, and marketing | L | Advanced | `PLANNED` |
| P2 | Recommendations | Personalized suggestions and behavior-based ranking | XL | Advanced | `PLANNED` |

## Excel Import Rules

Import is a shared capability for selected management pages, not a standalone feature to build before CRUD.

### Recommended Adoption Order

1. Brand and category: few columns, easy to provide a template and validate.
2. Basic products: add brand/category mapping, slug, and status.
3. Product variants/SKUs and inventory: build only after the product model is stable.
4. Users: import only after temporary-password, role, and file-security rules are finalized.

### Minimum Requirements

- Provide a template and document required/optional columns.
- Limit file size and row count; do not process unlimited files in an HTTP request.
- Preview before writing; validate every row and report errors by row/column.
- Define duplicate behavior explicitly: reject, update, or upsert; never choose implicitly.
- Log the importer, timestamp, filename, and successful/failed row counts.
- Enforce database uniqueness for product slugs, SKUs, and other business keys.
- For large files, use a background job in Phase 3 instead of keeping the request open.

## Decisions Still Needed

| Topic | Why it matters | Current recommendation |
| --- | --- | --- |
| Database | Project documentation says SQL Server, while appsettings, migrations, and `EF.Functions.ILike` currently target PostgreSQL. | Choose one database before expanding Product/Import and creating more migrations. |
| Roles and permissions | The current code has simple roles; admin core needs to know who can manage each module. | Use minimal roles in Phase 1; add fine-grained permissions in Phase 3. |
| Excel library | No package or file convention exists yet. | Choose an `.xlsx` library with streaming support and bounded memory usage. |
| Soft delete | Entities have a soft-delete base, but delete APIs and uniqueness behavior must be consistent. | Use soft delete for catalog data and define whether deleted slugs/names can be reused. |
| Image uploads | Brand/category have `LogoUrl`, but there is no upload workflow. | Allow URLs in Phase 1; add upload/object storage when product detail begins. |

## Recommended Next Step

Complete Brand and Category CRUD in the backend, add focused service/controller tests, then build two management screens using a shared table/form. Next, complete admin User management and basic Product management. Start Excel import only after these modules work end-to-end from UI to database.

## Detailed Documents

- [Admin design prompt index](./designs/README.md)
- [Admin Phase 1 design prompt](./designs/admin-phase-1-core-catalog.md)
- [Admin Phase 2 design prompt](./designs/admin-phase-2-operations.md)
- [Admin Phase 3 design prompt](./designs/admin-phase-3-advanced.md)
- [Legacy sprint roadmap](./roadmap/README.md)
- [Detailed MVP and roadmap](./roadmap/02-mvp-roadmap.md)
- [Detailed stories](./roadmap/04-stories.md)
- [Technical rules](./roadmap/05-rules-tech.md)
- [Legacy progress tracker](./progress.md)
