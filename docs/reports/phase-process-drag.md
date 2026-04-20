# Phase 12: process-drag

**Scope**: Horizontal scroll-jack gains drag-pan + edge draw + mobile stagger.

**Files changed**:
- `src/components/sections/Process.tsx`

**Acceptance criteria**:
- typecheck ✅
- lint ✅
- build ✅
- smoke ✅

**Anomalies / decisions**:
- Added `mobileTrack` ref with mobile stagger.
- Added pointer events to `trackEl` to achieve Lenis-agnostic drag panning while Scrub 1 handles GSAP timeline visually.
- Replaced dashed SVG line for process edges with solid `origin-left` `div` scaled via timeline over ScrollTrigger progress.
