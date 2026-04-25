# Workflow Rules

These are the active repository rules. Historical phase plans and per-phase report requirements have been removed; work should now follow the current code and `docs/SOURCE_OF_TRUTH.md`.

## Authority Order

1. Explicit human instruction in the current task
2. `docs/SOURCE_OF_TRUTH.md`
3. Current source code
4. `README.md`
5. Agent handoff docs (`CLAUDE.md`, `GEMINI.md`)

If source code and `SOURCE_OF_TRUTH.md` conflict, update the one that is wrong in the same change. If a human instruction conflicts with a safety rule or production secret handling, stop and ask.

## Read Before Write

- Read the governing source files before editing them.
- Search for existing helpers before adding new utilities.
- Prefer existing design tokens, components, hooks, and CMS facades.
- Keep edits scoped to the requested change.
- Do not hand-edit generated files such as `src/payload-types.ts` unless the task is explicitly about generated output.

## Dependencies

- Do not add runtime dependencies without explicit approval.
- Prefer existing stack choices: Next, React, Tailwind tokens, GSAP, Lenis, Payload, Zod, React Hook Form.
- `plugin-redirects` and S3 storage packages are installed but not fully wired as active features.

## Commands

Allowed routine commands:

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
docker compose up -d
docker compose ps
git status
git diff
git add <explicit paths>
git commit
```

Forbidden unless explicitly requested:

- `git push`
- `git reset --hard`
- `git checkout -- .`
- `git clean`
- `git rebase`
- `git commit --amend`
- `--no-verify`
- publishing packages
- destructive deletes outside the requested scope
- editing `.env.local` or other local secret files

## Verification Gates

Use fresh command output before claiming success:

```bash
pnpm typecheck
pnpm lint
pnpm build
pnpm exec tsx --test tests/*.test.ts
pnpm exec playwright test
```

Docs-only changes normally require `pnpm typecheck`, `pnpm lint`, and `pnpm build`. Run unit/browser tests when docs changes are coupled to code or route behavior.

## Architecture Guardrails

- Keep `src/app/layout.tsx` bare.
- Keep marketing and Payload route-group layouts separate.
- Keep Payload imports out of client components and out of `src/lib/cms.ts`.
- Normalize server CMS data through `src/lib/cms-server.ts`.
- Preserve fallback fixture contracts in `src/lib/cms.ts`.
- Update `docs/SOURCE_OF_TRUTH.md` when routes, collections, globals, API surfaces, env vars, or top-level architecture change.

## Design Guardrails

- Use color tokens from `src/app/globals.css`; avoid raw component hex values.
- Use the existing font system.
- Keep motion gated by `prefers-reduced-motion`.
- Do not add analytics or third-party tracking without explicit approval.
- Do not collapse public and admin shells.

## Git Hygiene

- Review `git status` and `git diff` before final response.
- Stage explicit paths only if the user asks for staging or commit.
- Do not revert unrelated user changes.
- Do not remove generated or historical files unless the task asks for cleanup or they are proven stale for the task.
