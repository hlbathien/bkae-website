# Phase 14: journal-cover-mask

**Scope**: Abstract cover visual interactions on post rows.

**Files changed**:
- `src/components/sections/JournalPreview.tsx`
- `src/app/globals.css`

**Acceptance criteria**:
- typecheck ✅
- lint ✅
- build ✅
- smoke ✅

**Anomalies / decisions**:
- Hover scan-line wrapper `.journal-cover-wrap` applies `color-dodge` to an amber stripped gradient rendering an edge to edge wipe via `scaleY`.
- Implemented `CascadeTitle` component internally rendering chars with staggered delay. Replaces pure solid transition with staggered `cascade-char` spans mapping text into characters.
