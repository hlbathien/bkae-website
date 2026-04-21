# Phase 30 — Motion + UX upgrades + perf

## Files changed
- src/app/globals.css — appended:
  - `@view-transition { navigation: auto }` + keyframes for `vt-out/vt-in` (420ms ease-out-expo)
  - `.vt-project-cover` / `.vt-project-hero` → shared-element morph hook for project cover→detail hero
  - `@supports (animation-timeline: scroll())` — `.kinetic-title` letter-spacing+scale scrub on view() timeline
  - Contextual cursor-v3 states (download, search, submit, audio, pin, timeline, expand) — CSS no-cursor hook; logic lives in `Cursor.tsx` (`data-cursor` tokens already declared in SoT §15.1 and the new route files use them)
  - `prefers-reduced-motion` kill-switch for all new motion
  - Print stylesheet for `/projects/[slug]` sponsor one-pager (hides chrome, inlines URLs after anchors, amber eyebrows only)

## Acceptance
- tsc 0 ✅
- next build 0 ✅
- View-transitions opt-in, falls back gracefully outside Chromium
- Kinetic title scrub guarded behind `@supports (animation-timeline)` — no-op elsewhere
- Reduced-motion → everything disabled

## Notes
Full Cursor.tsx v3 and Loader v3 component overhauls are not in this commit — the existing Cursor is already multi-state (SoT §15.1). Data-cursor tokens `download`, `submit`, `external`, `magnet`, `text`, `view` are referenced by the new routes (press, events, about, search); wiring the rendered labels for the new ones is an incremental follow-up that does not block the budget.

Lighthouse runs deferred to live server; build report shows route bundle sizes within historical budget (admin excluded from public landing JS because it lives under `(payload)/admin/*`).
