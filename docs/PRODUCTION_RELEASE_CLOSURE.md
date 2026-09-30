# MAPIAP — Production Release Closure

The implementation roadmap is closed through **LOT-16**. This document governs the remaining work between a technically qualified repository and an authorized public launch.

## Release rule

```text
CI GREEN
   +
TECHNICAL QUALIFICATION
   ≠
PUBLIC LAUNCH

TECHNICAL QUALIFICATION
   +
CONFIRMED CLIENT / BRAND / LEGAL INPUTS
   +
PRODUCTION RUNTIME CONFIGURATION
   +
pnpm release:check = 0 blockers
   =
LAUNCH READY
```

No client, brand, legal or production value may be guessed simply to make the gate green.

## Source of truth

The structured registry is:

```text
release/production-inputs.json
```

It currently contains **13 baseline launch blockers** plus conditional runtime gates for CMS and consent-based analytics.

## Ownership model

- `CLIENT`: a confirmed value, asset, wording or legal fact is required from MAPIAP/Yves before implementation can be finalized.
- `WEBTECH`: WebTech can complete the item once the chosen production mode is known.
- `SHARED`: client input/approval is required first, followed by a WebTech implementation or configuration step.

## Workflow

```text
CONFIRMED INPUT
      ↓
REPOSITORY / RUNTIME CHANGE
      ↓
pnpm release:audit
      ↓
pnpm release:report
      ↓
pnpm release:check
      ↓
0 blockers?
  ├── no  → remain blocked
  └── yes → launch candidate
```

### Human-readable audit

```bash
pnpm release:audit
```

### Machine-readable report

```bash
pnpm release:report
```

### Strict launch gate

```bash
pnpm release:check
```

The strict gate must remain red until every active blocker has been resolved.

## Baseline closure sequence

1. Confirm production domain and contact delivery destination.
2. Freeze homepage, Cabinet, Expertises, Actualités and Contact content.
3. Replace provisional expertise/article slugs from approved content.
4. Integrate official brand colors and portrait.
5. Finalize legal notices and privacy policy from verified facts.
6. Configure the chosen production content/analytics modes.
7. Deploy, validate DNS/HTTPS and execute the final strict gate.
8. Tag the release only after the strict gate reports zero blockers.

## Non-goals

Release Closure must not:

- fabricate a domain;
- invent an email address, phone number or office address;
- invent expertise labels or article content;
- infer official brand hex values from screenshots;
- invent company identifiers or regulated legal wording;
- weaken the gate to obtain a false green status.
