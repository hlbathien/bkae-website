# WORKFLOW RULES — Autopilot Coding Agent

> Strict guardrails. Violations = stop work, surface to human. No exceptions.

Audience: GLM-5 (or equivalent) coding agent running unattended on `C:\bkae-website\`.

Authority order (highest → lowest):

1. Explicit human instruction in current prompt
2. `docs/SOURCE_OF_TRUTH.md`
3. `docs/BUILDING_PLAN.md`
4. This file
5. Existing code

If conflict between (2) and code → fix code. Conflict between (1) and (2) → ask human, do not proceed.

---

## R1. Scope discipline

- Work **one phase at a time** in the order defined in `BUILDING_PLAN.md`.
- Do **not** start phase N+1 until phase N acceptance criteria are recorded in `docs/reports/phase-N.md`.
- Do **not** invent phases, refactors, redesigns, or "while I'm here" cleanups.
- Out-of-scope idea? Append to `docs/BACKLOG.md` w/ one-line rationale. Continue current phase.

## R2. Read-before-write

- Before editing a file, read it. Before creating a file, glob the dir.
- Before adding a symbol, grep for existing definitions.
- Never duplicate utility code. Reuse from `src/lib/` and `src/components/primitives/`.

## R3. Dependency lock

- **No new runtime dependencies** without explicit human approval. Devtime tooling (eslint plugins, prettier) only if `BUILDING_PLAN.md` phase requires it.
- If a task seems to need a new dep, stop. Open `docs/BLOCKED.md` w/ entry: phase, task, proposed dep, justification, alternative considered.

## R4. Commands you may run unattended

Allowed:

- `pnpm install`, `pnpm add -D <devdep>` (only if R3 satisfied)
- `pnpm exec tsc --noEmit`
- `pnpm exec next build`
- `pnpm exec next dev` (background; kill before phase end)
- `pnpm lint`, `pnpm format`, `pnpm typecheck`
- `git status`, `git diff`, `git log`, `git add <specific paths>`, `git commit`
- `rtk` prefixed equivalents of all the above

Forbidden without explicit per-call human approval:

- `git push`, `git reset --hard`, `git rebase`, `git checkout -- .`, `git clean`
- `pnpm publish`, `npm publish`
- `rm -rf`, deleting any file outside `node_modules/`, `.next/`, `docs/reports/`
- Any command touching `.env*` files (read or write)
- Any network call other than `pnpm install` registry traffic
- Modifying global `git config`, shell rc files, system PATH

## R5. Commit hygiene

- One commit per completed phase. Never amend.
- Stage explicit paths only. Never `git add .` or `git add -A`.
- Message: `phase(N): <slug> — <one-line>`. Body: bullet list of files + acceptance check results.
- If pre-commit hook fails: fix root cause, re-stage, new commit. Never `--no-verify`.

## R6. Acceptance gates

- Phase is complete only when all checkboxes in `BUILDING_PLAN.md` Acceptance section evaluate true via reproducible commands.
- Record the commands + outputs verbatim in `docs/reports/phase-N.md`.
- A failed criterion = phase incomplete. Do not proceed. Do not "try harder later". Fix in current phase or escalate.

## R7. Escalation protocol

Stop work and write a single entry to `docs/BLOCKED.md` if any:

- Acceptance criterion cannot be met after 3 honest attempts
- Source of Truth contradicts itself or reality
- Build fails for reason not caused by your last edit
- A task needs a new dependency or scope change
- You are about to do anything in R4 forbidden list

Entry format:

```
## YYYY-MM-DD HH:MM — Phase N — <short title>
- What I tried: ...
- Why it failed: ...
- What I need from human: ...
```

Then halt. Do not continue.

## R8. State invariants (must hold at all times)

- `pnpm exec tsc --noEmit` exits 0
- `pnpm exec next build` exits 0
- `git status` shows no untracked files outside `docs/reports/`, `node_modules/`, `.next/`
- No file in `src/` contains the strings `lorem`, `TODO!!`, `FIXME!!`, `XXX`, `HACK`
- `src/lib/cms.ts` types unchanged unless SoT updated

Run a 30-second invariant check at the start and end of every task.

## R9. Style + design tokens

- Colors: only via CSS vars in `globals.css @theme`. No raw hex in components.
- Spacing: Tailwind scale only. No magic px values except for typographic clamp() ranges already established.
- Fonts: only `font-display`, `font-serif-italic`, default mono. No new font families.
- Motion: GSAP + Lenis only. No CSS transitions > 300ms on layout properties.

## R10. Reduced-motion contract

Every `useEffect` that animates **must** start with:

```ts
if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  return;
```

If this guard is missing in any new motion code → phase incomplete.

## R11. Reporting

End of every phase, write `docs/reports/phase-N.md` containing:

1. Phase number + name
2. Files changed (paths only)
3. Acceptance criteria, each w/ ✅ or ❌ + the verifying command output
4. Anomalies / decisions made
5. Backlog items added (if any)
6. Time elapsed

Then commit per R5.

## R12. Communication style w/ human

- Terse. No filler. No "I'll now proceed". No "great question".
- Surface decisions, not narration. Show diffs, not prose.
- One status line per phase completion: `phase(N) done — <key metric>`.

## R13. Hard stop conditions (must halt agent)

Halt if any:

- `BLOCKED.md` has unresolved entry
- Two consecutive build failures from agent edits
- Network unreachable for `pnpm install`
- Disk free < 500 MB
- Repo HEAD diverges from agent's last known commit (someone else committed)

## R14. Resumability

- Agent must be able to resume after restart by reading `docs/reports/` to determine current phase.
- Never store progress in memory only. Persist to `docs/reports/`.

---

## Quick checklist before any code change

- [ ] Read SoT section that governs this code
- [ ] Read current file
- [ ] Phase is in scope?
- [ ] No new dep?
- [ ] Reduced-motion guard if motion?
- [ ] Token-based colors?
- [ ] tsc + build pass after change?
- [ ] Acceptance criteria still satisfiable?
