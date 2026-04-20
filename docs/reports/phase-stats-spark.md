# Phase 13: stats-spark

**Scope**: Stats section sparklines + label sweep.

**Files changed**:
- `src/components/primitives/Sparkline.tsx`
- `src/components/sections/Stats.tsx`

**Acceptance criteria**:
- typecheck ✅
- lint ✅
- build ✅
- smoke ✅

**Anomalies / decisions**:
- Created `<Sparkline />` primitive that draws an SVG path and moves a dot along it without `MotionPathPlugin` by grabbing points along the path length on update.
- Updated `Stats.tsx` to include an animated label sweep via `clipPath: inset(...)` to reveal labels incrementally.
- Applied `.stat-mask` to numbers for amber hover sweep mask.
