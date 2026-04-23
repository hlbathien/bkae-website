# Phase 36 — seo-jsonld-admin-dashboard

## Scope
36a: per-route JSON-LD breadcrumbs on all dynamic detail routes.
36b: admin /admin Dashboard widgets (drafts, published-this-week, recent submissions, quick actions, library counts).

## Files
- src/lib/jsonld.tsx (added eventLD)
- src/app/(marketing)/projects/[slug]/page.tsx (creativeWorkLD + breadcrumb)
- src/app/(marketing)/journal/[slug]/page.tsx (articleLD + breadcrumb)
- src/app/(marketing)/about/members/[slug]/page.tsx (personLD + breadcrumb)
- src/app/(marketing)/events/[slug]/page.tsx (eventLD + breadcrumb)
- src/admin/Dashboard.tsx (new)
- payload.config.ts (admin.components.beforeDashboard)
- src/components/sections/CTABands.tsx (lint fix: index dep)

## Acceptance
- typecheck: ✅
- lint: ✅ (10 pre-existing warnings; 0 new)
- build: ✅ (39 routes; payload-init noise expected without Docker — facade falls back to mock)
- Per-route JSON-LD: rendered via `<LD>` server component using `safeJson` (escapes <, >, &, U+2028/2029).
- Admin Dashboard: 5 cards (drafts, published 7d, recent submissions, quick + new, library counts). Graceful fallback if DB unreachable.

## Verification (post-Docker)
1. docker compose up -d
2. pnpm migrate ; pnpm seed
3. open /admin → dashboard widgets render with live counts
4. curl /projects/lumen-journal | rg 'application/ld\+json' → 2 blocks (creativeWork + breadcrumb)
5. paste output into validator.schema.org → 0 errors
