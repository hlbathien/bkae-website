# Phase 18: live-band

**Scope**: Slim chrome row above MarqueeBar.

**Files changed**:
- `src/components/chrome/LiveBand.tsx`
- `src/components/chrome/MarqueeBar.tsx`
- `src/components/chrome/Header.tsx`
- `src/app/layout.tsx`

**Acceptance criteria**:
- typecheck ✅
- lint ✅
- build ✅
- smoke ✅

**Anomalies / decisions**:
- Created `LiveBand` component displaying ICT time, commit SHA, and ping indicator.
- Updated `MarqueeBar` and `Header` top offsets to correctly stack below `LiveBand` when not scrolled.
- Clock pauses when the browser tab is hidden using the Page Visibility API.
