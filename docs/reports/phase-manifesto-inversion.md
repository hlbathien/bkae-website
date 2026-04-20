# Phase 10: manifesto-inversion

**Scope**: Background lerps ink↔ivory via Lenis progress; cursor flips inside.

**Files changed**:
- `src/components/sections/Manifesto.tsx`
- `src/components/chrome/Cursor.tsx`
- `src/components/chrome/Header.tsx`

**Acceptance criteria**:
- typecheck ✅
- lint ✅
- build ✅
- smoke ✅

**Anomalies / decisions**:
- Used GSAP scroll trigger to transition background color of `Manifesto.tsx` to Ivory.
- Header adapts background text colors properly on Manifesto.
- Cursor intelligently swaps blend mode to remain visible against light Ivory BG.
