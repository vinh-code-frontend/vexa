# Figma Prompt - Admin Phase 2: Catalog and Sales Operations

Copy the prompt below into Figma Agent after Phase 1 has been reviewed.

---

## Prompt

Design the second desktop Admin experience for **Vexa**, an e-commerce platform for mobile phones and electronics.

Create exactly **15 desktop frames**, with a tolerance of 2 frames if needed. Use one Figma page named `Admin Phase 2 - Operations`. Do not create mobile layouts, customer-facing pages, or unrelated concept screens.

### Product and implementation context

This phase extends the Vexa React admin application after the core admin shell, authentication, user management, brand management, category management, and basic product CRUD are established. The implementation uses Tailwind CSS, Ant Design, and Lucide icons.

This phase covers the operational catalog and sales workflows: advanced products, variants/SKUs, images, inventory, orders, customers, coupons, and advanced product import. The screens must feel like one product with Phase 1, not a new visual direction.

### Visual and component direction

Use the established Vexa visual system:

- Primary color: `#6610f2`.
- Primary scale: `#f4e6ff`, `#dbb5ff`, `#c48cff`, `#a963ff`, `#8c3bff`, `#6610f2`, `#4a04cc`, `#3400a6`, `#240080`, `#160059`.
- White and cool neutral surfaces should dominate. Use green for success/available, amber for pending/low stock, red for destructive/out-of-stock, and slate for neutral information.
- Modern, soft, calm operational design with clear density. Use subtle borders, small shadows, and 8px or smaller radius. No purple-only UI, heavy gradients, glassmorphism, or decorative blobs.
- Use Ant Design conventions for tables, tabs, drawers, forms, upload, steps, alerts, date filters, dropdowns, modals, tags, and pagination.
- Use Lucide icons for actions and navigation. Use familiar icons for edit, delete, upload, download, filter, search, package, warehouse, shopping bag, truck, user, tag, warning, check, close, and more.
- Use the same fixed sidebar, header, breadcrumb, typography, table density, button hierarchy, and notification treatment from Phase 1.
- The Vexa wordmark must always sit next to a simple custom V-shaped logo mark in the app header/sidebar brand block. Use a purple version on light surfaces and a white version on the dark/purple sidebar.
- Use desktop frames at 1440 x 1024. Do not design mobile screens yet.

### Content and interaction rules

- All visible interface copy must be in English.
- Use realistic mobile-phone data: iPhone 15 128GB, Galaxy S24 256GB, Xiaomi 14 Black, and SKU examples.
- Keep CRUD clear: list, detail, create, edit, disable/delete, bulk actions, filters, pagination, confirmation, and feedback.
- Use component variants or clearly labeled sections for loading, empty, error, validation, disabled, permission denied, success, and destructive states. Do not create unnecessary extra frames for every state.
- Show stock and order status with text plus color/icon, never color alone.
- Use sticky action bars for long forms and step indicators for import flows.
- Prefer a side drawer for short adjustments and a full page for complex product/order editing.
- Design for keyboard-friendly controls, visible focus states, and clear error messages.

### Required frames

Create these 15 named frames.

1. `01 - Advanced Product List`
   - Product table with thumbnail, name, brand, category, variant count, price range, stock summary, publication status, updated date, and row actions.
   - Add search, filters, sort, pagination, bulk publish/unpublish, bulk archive, import, export, and create product actions.
   - Show low-stock and unpublished indicators.

2. `02 - Product Information and SEO Form`
   - Full product edit page for name, slug, description, brand, category, SEO title, SEO description, status, and visibility.
   - Use tabs or clear sections and a sticky save bar.
   - Show validation, unsaved changes, saving, and successful save states.

3. `03 - Product Variant and SKU Manager`
   - Product detail workspace with a variant table.
   - Columns: SKU, color, storage, price, sale price, stock, active status, and actions.
   - Include add variant, edit variant drawer, duplicate SKU validation, activate/deactivate, and delete confirmation.

4. `04 - Product Images and Specifications`
   - Product media manager with drag-and-drop upload, image order, primary image, alt text, delete confirmation, and upload progress.
   - Include specifications table with add/edit/delete rows for values such as RAM, storage, color, and dimensions.
   - Show upload error and empty media states.

5. `05 - Inventory Overview`
   - Inventory table with product, SKU, warehouse/location, available, reserved, damaged, reorder threshold, and stock status.
   - Add search, filters, low-stock filter, date filter, pagination, export, and adjust-stock action.

6. `06 - Stock Adjustment Drawer`
   - Drawer for stock adjustment with SKU/product context, adjustment type, quantity, reason, reference, notes, current stock preview, resulting stock preview, and confirmation.
   - Include validation for negative stock, insufficient permissions, saving, and success feedback.

7. `07 - Inventory Adjustment History`
   - Timeline or table showing adjustment date, SKU, quantity delta, before/after quantity, reason, reference, and operator.
   - Include date range, type filter, operator filter, export, pagination, and empty state.

8. `08 - Order List`
   - Order table with order number, customer, item count, total, payment method, fulfillment status, payment status, created date, and actions.
   - Include search, status tabs/filters, date range, sort, pagination, export, and bulk status action where safe.

9. `09 - Order Detail and Processing`
   - Order detail page with status stepper, customer/contact card, shipping address, line items, price breakdown, payment/COD information, notes, and activity timeline.
   - Include update-status modal, cancel confirmation, print/download invoice action, and permission-aware controls.

10. `10 - Customer List`
    - Customer table with name, email, phone, order count, lifetime value, account status, last order, and actions.
    - Include search, status filters, date filters, pagination, export, and create customer only if the product supports it.

11. `11 - Customer Detail`
    - Customer detail page with profile, contact information, addresses, order history, account status, notes, and account actions.
    - Include lock/unlock confirmation, empty order history, and failed data state.

12. `12 - Coupon List`
    - Coupon management table with code, type, value, validity, usage, status, and actions.
    - Include search, active/expired filter, date filter, create coupon, export, pagination, and empty state.

13. `13 - Coupon Create and Edit Form`
    - Coupon form with code, discount type, amount/percentage, minimum order, start/end time, usage limit, eligible products/categories, and active status.
    - Show validation for invalid date range, percentage over 100, duplicate code, saving, and success.

14. `14 - Advanced Product Import Mapping`
    - Multi-step import wizard for product variants, prices, and stock.
    - Include upload summary, column mapping, required-field markers, sample values, duplicate SKU policy, preview, validation summary, row errors, and confirm import.
    - Keep the workflow understandable without showing every technical detail at once.

15. `15 - Import Jobs and Operations Center`
    - Admin operations page showing recent import jobs with file name, entity, submitted by, submitted time, progress, success/failure counts, status, and actions.
    - Include job detail drawer with row errors, retry/cancel/download report actions, running state, completed state, failed state, and empty state.

### Output quality

Make the 15 frames feel like a mature operational admin application. Keep table actions discoverable, make destructive actions deliberate, and preserve the Phase 1 Vexa shell and component language. The design should be directly translatable into Tailwind CSS layouts with Ant Design components and Lucide icons.
