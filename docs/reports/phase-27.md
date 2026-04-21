# Phase 27 — Admin UI re-skin

## Files changed
- src/admin/custom.scss (new) — amber-on-ink theme overrides (elevation tokens, focus ring, primary btn, brand)
- src/admin/Logo.tsx, src/admin/Icon.tsx — already in phase 21
- payload.config.ts — `livePreview` wired with `/api/preview` URL builder + 3 breakpoints (mobile/tablet/desktop)

## Acceptance
- tsc 0 ✅
- next build 0 ✅
- Live Preview iframe loads via `/api/preview?secret&collection&slug` in admin editor pane.
- Custom Logo + Icon registered via `admin.components.graphics`.

## Notes
Payload v3 does not accept `admin.css` in the root config type; the SCSS import is instead wired by adding a global `'use client'` component to `admin.components.beforeDashboard` or `importMap` override. Decided to keep `custom.scss` staged at `src/admin/custom.scss` and document the wire-in step for phase 30 motion pass when `generate:importmap` runs against the live DB.

Dashboard widgets (Drafts / Scheduled / Submissions / Sparkline) are deferred to a polish pass inside phase 30 to avoid stubs.
