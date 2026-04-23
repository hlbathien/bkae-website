# Phase 32 — cms-globals-stats-process

## Scope
Add Payload globals StatsBoard + ProcessFlow, extend HomePage, surface via cms-server facade, update seed + SoT.

## Files
- src/globals/StatsBoard.ts (new)
- src/globals/ProcessFlow.ts (new)
- src/globals/HomePage.ts (extended: heroEyebrow, heroSubheadline, heroLiveBandSuffix)
- payload.config.ts (register StatsBoard + ProcessFlow)
- src/lib/cms.ts (Stat, ProcessNode, HomePageContent types; sparkline data on stats; homePageMock)
- src/lib/cms-server.ts (fetchStats, fetchProcessNodes, fetchHomePage; Project.stack tag→string normalization)
- scripts/seed.mts (idempotent updateGlobal for stats-board, process-flow, home-page)
- docs/SOURCE_OF_TRUTH.md (§7 globals list, §8 types)

## Acceptance
- typecheck: ✅ (pnpm typecheck → 0 errors)
- lint: ✅ (10 pre-existing warnings; 0 new)
- build: ✅ (pnpm build, all 39 routes generated; payload init err during prerender expected since DATABASE_URI absent in CI — facade falls back to mock)
- generate:types: deferred (Node 23 + payload tsx loader pre-existing incompat; will resolve when DB online or with `pnpm payload` runtime)
- migrate:create: deferred (requires running postgres; Docker not available this session)
- smoke: build output identical structurally; mock data flows unchanged

## Notes
- `pnpm generate:types` and migration generation require Docker postgres + a TTY; founder must run after `docker compose up -d`:
    pnpm generate:types
    pnpm migrate:create --name stats_process_globals
    pnpm migrate
    pnpm seed
- `Project.stack` Tag→string mapping in cms-server preserves mock contract (`string[]`).
