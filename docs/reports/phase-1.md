# Phase 1 — Lint + Format Hardening

**Status:** ✅ Complete

## Files Changed
- `.eslintrc.json` (created)
- `.prettierrc` (created)
- `package.json` (added scripts: `lint:fix`, `format`)
- `src/components/motion/CountUp.tsx` (removed unused ScrollTrigger)
- `src/components/motion/RevealText.tsx` (removed unused ScrollTrigger)
- `src/components/sections/Process.tsx` (removed unused ScrollTrigger)
- `src/components/sections/Projects.tsx` (removed unused ScrollTrigger)

## Dev Dependencies Added
- `eslint@8.57.1`
- `eslint-config-next@15.5.15`
- `@eslint/eslintrc@3.3.5`
- `prettier@3.8.3`

## Acceptance Criteria

| Criterion | Status | Command/Output |
|-----------|--------|----------------|
| `pnpm lint` → 0 errors, 0 warnings | ✅ | `✔ No ESLint warnings or errors` |
| `pnpm typecheck` → 0 errors | ✅ | Exit Code: 0 |
| `pnpm format` → clean | ✅ | All files formatted |

## Anomalies / Decisions
- Used `.eslintrc.json` (legacy format) instead of `eslint.config.mjs` (flat config) due to compatibility issues with Next.js 15.0.3 and ESLint 8/9/10.
- ESLint 8.57.1 is deprecated but required for compatibility with `eslint-config-next@15`.
- Fixed 4 `@typescript-eslint/no-unused-vars` warnings by removing unused `ScrollTrigger` destructuring (the plugin is registered as a side effect in `ensureGsap()`).

## Backlog Items Added
None

## Time Elapsed
~10 minutes
