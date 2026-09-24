# Figma Prompt - Admin Phase 4: Pre-owned and Recommerce

Copy the prompt below into Figma Agent after the core catalog, operations, and governance phases have been reviewed.

---

## Prompt

Design the fourth desktop Admin experience for **Vexa**, an e-commerce platform for mobile phones and electronics.

Create exactly **15 desktop frames**, with a tolerance of 2 frames if needed. Use one Figma page named `Admin Phase 4 - Pre-owned and Recommerce`. Do not create mobile layouts, customer-facing pages, or unrelated concept screens.

### Product and implementation context

This phase adds support for selling inspected pre-owned phones and other used goods. It extends the existing Vexa Admin shell, catalog, inventory, order, return, warranty, audit, and permission workflows. The first release covers inventory already acquired by Vexa. Trade-in or buyback is a separate workflow shown in the final frames and must not be mixed into ordinary product CRUD.

The React admin uses Tailwind CSS, Ant Design, and Lucide icons. The screens should be directly implementable with the existing table, form, drawer, modal, upload, steps, tabs, tag, alert, and pagination patterns.

### Visual and component direction

Preserve the established Vexa design language:

- Primary color: `#6610f2`.
- Use white and cool neutral surfaces as the foundation. Use purple selectively for primary actions and selected states; use green, amber, red, and slate for operational status.
- Use clear borders, small shadows, efficient spacing, and 8px or smaller radius. No purple-only UI, heavy gradients, glassmorphism, or decorative blobs.
- Use Ant Design conventions for tables, tabs, drawers, forms, upload, steps, alerts, date filters, dropdowns, modals, tags, and pagination.
- Use Lucide icons for inspection, device, barcode, shield, camera, package, warehouse, clipboard, history, warning, check, close, search, filter, download, and refresh.
- Keep the same sidebar, header, breadcrumb, typography, table density, button hierarchy, and notification treatment from earlier phases.
- Keep the Vexa wordmark beside the custom V-shaped logo mark in the app shell.
- Use 1440 x 1024 desktop frames and make the content work at 1280px wide. Do not design mobile screens.

### Content and interaction rules

- All visible interface copy must be in English.
- Use realistic Vietnamese used-device data: iPhone 13 128GB, Galaxy S22 256GB, Xiaomi 13T, serial numbers, masked IMEI values, battery health, inspection dates, and VND prices.
- Never show a full IMEI or serial number in a public-facing preview. Use masking in normal views and a permission-aware reveal action for authorized operators.
- Show statuses with text and icons in addition to color: Received, Inspecting, Approved, Needs Repair, Listed, Reserved, Sold, Returned, Quarantined, and Rejected.
- Make condition grades explicit and consistent. Use example grades such as A, B, and C only as sample data; the final grade taxonomy remains a business decision.
- Use component variants or clearly labeled sections for loading, empty, error, validation, permission denied, success, destructive confirmation, and concurrent-update states.
- Destructive or irreversible actions require a confirmation modal with a clear consequence.
- Use sticky action bars for long forms and step indicators for inspection, listing, trade-in, and settlement flows.
- Do not imply that an item is publishable until required inspection, photos, pricing, warranty, and disclosure fields are complete.

### Required frames

Create these 15 named frames.

1. `01 - Pre-owned Inventory List`
   - Table for used and refurbished inventory with item photo, product name, condition grade, masked serial/IMEI, battery health, selling price, stock state, inspection status, warranty, and updated date.
   - Include search, condition/type/status filters, warehouse filter, price range, pagination, export, create item, and bulk status actions where safe.
   - Show empty, low-stock, quarantined, and permission-denied variants.

2. `02 - Receive Pre-owned Item`
   - Intake form for an already acquired device or used good.
   - Include source/reference, product/category, model, color, storage, serial/IMEI, acquisition cost, received date, location, accessories, and initial notes.
   - Show duplicate identifier validation, incomplete intake, save draft, and successful receipt states.

3. `03 - Inspection Checklist`
   - Guided inspection workspace with steps for identity, power, display, camera, audio, connectivity, battery, ports, biometrics, and included accessories.
   - Include pass/fail/not-tested controls, notes, evidence attachments, inspector identity, and progress.
   - Show blocked completion when mandatory checks are incomplete.

4. `04 - Condition Grade Approval`
   - Review page for cosmetic and functional grading.
   - Show proposed grade, inspection evidence, defect summary, battery health, missing accessories, repair recommendation, final grade selector, approval history, and approve/reject/request-reinspection actions.
   - Include a role-restricted approval state and a grade-change confirmation.

5. `05 - Device Identity and Item Detail`
   - Detail page for one physical item with masked identifiers, permission-aware reveal, acquisition history, inspection history, current location, status timeline, cost, price, warranty, order link, and audit events.
   - Include sold, returned, quarantined, and not-found variants.

6. `06 - Item Photos and Defect Evidence`
   - Media manager for item-specific photos: front, back, sides, screen, battery, serial label, and defects.
   - Include primary image, reorder, captions, privacy warning for identifiers, upload progress, invalid file error, delete confirmation, and missing-required-photo state.

7. `07 - Used Pricing and Warranty Form`
   - Form for acquisition cost, target margin, selling price, markdown, warranty duration, return eligibility, warranty exclusions, included accessories, and customer disclosure text.
   - Show price validation, missing disclosure, expired warranty, unsaved changes, saving, and success states.

8. `08 - Pre-owned Listing Readiness`
   - Publish-readiness checklist summarizing identity, inspection, grade, photos, pricing, warranty, stock, and disclosure requirements.
   - Include a read-only customer listing preview section without designing a separate customer page.
   - Show publish blocked with field-level errors, publish confirmation, draft, listed, and unpublished states.

9. `09 - Item-level Inventory and Reservation`
   - Inventory view showing unique item state, location, available/reserved quantities, reservation expiry, order number, and stock movement.
   - Include reserve/release action, concurrent reservation conflict, transfer location drawer, quarantine action, and adjustment history.

10. `10 - Used Order Fulfillment and Handover`
    - Order processing page focused on a unique used item.
    - Show item identity verification, pick and pack checklist, packaging/accessories confirmation, shipping handover, customer-visible condition confirmation, and activity timeline.
    - Include serial mismatch, damaged-before-shipping, cancellation, and completed handover states.

11. `11 - Used Return and Warranty Case`
    - Case detail for a returned or warranty item with order, sold-item identity, customer reason, received-item identity check, defect evidence, decision, repair/replacement/refund path, and status timeline.
    - Include wrong-item return, return-window violation, approved, rejected, and pending-inspection variants.

12. `12 - Trade-in Submission List`
    - Separate trade-in queue with submission number, customer, device summary, masked identifier, submitted date, preliminary quote, status, assigned operator, and next action.
    - Include statuses Submitted, Awaiting Details, Inspection, Quote Sent, Customer Approved, Declined, Received, and Settled.
    - Add search, status/source/date filters, assignment, pagination, and permission-aware actions.

13. `13 - Trade-in Inspection and Valuation`
    - Trade-in detail flow with customer-provided information, received-device identity check, inspection checklist, proposed grade, deductions, valuation breakdown, preliminary versus final quote, evidence, and operator notes.
    - Include ownership/blacklist check result, quote expiry, reinspection, and customer-approval-required states.

14. `14 - Trade-in Settlement and Handover`
    - Settlement workspace showing approved quote, payout method, store credit option, customer confirmation, device handover receipt, finance review, and final status history.
    - Include cash/store-credit variants only as clearly labeled options, failed settlement, cancellation before payout, duplicate settlement prevention, and completed state.

15. `15 - Pre-owned Operations Report and Audit`
    - Report and audit view for received items, inspection pass rate, grade distribution, aging inventory, margin, repair rate, returns, warranty claims, trade-in conversion, and settlement totals.
    - Include date range, warehouse, condition, operator, and status filters; export; item-level drill-down; masked sensitive identifiers; and no-data/error states.

### Output quality

Make the 15 frames feel like a trustworthy recommerce operation, not a standard product catalog with a condition tag. Inspection evidence, exact item identity, disclosure, reservation, handover, warranty, return, and audit history must be visible at the appropriate points. Preserve the shared Vexa shell and make every pattern implementable with Tailwind CSS, Ant Design, and Lucide.
