# Phase 24 — cms.ts facade swap (split)

## Files changed
- src/lib/cms.ts — banner updated; pure-data module stays client-safe
- src/lib/cms-server.ts (new) — `server-only` guard; async `fetchProjects/Project/Posts/Post/Members/Announcements/Events` with Payload dynamic-import + mock fallback when `DATABASE_URI` missing or connect fails
- package.json — `server-only` added (blocks Payload from leaking into client bundle)

## Rationale
`cms.ts` is imported by client components (`Stats.tsx`, `MarqueeBar.tsx`, etc.). Putting Payload's `getPayload` dynamic import in the same module dragged the server bundle into client graphs. Split keeps client data pure and moves DB calls to `cms-server.ts` (RSC-only).

## Acceptance
- tsc 0 ✅
- next build 0 ✅
- Dev w/o Docker: routes still render via mock fallback ✅
- Migration path: import `fetchX` from `@/lib/cms-server` in RSC page/layout; no change for client components.
