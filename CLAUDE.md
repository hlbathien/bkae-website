# CLAUDE.md

Repository guidance for Claude Code and compatible coding agents.

## Project

`C:\bkae-website` is the Agentic Engineering website: a Next.js 16 marketing site, Payload CMS admin, and machine-readable content surface for an HCMUT student club.

Current documentation authority:

1. Human instruction
2. `docs/SOURCE_OF_TRUTH.md`
3. Current source code
4. `README.md`
5. `docs/WORKFLOW_RULES.md`

Historical phase plans and reports are intentionally gone. Do not resurrect phase sequencing as an authority model.

## Commands

Use `pnpm`.

```bash
pnpm install
pnpm dev
pnpm dev:admin
pnpm build
pnpm start
pnpm lint
pnpm lint:fix
pnpm format
pnpm typecheck
pnpm payload
pnpm generate:types
pnpm generate:importmap
pnpm migrate
pnpm migrate:create
pnpm seed
pnpm exec playwright test
pnpm exec tsx --test tests/*.test.ts
```

Local services:

```bash
docker compose up -d
```

Postgres and Adminer bind to `127.0.0.1`.

## Architecture Notes

- `src/app/layout.tsx` is bare and must stay bare.
- `src/app/(marketing)/layout.tsx` owns the public `<html>`, fonts, JSON-LD, DraftBanner, SmoothScroll, PageTransition, MarqueeBar, Header, GridOverlay, ScrollRail, AudioToggle, Cursor, and Footer.
- `src/app/(payload)/layout.tsx` owns the Payload admin shell.
- `src/lib/cms.ts` contains public fixture contracts and fallback data only.
- `src/lib/cms-server.ts` is the server-only Payload facade and normalization layer.
- `payload.config.ts` defines collections, globals, plugins, admin branding, Postgres, and generated type output.

See `docs/SOURCE_OF_TRUTH.md` for the route map, CMS collections/globals, env vars, security details, and verification commands.

## Guardrails

- Do not add runtime dependencies without explicit approval.
- Do not put Payload or server-only imports in client components.
- Do not collapse the marketing and Payload route groups.
- Do not hand-edit `src/payload-types.ts` unless explicitly asked.
- Do not edit `.env.local` or other secret files unless explicitly asked.
- Use design tokens from `src/app/globals.css`.
- Keep motion compatible with `prefers-reduced-motion`.
- Run fresh verification before claiming work is complete.

## Known Placeholders

These are intentional until production accounts/domains are assigned:

- `https://inference.club`
- `https://github.com/inference-club/*`
- `hello@inference.club`
- `GITHUB_ORG=inference-club`

They are not user-visible brand names.
