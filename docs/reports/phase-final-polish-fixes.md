# Phase: final-polish-fixes

**Scope:** Address user feedback on progress bar sync, stats text overlap, and missing CTA images.

**Files changed:**
- `src/components/chrome/ScrollRail.tsx`
- `src/components/sections/Stats.tsx`
- `src/components/sections/CTABands.tsx`
- `public/cover-lumen.svg` (new)
- `public/cover-atlas.svg` (new)

**Fixes implemented:**
- Progress bar: ✅ (Synced with document height for accurate viewing progress)
- Stats overlap: ✅ (Single column on mobile, adjusted grid breakpoints)
- CTA images: ✅ (Created placeholder SVGs for missing assets)

**Build/typecheck/lint clean:** ✅
  - `pnpm typecheck` ✅
  - `pnpm lint` ✅
  - `pnpm build` ✅

**Backlog items added:**
- None

**Time elapsed:** ~10 minutes
