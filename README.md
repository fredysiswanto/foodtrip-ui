# Project Summary – FoodTrip Frontend

**FoodTrip Frontend** adalah aplikasi berbasis **React + TypeScript (Vite)** yang berfungsi sebagai client untuk API backend (Express, repo terpisah).

Project ini menggunakan pendekatan:

- Monorepo (pnpm workspace)
- Feature-based architecture
- Shared packages (API, Types, UI)
- Clean separation antara UI, logic, dan API layer

## Objectives

- Membangun frontend yang scalable dan maintainable
- Memisahkan logic berdasarkan domain (feature-based)
- Mengintegrasikan API backend secara clean (tanpa tight coupling)
- Menerapkan best practices seperti:
  - custom hooks
  - centralized API handling
  - reusable components
  - QA-friendly structure

## Struktur Project Folder

foodtrip-ui/
├── apps/
│ ├── admin/
│ │ ├── src/
│ │ │ ├── app/ # routing & app config
│ │ │ ├── features/ # domain-based features
│ │ │ ├── components/ # shared UI khusus admin
│ │ │ ├── layouts/ # layout admin (sidebar, header)
│ │ │ ├── hooks/ # global hooks (jarang dipakai)
│ │ │ ├── pages/ # entry per route
│ │ │ ├── providers/ # react-query, auth provider
│ │ │ ├── routes/ # route config
│ │ │ ├── styles/
│ │ │ ├── main.tsx
│ │ │ └── vite-env.d.ts
│ │ ├── index.html
│ │ ├── vite.config.ts
│ │ └── tsconfig.json
│ │
│ └── client/
│ ├── src/
│ │ ├── app/
│ │ ├── features/
│ │ ├── components/
│ │ ├── layouts/
│ │ ├── hooks/
│ │ ├── pages/
│ │ ├── providers/
│ │ ├── routes/
│ │ ├── styles/
│ │ ├── main.tsx
│ │ └── vite-env.d.ts
│ ├── index.html
│ ├── vite.config.ts
│ └── tsconfig.json
│
├── packages/
│ ├── api/ # API layer (shared)
│ │ ├── client.ts # fetch wrapper
│ │ ├── endpoints/
│ │ │ ├── auth.ts
│ │ │ ├── food.ts
│ │ │ └── trip.ts
│ │ └── index.ts
│ │
│ ├── types/ # shared types
│ │ ├── auth.ts
│ │ ├── food.ts
│ │ └── index.ts
│ │
│ ├── ui/ # reusable UI components
│ │ ├── button/
│ │ ├── card/
│ │ └── index.ts
│ │
│ └── utils/
│ ├── format.ts
│ ├── constants.ts
│ └── index.ts
│
├── .eslintrc.cjs
├── .prettierrc
├── pnpm-workspace.yaml
├── package.json
└── tsconfig.base.json

## Apps

### 1. Admin App

Digunakan untuk:

- CRUD data (food, trip, user)
- Dashboard monitoring
- Manajemen sistem

### 2. Client App

Digunakan untuk:

- Menampilkan list food/trip
- Detail page
- Search & filter
- Booking / order

## Shared Packages

### `packages/api`

- Centralized API client with endpoint abstraction
- HTTP client wrapper (with token handling, error handling)
- Typed endpoint definitions synced with backend contract
- Token refresh strategy (proactive/reactive)

### `packages/types`

- Shared TypeScript types & interfaces
- Response validation schemas (Zod for client-side validation)
- Sinkronisasi dengan backend API spec

### `packages/ui`

- Reusable UI components
- Contoh: Button, Card, Modal

### `packages/utils`

- Helper functions
- Constants

## Data Flow

```txt
Component
  ↓
Feature Hook (React Query)
  ↓
API Service (packages/api)
  ↓
API Client (fetch wrapper)
  ↓
Backend API (Express - external repo)
```

## Key Principles

- Tidak ada `fetch()` langsung di component
- Semua API lewat `packages/api`
- Gunakan custom hooks untuk business logic
- Component hanya untuk UI (presentational)
- Gunakan React Query untuk server state
- Response validation menggunakan Zod schemas

# TODO LIST (Roadmap Task)

## 🟢 Phase 1 – Setup & Foundation

**Dependencies:** None (start here)

- [ ] Setup monorepo dengan pnpm workspace structure
- [ ] Setup Vite + React TS untuk admin & client apps
- [ ] Setup ESLint + Prettier (config: Airbnb/Prettier defaults)
- [ ] Setup base tsconfig (shared configs for monorepo)
- [ ] Setup routing (React Router v6) untuk kedua apps
- [ ] Setup environment config (API URL per environment)

**Milestone:** Both apps scaffold ready with hot reload & shared config working

## Phase 2 – Core Infrastructure

**Dependencies:** Phase 1 (monorepo + routing ready)

- [ ] Setup `packages/types` dengan Zod untuk API response validation
- [ ] Setup `packages/api`:
  - [ ] HTTP client wrapper (fetch abstraction, error handling)
  - [ ] Endpoint definitions (typed API routes)
  - [ ] Request/response interceptors
  - [ ] Token handling (storage: localStorage/secure cookie strategy)
  - [ ] Token refresh mechanism (proactive vs. reactive)
- [ ] Setup React Query provider & client config:
  - [ ] Cache invalidation strategy
  - [ ] Global error handling integration
  - [ ] Request deduplication
- [ ] Setup MSW (Mock Service Worker) for API mocking during development

**Milestone:** API layer fully functional, can mock backend responses for testing

## Phase 3 – Authentication

**Dependencies:** Phase 2 (packages/api + React Query)

- [ ] Implement login API integration
- [ ] Create `useAuth` hook (login, logout, user context)
- [ ] Store token (localStorage/secure cookie per decision)
- [ ] Protected routes for admin & client apps
- [ ] Role-based access control (RBAC) basics if needed

**Milestone:** Users can authenticate; protected routes work

## Phase 4 – Core Features (Parallel: Client + Admin)

**Dependencies:** Phase 3 (auth), Phase 2 (API layer)

### Client

- [ ] Food list page (with pagination, server-side filtering)
- [ ] Search & filter UI (debounced search, query params for state)
- [ ] Food detail page
- [ ] Basic booking flow

### Admin

- [ ] Dashboard page (analytics/overview)
- [ ] CRUD food (create, read, update, delete)
- [ ] Manage users (list, permissions)
- [ ] Data tables with sorting/pagination

**Milestone:** Core business logic features complete

## Phase 5 – UX & Form Handling

**Dependencies:** Phase 4 (features)

- [ ] Setup react-hook-form + validation (Zod schemas)
- [ ] Standardized form components (Input, Select, etc.)
- [ ] Loading state standardization (spinners, skeleton screens)
- [ ] Error toast/notification system
- [ ] Setup `packages/ui` reusable components
- [ ] Form error handling integration

**Milestone:** UX polished, forms are robust

## Phase 6 – Testing & Quality Assurance (Parallel with Phase 4+)

**Dependencies:** Phase 2 (packages/api ready), can start alongside Phase 4

- [ ] Setup Vitest for unit tests
- [ ] Setup Playwright for e2e tests
- [ ] Test data factories & fixtures
- [ ] API contract validation in tests (response schema validation with Zod)
- [ ] MSW integration for consistent mocking across tests
- [ ] Coverage thresholds & CI integration

**Milestone:** Test suite covers critical paths; e2e tests pass

## Phase 7 – Production Readiness

**Dependencies:** Phase 6 (testing), Phase 4 (features)

- [ ] Environment separation (dev/staging/prod configs)
- [ ] Code splitting & lazy loading routes
- [ ] Bundle size optimization
- [ ] Performance monitoring setup (Core Web Vitals)
- [ ] Error monitoring & logging (e.g., Sentry)
- [ ] CI/CD pipeline setup (GitHub Actions or similar)
- [ ] Security review (token expiry, XSS prevention, CORS)

**Milestone:** Ready for production deployment

---

## 🔑 Critical Decisions & Assumptions

1. **Backend API Contract** — Ensure OpenAPI/Swagger spec is finalized BEFORE Phase 1 starts. This drives `packages/types` design.
2. **Token Storage** — Decide between localStorage vs. secure HTTP-only cookie (cookie recommended for security)
3. **Token Refresh** — Proactive refresh (before expiry) or reactive (on 401 response)? Recommend proactive.
4. **Filtering Strategy** — Server-side filtering (better for large datasets) vs. client-side (simpler). Recommend server-side with query params.
5. **Testing Priority** — Phase 6 should run in parallel with Phase 4 features, not after.

## 🎯 Phase Dependencies & Parallelization

```
Phase 1 (Setup)
  ├─→ Phase 2 (Infrastructure)
      ├─→ Phase 3 (Auth)
      │   └─→ Phase 4 (Features) + Phase 5 (UX)
      │       └─→ Phase 6 (Testing) [can start earlier]
      │           └─→ Phase 7 (Production)
```

**Parallel Opportunities:**

- Phase 4 (Client) & Phase 4 (Admin) can be built independently by different team members
- Phase 5 (UX) can begin once Phase 4 core structure exists
- Phase 6 (Testing) should start with Phase 2, not wait for Phase 4

## 📋 Pre-Launch Checklist

Before kicking off Phase 1:

- [ ] Backend API spec (OpenAPI) finalized & shared
- [ ] Team aligned on auth strategy & token handling
- [ ] Design system / UI kit defined
- [ ] Environment configs (dev/staging/prod URLs) confirmed
- [ ] Deployment target confirmed (Vercel, netlify, self-hosted, etc.)
