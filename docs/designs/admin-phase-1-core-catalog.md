# Figma Prompt - Admin Phase 1: Core and Minimum Catalog

Copy the prompt below into Figma Agent.

---

## Prompt

Design the first desktop Admin experience for **Vexa**, an e-commerce platform for mobile phones and electronics.

Create exactly **15 desktop frames**, with a tolerance of 2 frames if needed. Use one Figma page named `Admin Phase 1 - Core Catalog`. Do not create mobile layouts, customer-facing pages, or additional decorative concept screens in this task.

### Product and implementation context

The application is a React admin web app. The implementation will use Tailwind CSS for layout and tokens, Ant Design for enterprise UI components, and Lucide for icons. The existing code has partial admin authentication plus user, brand, and category API foundations. The admin UI is still mostly a placeholder, so establish a reusable visual system that can support CRUD workflows.

### Visual system

Use a modern, soft, precise operational style. The primary color is `#6610f2`.

Use this primary scale where appropriate:

`#f4e6ff`, `#dbb5ff`, `#c48cff`, `#a963ff`, `#8c3bff`, `#6610f2`, `#4a04cc`, `#3400a6`, `#240080`, `#160059`.

Use white and cool neutral surfaces as the main background. Add slate/charcoal text, pale gray borders, green success, amber warning, and red destructive states. Purple should identify primary actions, selected navigation, links, and focus states, but not fill every surface. Avoid gradients, glass effects, giant rounded cards, and excessive shadows. Use 8px or smaller corner radius.

Use an Ant Design-inspired desktop shell:

- Fixed left sidebar around 248px wide.
- Slim top header with breadcrumb, search or command trigger, notifications, and user menu.
- Main content width should support dense tables without feeling cramped.
- Page titles, short descriptions, primary action, and secondary actions should align consistently.
- Tables use compact but comfortable row height, visible column labels, sorting, filtering, row actions, pagination, and bulk selection where useful.
- Forms use a two-column desktop layout when there are enough fields, with clear required markers and inline validation.
- Prefer drawers for quick create/edit and full pages for complex product forms.
- Use Lucide icons for navigation and actions such as LayoutDashboard, Users, Tags, FolderTree, Package, Upload, Search, Plus, Pencil, Trash2, MoreHorizontal, Settings, Bell, ChevronRight, X, Check, AlertTriangle, and Download.

### Vexa brand mark

Place the word **Vexa** beside a simple custom V-shaped logo mark in the auth brand block and the application header. The mark should be geometric, soft-cornered, recognizable at 24px, and not look like a generic star or shield. Use the purple primary on light surfaces and white on the sidebar. Do not use a text-only logo.

### Content and interaction rules

- All visible interface copy must be in English.
- Use realistic data such as `iPhone 15`, `Samsung Galaxy S24`, `Xiaomi 14`, `Apple`, and `Samsung`.
- Include loading, empty, error, disabled, validation, success, confirmation, and permission-denied states as variants or clearly labeled sections inside the relevant frame. Do not turn every state into a separate frame.
- Show CRUD affordances clearly: create, read/detail, edit, delete or disable, search, sort, filter, pagination, and confirmation feedback.
- Destructive actions must use confirmation dialogs and explain the consequence.
- Make focus, hover, selected, disabled, and keyboard-friendly states visible for important controls.
- Use accessible contrast and do not communicate status by color alone.

### Required frames

Create these 15 named frames. Keep each frame self-contained and production-oriented.

1. `01 - Admin Login`
   - Desktop login page with Vexa logo mark beside the word Vexa.
   - Email/username, password, remember me, show password, sign-in button, forgot password link, validation error, loading state, and invalid-credentials state.
   - Soft neutral background with a restrained purple brand panel, not a marketing hero.

2. `02 - Admin App Shell and Dashboard`
   - Complete sidebar and top header with the dashboard selected.
   - Show small operational summary cards for users, brands, categories, products, and pending actions.
   - Include a recent activity table and an empty-state alternative.
   - Keep this a useful admin overview, not a decorative analytics dashboard.

3. `03 - User List`
   - User table with name, email, role, status, created date, and row actions.
   - Search, role/status filters, sort, pagination, bulk selection, create-user button, and export action.
   - Include a visible empty state and a loading skeleton variant.

4. `04 - User Create and Edit Drawer`
   - Drawer or modal for create and edit user.
   - Fields: username, email, phone, role, status, temporary password behavior, and notes.
   - Show required validation, duplicate email error, disabled submit, saving, and success feedback.

5. `05 - User Detail`
   - Read-only detail page or large drawer with profile summary, role/status tags, metadata, recent activity, and actions to edit, disable, or delete.
   - Include a confirmation dialog for disabling a user and a permission-denied state.

6. `06 - Brand List`
   - Brand management table with logo mark/avatar, name, slug, active status, display order, updated date, and row actions.
   - Search, sort, status filter, pagination, create-brand button, import/export actions, and empty state.

7. `07 - Brand Create and Edit Form`
   - Reusable brand form shown in create and edit modes.
   - Fields: name, slug preview, description, logo URL or upload placeholder, active status, and display order.
   - Show inline validation, duplicate-name/slug errors, upload failure, saving, and success states.

8. `08 - Category Tree List`
   - Category management table/tree with parent-child hierarchy, category name, slug, active status, display order, and child count.
   - Include expand/collapse, search, active filter, reorder affordance, create root category, and create child category actions.
   - Show an empty tree state.

9. `09 - Category Create and Edit Form`
   - Category form in create/edit modes.
   - Fields: name, slug preview, parent category selector, description, image/logo URL placeholder, active status, and display order.
   - Show invalid parent, duplicate slug, delete restriction because children exist, and successful save states.

10. `10 - Basic Product List`
    - Product table with product name, thumbnail placeholder, brand, category, price, status, updated date, and row actions.
    - Search, status/brand/category filters, sort, pagination, bulk publish/unpublish, create-product button, and import action.
    - Mark this as the first basic product slice, not the advanced variant manager.

11. `11 - Basic Product Create and Edit`
    - Desktop product form with fields: product name, slug, description, brand, category, base price, status draft/published, and primary image placeholder.
    - Use a clear two-column form with sticky action bar.
    - Show validation, unsaved changes warning, saving, and success states.

12. `12 - Basic Product Detail`
    - Product detail page showing identity, status, price, brand/category, description, timestamps, and actions to edit, publish/unpublish, or delete.
    - Include a draft state and a published state within the frame.

13. `13 - Catalog Import Upload`
    - Import wizard step 1 for Brand, Category, or Basic Product Excel import.
    - Include entity selector, downloadable template, drag-and-drop upload zone, file requirements, file size limit, and continue button.
    - Show accepted, invalid file, and oversized file states.

14. `14 - Catalog Import Preview and Validation`
    - Import wizard step 2 with a preview table, row count, valid/invalid summary, row-level errors, column error messages, duplicate policy selector, and confirm import action.
    - Include a disabled confirm state when critical errors exist and a downloadable error report action.

15. `15 - System States and Reusable CRUD Components`
    - A compact component showcase on the same admin shell: buttons, icon buttons with tooltips, inputs, select, date/status tags, pagination, modal confirmation, drawer header, toast, empty state, error state, loading skeleton, and permission denied state.
    - Use this frame to establish reusable Tailwind/Ant Design styling. Keep it a practical reference board, not a marketing page.

### Output quality

Keep spacing, typography, table density, form patterns, navigation, button hierarchy, status colors, and icon sizing consistent across all 15 frames. Make the result feel like one coherent Vexa Admin product that can be implemented with Tailwind CSS, Ant Design, and Lucide rather than a collection of unrelated mockups.
