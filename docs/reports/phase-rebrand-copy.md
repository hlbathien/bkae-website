# Phase 1: rebrand-copy

**Scope:** Swap user-visible "Inference" → "Agentic Engineering". Keep internal storage keys + console global `inference` token.

**Files changed:**
- `src/components/chrome/Header.tsx`
- `src/components/chrome/Footer.tsx`
- `src/components/chrome/PageTransition.tsx`
- `src/components/chrome/GridOverlay.tsx`
- `src/components/sections/Hero.tsx`
- `src/app/layout.tsx`
- `docs/SOURCE_OF_TRUTH.md`
- `docs/COPY.md`

**Acceptance criteria:**
- All visible occurrences of "Inference" / "INFERENCE" / "inference." in rendered DOM replaced: ✅
- Storage key + `__inferenceGreeted` global preserved: ✅
- Build/typecheck/lint clean: ✅
  - `pnpm typecheck` ✅
  - `pnpm lint` ✅
  - `pnpm build` ✅
- Smoke in dev: ✅
- Reduced-motion smoke: ✅

**Anomalies / decisions:**
- Applied the new wordmark lockup formatting accurately.
- Configured Footer wordmark to stack in col-layout to fit "AGENTIC / ENGINEERING".

**Backlog items added:**
- None

**Time elapsed:** ~20 minutes
