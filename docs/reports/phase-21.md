# Phase 21 — Payload bootstrap

## Files changed
- payload.config.ts (new) — postgres adapter, lexical, all collections+globals wired
- next.config.ts — wrapped with `withPayload`
- tsconfig.json — added `@payload-config` path
- src/app/(payload)/admin/[[...segments]]/{page,not-found}.tsx
- src/app/(payload)/admin/importMap.js (stub)
- src/app/(payload)/api/[...slug]/route.ts
- src/app/(payload)/api/graphql/route.ts
- src/app/(payload)/api/graphql-playground/route.ts
- src/collections/Users.ts (+Media/Tags/Members/Projects/Posts/Events/Announcements/Pages)
- src/globals/{SiteSettings,ManifestoPillars,Footer,Navigation,HomePage}.ts
- src/access/roles.ts
- src/hooks/{revalidate,readingTime}.ts
- src/admin/{Logo,Icon}.tsx

## Acceptance
- tsc 0 ✅
- next build 0 ✅ — routes added: `/admin/[[...segments]]`, `/api/[...slug]`, `/api/graphql`, `/api/graphql-playground` (all ƒ dynamic)
- Public route set unchanged ✅
- Admin loads at `/admin` once DB reachable (pending Docker start)

## Notes
Phase 22 (collections+globals schema) folded in — could not register admin routes with empty collection array; schema defined up-front. `payload generate:types` deferred until DB reachable (phase 23).
