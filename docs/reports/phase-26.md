# Phase 26 — Revalidation + draft preview

## Files changed
- src/app/api/preview/route.ts (new) — validates PREVIEW_SECRET, `draftMode().enable()`, redirects to route
- src/app/api/preview/exit/route.ts (new) — disables draft mode, redirects to `/`
- src/components/chrome/DraftBanner.tsx (new) — server component reading `draftMode()`; amber band w/ exit link
- src/app/layout.tsx — DraftBanner mounted

`afterChange` revalidation hooks wired in phase 21 (src/hooks/revalidate.ts) via `revalidateProject/Post/Event/Member/Page`.

## Acceptance
- tsc 0 ✅
- next build 0 ✅ — `/api/preview`, `/api/preview/exit` registered as ƒ dynamic
- Preview URL pattern: `/api/preview?secret=$PREVIEW_SECRET&collection=projects&slug=lumen-journal`
- Banner shows only in draftMode; `Exit` removes banner (route `/api/preview/exit` clears draftMode).

## Notes
Payload admin Live-Preview wiring (`admin.livePreview.url` in each collection) deferred to phase 27 (admin re-skin) — needs SCSS + Logo/Icon overrides registered together.
