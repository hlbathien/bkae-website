# Phase 3: hero-clean

**Scope:** Remove the hero signal strip (Local/Coords/Status/Cohort) and replace with a simplified live build band using mono styling.

**Files changed:**
- `src/components/sections/Hero.tsx`
- `docs/SOURCE_OF_TRUTH.md`

**Acceptance criteria:**
- No "LOCAL" / "COORDS" / "STATUS" / "COHORT" labels in rendered DOM: ✅
- New live band present tracking build SHA and local time: ✅
- Build/typecheck/lint clean: ✅
  - `pnpm typecheck` ✅
  - `pnpm lint` ✅
  - `pnpm build` ✅

**Anomalies / decisions:**
- Replaced `SignalClock` with `LiveClock` to easily output `ICT hh:mm:ss`.
- Replaced the 16+ `gap-y-3` grid with a single `mt-10` line for tighter spacing.

**Backlog items added:**
- None

**Time elapsed:** ~5 minutes
