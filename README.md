# VEXA

> A full-stack learning project for practicing e-commerce architecture, product workflows, and modern web development.
> Phones, pre-owned devices, and an unreasonable number of product states are all welcome here.

Vexa is a full-stack e-commerce platform for mobile phones and electronics. It includes an admin workspace for managing the catalog and operations, plus a Nuxt client for the future shopping experience.

## Tech Stack

### Backend

- **.NET 10** and **ASP.NET Core Web API**
- **Clean Architecture** split into Domain, Application, Infrastructure, and API
- **Entity Framework Core** for persistence and migrations
- **PostgreSQL** through the Npgsql EF Core provider
- **JWT Bearer authentication** for protected API access
- **FluentValidation** for request validation
- **Serilog** with file logging
- **OpenAPI** documents with **Scalar** for API exploration

### Admin

- **React 19** with **TypeScript**
- **Vite** for development and builds
- **React Router** for navigation
- **TanStack Query** for server state and async data
- **Ant Design** for operational UI components
- **Tailwind CSS 4** for styling
- **Lucide React** for icons
- **i18next** and **react-i18next** for localization
- **Orval** for generating a typed API client from OpenAPI documents

### Client

- **Nuxt 4** with **Vue 3** and **TypeScript**
- **Vue Router** for client navigation
- SSR-ready foundation for the customer shopping experience

### Tooling

- **npm workspaces-style scripts** for running the project from the repository root
- **ESLint** and TypeScript checks for the admin app
- **Husky** and **Commitlint** for commit hygiene
- **Concurrently** for running frontend and backend development processes together
- SQL seed and database helper scripts in `scripts/`

## Project Structure

```text
apps/
	api/       ASP.NET Core API and Clean Architecture projects
	admin/     React admin application
	client/    Nuxt customer application
docs/        Product roadmap, design prompts, and development notes
scripts/     Migration, database, and seed helpers
```

## What Vexa Is Learning To Do

- Manage users, brands, categories, and products from the admin app.
- Build a catalog and shopping workflow for phones and electronics.
- Track inventory, orders, payments, and customer operations.
- Sell inspected **pre-owned and refurbished devices** with condition grades, item-level inventory, warranty, returns, and masked IMEI/serial data.
- Eventually support **trade-in/buyback** as a separate workflow, because buying a used phone from a customer is more complicated than adding a product form and hoping for the best.

## Quick Start

Install the root dependencies first:

```bash
npm install
```

Restore the backend dependencies:

```bash
npm run i:be
```

Run the admin and API together:

```bash
npm run dev
```

Run the Nuxt client separately:

```bash
cd apps/client
npm install
npm run dev
```

## Useful Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the React admin and .NET API together |
| `npm run watch` | Start the admin and watch the .NET API |
| `npm run dev:fe` | Start only the admin app |
| `npm run dev:be` | Start only the API |
| `npm run api:admin` | Generate the admin API client from OpenAPI |
| `npm run lint:admin` | Lint the admin app |
| `npm run build:admin` | Build the admin app |
| `npm run test:be` | Run backend tests |
| `npm run validate` | Run admin lint, admin build, and backend tests |
| `npm run db:up` | Apply database updates |
| `npm run db:seed` | Seed development data |

## Development Tracking

See [docs/README.md](docs/README.md) for current features, next priorities, and the phased roadmap.

Useful planning documents:

- [Pre-owned sales sample](docs/sample.md)
- [Admin design prompts](docs/designs/README.md)
- [Detailed product roadmap](docs/roadmap/02-mvp-roadmap.md)

## Current Reality Check

Vexa is under active development. Authentication and project foundations exist, while the catalog, customer shopping flow, inventory, order management, and pre-owned operations are being explored in stages.

The architecture is taking shape, the roadmap is getting ambitious, and the database is politely waiting for everyone to agree on the rules.
