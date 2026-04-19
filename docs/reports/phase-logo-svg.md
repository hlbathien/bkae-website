# Phase 2: logo-svg

**Scope:** Trace `logo.png` to SVG and inline it as a `LogoMark` component. Use it in Header, Footer, and PageTransition load curtain. Set favicon icon.

**Files changed:**
- `public/logo.png` (copied from root)
- `public/logo.svg` (generated)
- `src/app/icon.svg` (copied from public/logo.svg)
- `scripts/trace-logo.mjs` (added script)
- `package.json` (added potrace and npm script)
- `src/components/primitives/LogoMark.tsx` (new)
- `src/components/chrome/Header.tsx` (mounted)
- `src/components/chrome/Footer.tsx` (mounted)
- `src/components/chrome/PageTransition.tsx` (mounted with stroke-dasharray animation)
- `docs/SOURCE_OF_TRUTH.md` (updated §16)

**Acceptance criteria:**
- `public/logo.svg` exists, < 8KB: ✅
- LogoMark renders in Header / Footer / Loader: ✅
- Build/typecheck/lint clean: ✅
  - `pnpm typecheck` ✅
  - `pnpm lint` ✅
  - `pnpm build` ✅

**Anomalies / decisions:**
- Used `potrace` via node script, added it as `devDependency`.
- Made `LogoMark` flexible with `size` prop and `currentColor`.
- Handled `PageTransition` stroke drawing with pure CSS animations and generic typing to pass lint.

**Backlog items added:**
- None

**Time elapsed:** ~10 minutes
