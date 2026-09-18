# Admin Design Prompts

These prompts are written for a Figma design agent. Run one phase prompt at a time. Each phase asks for approximately 15 desktop frames so the design work stays focused and reviewable.

## Prompt Files

| Phase | File | Focus | Frames |
| --- | --- | --- | --- |
| 1 | [admin-phase-1-core-catalog.md](./admin-phase-1-core-catalog.md) | Admin shell, authentication, users, brands, categories, basic products, catalog import | 15 |
| 2 | [admin-phase-2-operations.md](./admin-phase-2-operations.md) | Product operations, variants, inventory, orders, customers, coupons, advanced import | 15 |
| 3 | [admin-phase-3-advanced.md](./admin-phase-3-advanced.md) | Reports, audit, permissions, batch jobs, CMS, and admin polish | 15 |

## How to Use

1. Give only one phase prompt to Figma Agent at a time.
2. Ask it to create the named frames on one dedicated Figma page for that phase.
3. Keep CRUD states as component variants, drawers, modals, or clearly labeled sections inside the named frame unless the prompt explicitly asks for a separate frame.
4. Review Phase 1 and approve the shared component language before generating Phase 2.
5. Do not generate mobile layouts yet. Preserve the desktop layout so responsive work can be added later.

## Shared Product Context

Vexa is an e-commerce platform for mobile phones and electronics. The Admin application is a React desktop web application using Tailwind CSS, Ant Design, and Lucide icons. The current codebase has partial authentication, user, brand, and category API foundations. Product, inventory, order, import, reporting, and permission workflows are planned.

## Shared Visual Direction

- Primary color: `#6610f2`.
- Primary scale: `#f4e6ff`, `#dbb5ff`, `#c48cff`, `#a963ff`, `#8c3bff`, `#6610f2`, `#4a04cc`, `#3400a6`, `#240080`, `#160059`.
- Use neutral white, cool gray, charcoal, restrained green, amber, and red as supporting colors. Do not make every surface purple.
- Modern, soft, calm, and operational. Favor clear hierarchy, comfortable spacing, subtle borders, small shadows, and restrained 8px radius.
- Use Ant Design patterns for tables, forms, drawers, modals, pagination, tabs, alerts, tags, upload, date pickers, and menus.
- Use Lucide icons inside controls. Do not draw custom SVG icons for ordinary actions.
- Vexa must appear in the app header or auth brand block beside a simple custom V-shaped logo mark. The mark should be recognizable at 24px and work in purple, white, and monochrome.
- Use desktop-first frames at 1440 x 1024. Keep the main content readable at 1280px wide. Do not design mobile screens in this round.
- Avoid marketing hero sections, oversized empty areas, excessive card nesting, glassmorphism, purple gradients everywhere, and decorative blobs.
- Design useful states: loading, empty, error, validation error, disabled, destructive confirmation, success feedback, and permission denied.
- Show realistic Vietnamese mobile-phone data, but keep all interface copy in English.
- Keep labels, buttons, table cells, and helper text inside their containers without clipping or overlap.
