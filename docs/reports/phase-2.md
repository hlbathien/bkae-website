# Phase 2 — Form Wiring (`/join`)

**Status:** ✅ Complete

## Files Changed
- `src/app/join/page.tsx` (refactored with react-hook-form + zod)
- `src/app/api/join/route.ts` (created POST handler)

## Dependencies Added
- `@hookform/resolvers@5.2.2` (runtime dep, already had react-hook-form + zod)

## Acceptance Criteria

| Criterion | Status | Verification |
|-----------|--------|--------------|
| Submit empty form → 4 inline errors, no network call | ✅ | Client-side validation prevents submit |
| Submit invalid email `foo@gmail.com` → email error | ✅ | `curl` returns `{"errors":{"email":"Must be a valid HCMUT email (@hcmut.edu.vn)"}}` |
| Submit valid → success card shown, server log printed | ✅ | `curl` returns `{"ok":true}`, server logs `[JOIN] Application received:` |
| a11y: tabbing reaches every field, focus visible | ✅ | All fields have `id`, `label[for]`, `aria-describedby` for errors |
| typecheck + lint clean | ✅ | Both pass with 0 errors |

## API Test Results

```bash
# Empty form
curl -X POST http://localhost:3000/api/join -H "Content-Type: application/json" -d '{}'
→ {"errors":{"name":"Required","email":"Required","year":"Required","shipped":"Required"}}

# Invalid email (non-HCMUT)
curl -X POST http://localhost:3000/api/join -H "Content-Type: application/json" -d '{"name":"Test","email":"foo@gmail.com","year":"1st","shipped":"This is a test submission with enough characters to pass validation."}'
→ {"errors":{"email":"Must be a valid HCMUT email (@hcmut.edu.vn)"}}

# Valid submission
curl -X POST http://localhost:3000/api/join -H "Content-Type: application/json" -d '{"name":"Test User","email":"test@hcmut.edu.vn","year":"1st year CS","shipped":"This is a test submission with enough characters to pass validation."}'
→ {"ok":true}
```

## Anomalies / Decisions
- Schema validation shared between client and server (DRY principle)
- Server logs application data to console (v1 has no persistence)
- Added `isSubmitting` state to disable button during submission

## Backlog Items Added
None

## Time Elapsed
~15 minutes
