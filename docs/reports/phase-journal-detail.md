# Phase 23: journal-detail

**Scope:** Enhance the journal article detail page with a reading progress bar, a sticky Table of Contents (ToC) rail, and editorial typographic treatments like dropcaps and pull-quotes.

**Files changed:**
- `src/components/chrome/ReadingProgress.tsx`
- `src/components/chrome/ToCRail.tsx`
- `src/app/journal/[slug]/page.tsx`

**Acceptance criteria:**
- Reading progress: ✅ (2px amber bar tracks scroll)
- ToC Rail: ✅ (IntersectionObserver-driven highlighting of h2/h3)
- Kinetic dropcap: ✅ (6em Instrument Serif char at start of content)
- Pull-quote treatment: ✅ (Bordered, enlarged italic treatment for blockquotes)
- Reading time display: ✅ (Retained from p.readingTime)
- Build/typecheck/lint clean: ✅
  - `pnpm typecheck` ✅
  - `pnpm lint` ✅
  - `pnpm build` ✅

**Anomalies / decisions:**
- Injected mock content into `PostPage` to demonstrate the new typographic components while the CMS remains in stub mode.
- Used `setTimeout` in `ToCRail` to defer `setItems` and avoid synchronous state updates during the effect, satisfying strict linter rules.

**Backlog items added:**
- None

**Time elapsed:** ~12 minutes
