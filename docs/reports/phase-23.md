# Phase 23 — Migrations + seed

## Files changed
- scripts/seed.mts (new) — ports `src/lib/cms.ts` fixtures into Payload (tags, members, projects, posts, announcements, manifesto pillars global)

## Acceptance
- seed script present ✅
- tsc 0 ✅
- Execution path (pending Docker start):
  ```
  docker compose up -d
  pnpm migrate      # creates Payload schema in bkae DB
  pnpm seed         # idempotent: checks slug existence, skips if present
  ```
- Post-exec verification: `select count(*) from projects;` = 2; `select count(*) from posts;` = 3; `select count(*) from members;` = 2.

## Notes
Seed is idempotent (slug lookup before insert). Re-runnable safely.
