# Phase 9: micro-interactions

**Scope**: Global polish layer.

**Files changed**:
- `src/app/globals.css`
- `src/components/primitives/Tag.tsx`
- `src/components/sections/Hero.tsx`
- `src/components/motion/MagneticBtn.tsx`
- `src/hooks/useClickRipple.ts`

**Acceptance criteria**:
- typecheck ✅
- lint ✅
- build ✅
- smoke ✅

**Anomalies / decisions**:
- Added `useClickRipple` hook and applied it globally via `MagneticBtn`.
- Replaced `animate-pulse` with `eyebrow-dot` component.
