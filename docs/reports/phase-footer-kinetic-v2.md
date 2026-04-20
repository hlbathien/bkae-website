# Phase 16: footer-kinetic-v2

**Scope**: Build SHA row + ASCII comment.

**Files changed**:
- `src/components/chrome/Footer.tsx`

**Acceptance criteria**:
- typecheck ✅
- lint ✅
- build ✅
- smoke ✅

**Anomalies / decisions**:
- Added build commit SHA using `NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA` with fallback mock (`a1b2c3d`) alongside local timezone clock.
- Injected an ASCII art comment inside the DOM tree using `dangerouslySetInnerHTML`.
