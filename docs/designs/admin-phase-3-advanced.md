# Figma Prompt - Admin Phase 3: Advanced Operations and Governance

Copy the prompt below into Figma Agent after Phases 1 and 2 have been reviewed.

---

## Prompt

Design the third desktop Admin experience for **Vexa**, an e-commerce platform for mobile phones and electronics.

Create exactly **15 desktop frames**, with a tolerance of 2 frames if needed. Use one Figma page named `Admin Phase 3 - Advanced Admin`. Do not create mobile layouts, customer-facing pages, or unrelated visual concepts.

### Product and implementation context

This phase builds on the Vexa Admin shell and workflows from Phases 1 and 2. The app is React-based and will use Tailwind CSS, Ant Design, and Lucide icons. The core admin can already manage catalog data and operational workflows; this phase improves visibility, governance, permissions, batch processing, CMS controls, and visual polish.

The interface should be efficient for people who work in the admin every day. Favor scanability, comparison, filters, clear data hierarchy, and predictable controls over decorative presentation.

### Visual system

Preserve the Vexa design language:

- Primary color: `#6610f2`.
- Primary scale: `#f4e6ff`, `#dbb5ff`, `#c48cff`, `#a963ff`, `#8c3bff`, `#6610f2`, `#4a04cc`, `#3400a6`, `#240080`, `#160059`.
- Use neutral white/cool-gray surfaces as the foundation. Use purple selectively for primary actions and selected states; use green, amber, red, and slate for operational status.
- Modern, soft, professional, and calm. Use clear borders, small shadows, generous but efficient spacing, and 8px or smaller radius.
- Use Ant Design patterns for dashboards, tables, tabs, filters, forms, drawers, modals, alerts, date ranges, upload, steps, and permissions matrices.
- Use Lucide icons rather than hand-drawn icons. Favor icons for dashboard, chart, package, warehouse, clipboard, history, shield, key, users, upload, settings, palette, image, search, filter, download, refresh, check, warning, and close.
- Keep the same 248px sidebar, top header, breadcrumb, Vexa wordmark, and custom V-shaped logo mark from previous phases. The logo must be beside the name Vexa, never isolated as a text-only brand.
- Use 1440 x 1024 desktop frames and make the content work at 1280px wide. Do not generate mobile screens.

### Content and interaction rules

- All visible interface copy must be in English.
- Use realistic commerce data and dates. Include useful empty, loading, error, permission-denied, no-access, processing, completed, and failed states as variants or sections inside the relevant frame.
- Use text and icons in addition to color for statuses.
- Keep advanced controls progressive: show the common action first, place secondary actions in menus, and use drawers for details that do not need a full page.
- Destructive or irreversible actions require a confirmation modal with a clear consequence.
- Make date range, filters, saved views, pagination, table density, and export behavior visible where relevant.
- Avoid making every page a grid of cards. Use charts only when they answer an operational question.

### Required frames

Create these 15 named frames.

1. `01 - Executive Operations Dashboard`
   - Admin dashboard with date range and store/warehouse filter.
   - Show revenue, orders, average order value, low-stock SKUs, failed imports, and pending actions.
   - Include a useful revenue/orders trend, best-selling products table, low-stock table, and recent activity.
   - Include loading, no-data, and date-range-empty variants.

2. `02 - Sales Report`
   - Report page with date range, comparison period, export, saved filter/view, summary metrics, trend chart, channel/payment/status breakdown, and detail table.
   - Make the table easy to scan and include pagination.

3. `03 - Inventory Report`
   - Inventory health report with stock value, low-stock count, out-of-stock count, aging stock, stock movement trend, and SKU detail table.
   - Include warehouse/location filters, category/brand filters, export, and empty state.

4. `04 - Audit Log List`
   - Audit table with timestamp, actor, role, action, module, record, result, and IP/device summary.
   - Include search, actor/action/module/date filters, pagination, export, and a clear read-only treatment.

5. `05 - Audit Event Detail Drawer`
   - Detail drawer showing event metadata, human-readable change summary, before/after values, request context, and linked record.
   - Include sensitive-value masking and an event-not-found state.

6. `06 - Roles and Permissions List`
   - Roles table with role name, description, users assigned, permission summary, system/custom label, updated date, and actions.
   - Include search, filters, create role, duplicate role, and protected system-role state.

7. `07 - Role Permission Matrix`
   - Role editor with module rows and action columns such as view, create, edit, delete, export, and approve.
   - Include select-all controls, indeterminate checkbox states, permission explanation, unsaved changes warning, and save/reset actions.
   - Keep the matrix readable at desktop width with sticky labels where useful.

8. `08 - Admin Team and Access`
   - Admin user management page focused on role assignment and access status.
   - Include members table, invite/create admin, role selector, active/suspended status, last sign-in, revoke sessions, and confirmation states.

9. `09 - Import Job Queue`
   - Queue-oriented import operations page with queued, running, paused, completed, failed, and canceled jobs.
   - Include filters, progress indicators, queue position, submitted by, retry/cancel/pause actions, and capacity warning.

10. `10 - Import Job Detail and Error Review`
    - Full job detail with step progress, file metadata, processing metrics, valid/invalid rows, error categories, sample row errors, retry failed rows, and download report.
    - Show a completed job and a failed job as variants within the frame.

11. `11 - Banner and Homepage Content List`
    - CMS-style content management table with banner thumbnail, title, placement, status, start/end date, priority, and actions.
    - Include search, placement/status filters, date filter, reorder affordance, preview, create banner, and empty state.

12. `12 - Banner Create and Edit Form`
    - Form for desktop homepage banner with image upload placeholder, title, subtitle, CTA label/link, placement, schedule, active status, and preview panel.
    - Include upload progress/error, invalid link, schedule validation, draft, and published states.

13. `13 - Admin Settings and Preferences`
    - Settings page with tabs for general admin preferences, notifications, table density, timezone/date format, and default landing page.
    - Include save/reset actions, unsaved changes, success feedback, and permission-restricted setting state.

14. `14 - Theme and Component Tokens Preview`
    - Practical admin design-system preview showing primary color scale, neutral palette, status colors, typography hierarchy, table density, buttons, inputs, tags, alerts, modal, drawer, tabs, pagination, and icon buttons.
    - Include light mode and a restrained dark-mode preview only as a secondary variant. Keep the purple palette harmonious and accessible.

15. `15 - Global Admin Feedback and Error Center`
    - Admin-wide feedback patterns: notification center, success toast, warning, API error, session expired, permission denied, maintenance banner, unsaved changes modal, and not-found state.
    - Show how these patterns appear within the Vexa shell and how users recover from each state.

### Output quality

The final set should feel like a mature, trustworthy admin platform rather than a collection of analytics mockups. Keep reports actionable, permissions understandable, batch jobs observable, and settings restrained. Preserve the shared Vexa shell and make every pattern implementable with Tailwind CSS, Ant Design, and Lucide.
