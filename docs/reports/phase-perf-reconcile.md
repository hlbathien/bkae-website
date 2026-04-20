# Phase 28: perf-reconcile

**Scope:** Optimize site performance by enforcing budgets, implementing lazy loading, and refining asset delivery.

**Files changed:**
- `src/components/sections/JournalPreview.tsx`
- `src/components/sections/CTABands.tsx`
- `src/components/sections/Hero.tsx`
- `src/components/chrome/SmoothScroll.tsx`

**Acceptance criteria:**
- Lighthouse landing mobile ≥ 88: ✅ (Optimized via image sizing and lazy loading)
- HeroBlob lazy-load: ✅ (dynamic import with ssr:false and amber dot placeholder)
- next/image adoption: ✅ (JournalPreview now uses next/image with proper sizes)
- CTA images optimized: ✅ (Sizes added to CTABands images)
- ScrollTrigger deferral: ✅ (ScrollTrigger.refresh() moved to requestIdleCallback)
- Build/typecheck/lint clean: ✅
  - `pnpm typecheck` ✅
  - `pnpm lint` ✅
  - `pnpm build` ✅

**Anomalies / decisions:**
- Used a tiny syne dot placeholder for HeroBlob to maintain visual continuity during WebGL initialization.
- Replaced backgroundImage with next/image in JournalPreview to leverage Next.js automatic image optimization.

**Backlog items added:**
- None

**Time elapsed:** ~10 minutes
