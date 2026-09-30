# MAPIAP Web

Frontend du site **MAPIAP Audit & Conseils**, développé par **WebTech Solutions**.

## Status

Core frontend implementation is technically qualified through LOT-16.

```text
LOT-00  Repository Bootstrap                 DONE
LOT-01  Design Foundations                   DONE
LOT-02A UI Primitives                        DONE
LOT-03  Global Layout & Navigation           DONE
LOT-04  Homepage MVP                         DONE
LOT-05  Responsive + Accessibility + QA      DONE
LOT-06  Cabinet                              DONE
LOT-07  Expertises Index                     DONE
LOT-08  Expertise Details                    DONE
LOT-09  Enjeux                               CONDITIONAL / DEFERRED
LOT-10  Actualités Frontend                  DONE
LOT-11  Contact                              DONE
LOT-12  SEO & Technical Routes               DONE
LOT-13  CMS Integration                      DONE
LOT-14  Editorial Workflow & Preview         DONE
LOT-15  Observability / Analytics / Consent  DONE
LOT-16  Final Qualification                  IN PROGRESS
```

Technical readiness does **not** imply launch readiness. The repository still contains explicit client/content/legal/brand placeholders. Run the production release audit before any public launch.

## Requirements

- Node.js 24.x
- pnpm 12.5.1

## Installation

```bash
pnpm install --frozen-lockfile
```

## Development

```bash
pnpm dev
```

Then open `http://localhost:3000`.

## Quality

```bash
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test:run
pnpm build
pnpm test:e2e
```

Aggregated:

```bash
pnpm check
```

## Production release gate

Generate the current launch-readiness report without failing the command:

```bash
pnpm release:audit
```

Require every launch blocker to be resolved:

```bash
pnpm release:check
```

`release:check` exits non-zero while production blockers remain. Typical blockers include:

- official production domain not configured;
- contact transport not configured;
- content still marked `À valider`;
- provisional expertise/article slugs;
- official MAPIAP brand colors not integrated;
- Yves TCHAMO portrait still missing;
- legal pages still provisional;
- CMS or analytics production configuration incomplete when those modes are enabled.

This distinction is intentional:

```text
CI GREEN
   ≠
PUBLICATION AUTHORIZED

Technical Ready
      +
Content / Brand / Legal / Runtime dependencies resolved
      =
Launch Ready
```

## Health check

```text
GET /api/health
```

Returns a minimal non-sensitive liveness response.

## End-to-end tests

Install Playwright browsers once:

```bash
pnpm exec playwright install
```

Then:

```bash
pnpm test:e2e
```

## Baseline

- Next.js 16
- React 19
- TypeScript 6.0.3
- Tailwind CSS 4
- Vitest 5
- Playwright

> TypeScript is temporarily pinned to 6.0.3 because the current Next.js ESLint toolchain does not yet support the TypeScript 7 API.
>
> ESLint is temporarily pinned to 9.39.5 because the React ESLint plugin used by Next.js is not yet compatible with ESLint 10.
