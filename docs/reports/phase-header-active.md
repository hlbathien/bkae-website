# Phase 17: header-active

**Scope**: Active-route bar + scroll expand.

**Files changed**:
- `src/components/chrome/Header.tsx`

**Acceptance criteria**:
- typecheck ✅
- lint ✅
- build ✅
- smoke ✅

**Anomalies / decisions**:
- Replaced `.draw-underline` with custom active state rendering an orange pill/bar underneath the nav item when `pathname` matches.
- Updated the header container's base state to use `mix-blend-difference`, morphing into the frosted glass backdrop when shrunk.
