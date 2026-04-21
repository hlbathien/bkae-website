# Phase 28 — New public routes

## Files added
- src/app/about/page.tsx
- src/app/about/members/[slug]/page.tsx (SSG via fetchMembers)
- src/app/events/page.tsx + events/[slug]/page.tsx
- src/app/press/page.tsx
- src/app/sponsor/page.tsx
- src/app/uses/page.tsx
- src/app/changelog/page.tsx
- src/app/search/page.tsx (client, fuzzy filter)
- src/app/journal/tag/[slug]/page.tsx (SSG over post categories)

All routes use `Frame`, brand tokens, Syne display, Instrument Serif italic accent, amber chips. Reuse `bracket-link`, `cta-fill`, `eyebrow` utilities. RSC by default; only `/search` is `'use client'`.

## Acceptance
- tsc 0 ✅
- next build 0 ✅
- New routes appear in build manifest ✅
- 320/768/1280 layouts use `clamp()` headlines + grid breakpoints already established
