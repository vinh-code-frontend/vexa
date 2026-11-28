---
name: add-base-service-by-entity
description: 'Add the minimum API service flow for a new entity in apps/api: DTOs, validator, mapper, repository, application service, controller, DI registration, migration, and focused tests. Use when adding CRUD APIs for a new entity or when asked to scaffold create, paged list, detail by id, update by id, and delete endpoints. Follow the existing Vexa Clean Architecture patterns, ask before changing entities or old logic, and invoke the grilling skill to stress-test the plan.'
argument-hint: '[entity name and requested API scope]'
user-invocable: true
disable-model-invocation: false
---

# Add Base Service By Entity

Create only the smallest working API flow for a new entity in `apps/api`. This is a scaffolding workflow, not permission to redesign existing code or business rules. Prefer response in Vietnamese.

## Scope and Non-Negotiable Rules

- Apply only to `apps/api` and its projects under `apps/api/src` and `apps/api/tests`.
- Follow the repository's current Clean Architecture boundaries: Domain -> Application -> Infrastructure -> API.
- Inspect nearby implementations, especially `Brand` and `Category`, before choosing names, DTO shapes, response wrappers, status codes, soft-delete behavior, pagination style, or DI registration.
- Use DTOs at API boundaries. Never expose persistence entities from controllers.
- Preserve existing public APIs, business rules, entity fields, migrations, and behavior unless the user explicitly approves a change.
- Do not modify an existing entity, existing service logic, existing controller behavior, or existing repository behavior without naming the exact change and receiving approval.
- Do not introduce generic abstractions, speculative endpoints, filtering, sorting, relationships, authorization rules, transactions, or infrastructure unrelated to the requested base flow.
- Use async I/O and pass `CancellationToken` only when the surrounding API supports it; do not perform a broad signature migration just for this skill.
- Do not silently implement all possible operations. Ask whether each operation is wanted, then recommend the smallest justified set.

## Required Approval Gate

Before editing any file, summarize the discovered local pattern and ask for approval. The summary must include:

1. Entity name, key type, intended layer files, and whether the entity already exists.
2. The requested operations: create, paged list, detail by id, update by id, delete.
3. Any additional API the agent believes is necessary, with a reason; default to none.
4. Whether delete should follow the existing soft-delete convention or a user-approved hard delete.
5. The migration command/name and whether a database update is requested.
6. Files that would be changed or added.

Use the exact phrase `approve all` as an explicit user shortcut. Without that phrase or an equivalent explicit approval, stop after the plan and questions. Never infer approval from the original request when the current request contains a new or broader change.

## Grilling Gate

- After the local pattern scan and before implementation, invoke and follow the `grilling` skill. Ask its design-tree questions in rounds using the `vscode_askQuestions` popup; do not list the questions in Markdown when the popup tool is available. If the popup tool is genuinely unavailable, fall back to a concise Markdown round. At minimum, stress-test:

- Whether all four CRUD operations are actually needed now.
- Whether paging is offset/page-number based or must match an existing list wrapper.
- Whether delete is soft delete and how deleted records behave in detail/list queries.
- Whether validation, uniqueness, normalization, authorization, relationships, or audit fields are required by the entity.
- Whether the migration should be generated only or also applied to the database.

The grilling round must not invent business requirements. Facts about the repository must be read from files. Wait for the user's answers unless the user explicitly says `approve all` and the requested decisions have safe, existing defaults.

## Procedure

### 1. Inspect the repository locally

Read the relevant entity/configuration and nearby implementations before editing:

- Domain entity and enum files.
- `AppDbContext` and the entity configuration.
- Matching DTO request/response, validator, mapping profile, service interface, repository interface, repository implementation, service implementation, controller, and DI registration.
- Existing migration scripts, migration project configuration, and focused tests.

Prefer the closest existing implementation. Do not map the whole repository or refactor neighboring features.

### 2. Establish the smallest contract

Use the existing conventions to propose, then confirm:

- Create: request DTO -> service -> repository -> response DTO.
- Get paged list: existing pagination request/response pattern and active/non-deleted query behavior.
- Get detail by id: nullable/not-found behavior matching the nearest controller and service.
- Update by id: load, map approved fields, validate, persist, return response.
- Delete: use the existing soft-delete flow if that is the local convention.

Do not add search, sort, activate/deactivate, restore, bulk operations, nested resources, or client endpoints unless justified and approved.

### 3. Implement only after approval

Add or update only the files required by the approved scope, normally in this order:

1. Domain entity/configuration only if the user approved creating or changing the entity.
2. Application DTOs, validator, mapping, service interface, repository interface, and service.
3. Infrastructure repository and any approved query/configuration support.
4. API controller with lowercase routes and the existing controller base class.
5. DI registration using the existing extension/registration pattern.
6. Focused application tests and any required API contract coverage.

Keep methods basic and readable. Match local return types, exception handling, mapper usage, naming, formatting, and status-code conventions. Do not repair unrelated incomplete code such as an existing `NotImplementedException` unless it is required by the approved entity flow.

### 4. Generate the migration safely

Only after the approved entity/configuration changes compile:

- Inspect the repository's existing migration command and startup project.
- Generate a named EF Core migration using the existing project/script convention.
- Treat migration generation as a file change requiring approval unless `approve all` was given.
- Do not apply the migration to a database unless the user explicitly requests database update.
- Report the exact migration name, command, and whether application was performed.

Never edit an old migration to make the new entity fit. Never delete or rewrite migrations.

### 5. Validate the change

Run the narrowest useful checks first, then broaden only as needed:

- Format/build the touched API projects.
- Run focused application tests for the new validator/service behavior.
- Verify migration generation and model validation.
- Check that no existing tests or compile errors regress because of the change.

If a check fails, fix only defects introduced by this workflow. Report unrelated pre-existing failures separately.

## Completion Criteria

The task is complete only when:

- Every approved operation has a controller -> service -> repository path.
- DTOs, validation, mapping, persistence configuration, and DI follow nearby patterns.
- No unapproved entity or old-logic changes were made.
- The migration is generated as requested and not applied without permission.
- Focused validation passes, or failures are clearly reported with their cause.
- The final summary lists changed files, implemented operations, migration status, checks run, and any decisions still requiring the user.

## Example Prompts

- `Use add-base-service-by-entity for Product; first inspect patterns and ask for approval.`
- `Add the base CRUD service for Product. Grilling first, no extra APIs, generate but do not apply the migration.`
- `Approve all for the already-reviewed Product base service; implement only create, paged list, detail, update, and soft delete.`