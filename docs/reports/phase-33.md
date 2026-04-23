# Phase 33 — cms-wire-server-routes

## Scope
Swap mock cms imports → cms-server facade for all server-only routes.

## Files
- src/app/(marketing)/projects/page.tsx
- src/app/(marketing)/projects/[slug]/page.tsx
- src/app/(marketing)/journal/page.tsx
- src/app/(marketing)/journal/[slug]/page.tsx
- src/app/(marketing)/journal/tag/[slug]/page.tsx
- src/app/(marketing)/llms.txt/route.ts
- src/app/(marketing)/llms-full.txt/route.ts
- src/app/api/rss/route.ts

## Acceptance
- typecheck: ✅
- build: ✅ (39 routes; SSG static params hydrated through facade fallback)
- Project.stack normalization: handled in cms-server.normalizeProject

## Notes
- All listed pages now async; generateStaticParams + generateMetadata also async-fetch.
- Mock fallback intact; without DB, behavior unchanged.
