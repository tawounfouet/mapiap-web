# MAPIAP Web

Frontend du site **MAPIAP Audit & Conseils**, développé par **WebTech Solutions**.

## Status

Implementation phase started.

Current critical path:

```text
LOT-00  Repository Bootstrap
LOT-01  Design Foundations
LOT-02A Initial UI Primitives
LOT-03  Global Layout & Navigation
LOT-04  Homepage MVP
LOT-05  Responsive & Qualification
```

## Requirements

- Node.js 24.x
- pnpm 12.5.1

## Installation

```bash
pnpm install
```

The first real installation must generate and commit `pnpm-lock.yaml`. The lockfile is intentionally not fabricated through the GitHub API.

## Development

```bash
pnpm dev
```

Then open `http://localhost:3000`.

## Quality

```bash
pnpm format
pnpm lint
pnpm typecheck
pnpm test:run
pnpm build
```

Aggregated:

```bash
pnpm check
```

## End-to-end tests

Install Playwright browsers once:

```bash
pnpm exec playwright install
```

Then:

```bash
pnpm test:e2e
```

## Project structure

```text
src/
├── app/
│   ├── (website)/
│   ├── globals.css
│   └── layout.tsx
├── config/
└── lib/
    └── utils/

tests/
└── e2e/
```

The broader architecture is introduced progressively by implementation lot. Empty speculative directories are intentionally avoided.

## Baseline

- Next.js 16
- React 19
- TypeScript 6.0.3
- Tailwind CSS 4
- Vitest 5
- Playwright

> TypeScript is temporarily pinned to 6.0.3 because the current Next.js ESLint toolchain does not yet support the TypeScript 7 API.

## Bootstrap completion gate

LOT-00 is closed only after a real environment has produced a committed `pnpm-lock.yaml` and the following commands are green:

```bash
pnpm check
pnpm test:e2e
```
