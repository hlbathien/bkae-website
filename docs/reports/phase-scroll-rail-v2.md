# Phase 19: scroll-rail-v2

**Scope**: Trail + tooltip + clickable rail.

**Files changed**:
- `src/components/chrome/ScrollRail.tsx`

**Acceptance criteria**:
- typecheck ✅
- lint ✅
- build ✅
- smoke ✅

**Anomalies / decisions**:
- Added an array history to track the lag trail indices in `lastActive`, updating CSS to reveal the 800ms trailing dots behind the current actively scrolled section.
- Made the track clickable by capturing `[data-section]` and scrolling with `window.__lenis?.scrollTo`.
- Created glass tooltips that transition from `opacity-0` and shifted position on dot hover.
