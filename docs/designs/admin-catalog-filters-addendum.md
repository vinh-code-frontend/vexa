# Figma Prompt - Admin Catalog Attributes and Filters Addendum

Copy this prompt into Figma Agent after reviewing Admin Phase 1. This addendum closes the catalog-attribute management gap in the existing admin designs and updates selected Phase 1 and Phase 2 frames for consistency.

---

## Prompt

Extend the existing Vexa Admin Figma file using the approved Admin Phase 1 visual system. Do not redesign the shell or create customer-facing/storefront screens.

### Figma pages and frame scope

1. Update these frames on the existing `Admin Phase 1 - Core Catalog` page:
   - `08 - Category Tree List`
   - `09 - Category Create and Edit Form`
   - `11 - Basic Product Create and Edit`
2. Update `04 - Product Images and Specifications` on the existing `Admin Phase 2 - Operations` page.
3. Create one new Figma page named `Admin Catalog Filters Addendum` with exactly these two new desktop frames:
   - `16 - Attribute Definitions and Values`
   - `17 - Category Filter Configuration`

Preserve the existing Phase 1 and Phase 2 frame counts and names. The two addendum frames supplement the existing pages; do not duplicate or rename existing frames.

### Shared visual and implementation context

- Vexa is a phone and electronics e-commerce platform. The admin is a desktop React application using Tailwind CSS, Ant Design, and Lucide icons.
- Match the approved Vexa shell and component language: primary `#6610f2`, neutral white/cool-gray surfaces, restrained status colors, subtle borders, compact but comfortable tables/forms, and 8px or smaller corner radius.
- Use the same 1440 x 1024 desktop frame size, sidebar, header, breadcrumb, typography, controls, and Vexa logo treatment as Phases 1 and 2.
- All visible interface copy must be in English. Use realistic examples such as iPhone 15, Samsung Galaxy S24, Xiaomi 14, Snapdragon 8 Gen 3, Apple A17 Pro, MediaTek Dimensity 9300, Exynos 2400, 8 GB RAM, 256 GB storage, and 120 Hz.
- Make all controls keyboard-friendly and show focus, disabled, validation, success, loading, empty, error, and permission-denied states within the relevant frames where practical.

### Update existing Phase 1 frames

#### `08 - Category Tree List`
- Add a `Filter attributes` summary per category, such as the number of enabled facets.
- Add a clear `Configure filters` row action or category detail action leading to `17 - Category Filter Configuration`.
- Keep hierarchy, expand/collapse, active filter, reorder, search, and create-category actions intact.

#### `09 - Category Create and Edit Form`
- Add a concise `Product attributes and filters` section showing the number/names of attributes currently assigned to this category.
- Include a `Manage attributes` action that opens the category filter configuration workflow. Do not duplicate the entire attribute-management UI inside this form.
- Make it clear that category assignment determines which product attributes are available in the product form and which attributes can be exposed as customer filters.

#### `11 - Basic Product Create and Edit`
- Add a `Specifications and filters` section whose fields are driven by the selected category's configured attributes.
- Show representative fields for phone type/OS, chipset, RAM, storage, refresh rate, network generation, display design, and special features. Indicate data types and units clearly.
- Support multi-select for values such as supported networks and display design; boolean controls for features; and numeric values with units for refresh rate and IP rating where suitable.
- Show a small `Used as customer filter` indicator only for attributes configured as filterable. Provide an editorial `Use cases` multi-select for tags such as Gaming, Long battery life, Great photos, Slim & light, and Compact; visually distinguish these curated tags from technical specifications.
- Keep SKU-specific values such as RAM/storage on the variant when configurations differ between variants. Avoid asking the admin to enter the same value in both product specifications and variant attributes.
- Treat `In stock` as read-only inventory-derived status, not a manually editable specification. Represent `New arrival` as a merchandising label with a visible validity period or clearly marked computed state; do not present it as a technical specification.

### Update existing Phase 2 frame

#### `04 - Product Images and Specifications`
- Keep the image manager and specification table, but make specifications use the shared attribute definitions and category configuration from the addendum.
- Show the configured attribute label, value, unit, customer-filter status, and whether the value belongs to the product or a specific SKU/variant.
- Make RAM/storage variant-specific when the product has multiple configurations. Do not create a second independent specification taxonomy here.
- Clarify that `In stock` comes from inventory and that `5G` belongs to the network-generation attribute, not a duplicate special-feature field.

### New frame requirements

#### `16 - Attribute Definitions and Values`
Create an admin catalog page to manage reusable product attribute definitions and their allowed values.

- Table columns: attribute name, stable key, data type, value count, category usage, customer-filter status, display control, status, updated date, and row actions.
- Include search, type/status/filterability filters, sorting, pagination, `Create attribute`, and empty/loading/error states.
- Include realistic definitions: Device type, Operating system, Chipset, RAM, Internal storage, Refresh rate, Network generation, Display design, Wireless charging, Fingerprint authentication, Face recognition, Water resistance/IP rating, and Curated use cases.
- Show a create/edit drawer or modal with: display name, stable key, data type (option, text, number, boolean), unit where relevant, single/multi-value behavior, allowed options, status, and whether it is eligible to be a customer filter.
- For filterable attributes, show filter control style options appropriate to the data: checkbox list, single-select, range, or boolean toggle. Include display label, sort order, and optional option counts only as presentation settings.
- Enforce readable distinctions between attribute definition, allowed option, product value, and filter presentation; do not suggest that presentation settings are separate product data.
- Include validation for duplicate keys/options, incompatible data type changes, missing units, and an attribute already in use. Show a safe warning before changing/deactivating a used definition.

#### `17 - Category Filter Configuration`
Create a category-specific mapping and presentation page for deciding which shared attributes apply to a category and which are exposed as filters.

- Show the selected category and breadcrumb, e.g. Electronics > Phones > Smartphones, with a category selector/tree.
- Provide a searchable available-attributes panel and an assigned-attributes table. Support add/remove, drag or explicit ordering, and save/cancel with unsaved-change feedback.
- Assigned-attribute columns: attribute, product-entry required/optional, customer filter on/off, filter label, control type, order, and status.
- Allow a category to use only relevant shared definitions; do not allow creating category-specific duplicate definitions from this page.
- Show examples: Smartphone uses device type, chipset, RAM, storage, refresh rate, network generation, display design, and special features; Feature phone uses a smaller appropriate set.
- Distinguish technical filter attributes from curated `Use cases` tags. Do not duplicate 5G as both network generation and a special feature.
- Show safeguards when removing an attribute already used by products, and explain that existing values are retained unless explicitly migrated or cleared.
- Include empty state, saving/success state, validation when the same definition is added twice, and permission-denied state.

### Data and business rules to reflect in the design

- Attribute definitions/options are shared and normalized; categories map to those definitions; products or variants hold the values.
- Product/SKU values are the source for technical filtering. Do not invent customer-filter values independently in a separate UI.
- RAM and storage may be variant-level when shoppers buy distinct configurations; represent that ownership explicitly.
- `In stock` is derived from available inventory. Never model it as an editable product attribute.
- `New arrival` is a merchandising state, not a hardware specification. Show a time window or a computed state, rather than mixing it with specs.
- `Gaming`, `Long battery life`, `Great photos`, `Slim & light`, and `Compact` are editorial use-case labels unless Vexa defines measurable automatic rules. Do not imply they are calculated from chipset, battery, or camera values.
- Keep network generation as the single source for 4G/5G to avoid duplicate fields.

### Output quality

Keep the original Phase 1/2 frame structure recognizable. The updates should integrate naturally into existing pages, while the two addendum frames provide complete attribute and category-filter configuration flows. The result must be implementable using the existing admin component language and should not introduce unsupported business rules.
