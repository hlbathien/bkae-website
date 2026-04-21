# Phase 19 — Deps + SoT update

## Files changed
- package.json (scripts + deps)
- pnpm-lock.yaml
- docs/SOURCE_OF_TRUTH.md (§5 IA v2, §7 dirs v2, §17 v2 dep delta)
- docs/BUILDING_PLAN.md (appended phases 19–30 + v2 phase index)

## Deps installed (runtime 3.83.0)
payload · @payloadcms/next · @payloadcms/db-postgres · @payloadcms/richtext-lexical · @payloadcms/plugin-seo · @payloadcms/plugin-redirects · @payloadcms/plugin-form-builder · @payloadcms/plugin-search · @payloadcms/plugin-nested-docs · @payloadcms/plugin-cloud-storage · @payloadcms/storage-s3 · graphql

Dev: cross-env · tsx

## Scripts added
payload, generate:types, generate:importmap, migrate, migrate:create, seed, dev:admin.

## Acceptance
- tsc 0 ✅
- next build 0 ✅ (16 static pages, same route set)
- Deps present in package.json ✅
- SoT §5/§7/§17 updated ✅
- BUILDING_PLAN phases 19–30 registered ✅

## Notes
Payload code not yet imported → no bundle impact. Turbopack dev untested against Payload admin (deferred to phase 21).
