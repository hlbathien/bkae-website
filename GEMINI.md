# GEMINI.md

Repository guidance for Gemini and compatible coding agents.

## Project

Agentic Engineering website at `C:\bkae-website`.

The current product is a Next.js 16 public marketing site with Payload CMS admin, dynamic content, SEO/LLM/RSS surfaces, branded motion, and fallback mock data.

Use these living docs:

- `docs/SOURCE_OF_TRUTH.md` for architecture and feature truth
- `README.md` for setup and command reference
- `docs/WORKFLOW_RULES.md` for active workflow rules
- `docs/COPY.md` for intentional copy surfaces

Historical implementation plans and phase reports were removed because they no longer describe the current codebase.

## Commands

```bash
pnpm install
docker compose up -d
pnpm migrate
pnpm seed
pnpm dev
pnpm dev:admin
pnpm typecheck
pnpm lint
pnpm build
pnpm exec playwright test
pnpm exec tsx --test tests/*.test.ts
```

## Architecture

- Root layout is bare: `src/app/layout.tsx`.
- Marketing shell is isolated under `src/app/(marketing)/layout.tsx`.
- Payload shell is isolated under `src/app/(payload)/layout.tsx`.
- Payload config lives at `payload.config.ts`.
- Fallback data/contracts live in `src/lib/cms.ts`.
- Server-only Payload data access lives in `src/lib/cms-server.ts`.
- Generated Payload types live in `src/payload-types.ts`.

Do not collapse route groups or move public chrome into the root layout.

## Guardrails

- No new runtime dependency without explicit approval.
- Keep Payload imports server-side.
- Use existing design tokens and font system.
- Preserve `prefers-reduced-motion` behavior.
- Do not edit secret env files.
- Do not hand-edit generated files unless requested.
- Verify with fresh command output before claiming completion.

The old "Inference" name may remain in placeholder URLs or internal cache keys only. Public brand is Agentic Engineering.
