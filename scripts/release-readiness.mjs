import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const strict = process.argv.includes("--strict");
const jsonOutput = process.argv.includes("--json");
const root = process.cwd();

const blockers = [];
const warnings = [];

async function readRepositoryFile(pathname) {
  return readFile(resolve(root, pathname), "utf8");
}

const registry = JSON.parse(
  await readRepositoryFile("release/production-inputs.json"),
);

const releaseItems = new Map(
  [...registry.blockingInputs, ...registry.conditionalRuntimeGates].map(
    (item) => [item.id, item],
  ),
);

function metadataFor(id) {
  const item = releaseItems.get(id);

  if (!item) {
    throw new Error(`Unknown release-readiness item: ${id}`);
  }

  return {
    id: item.id,
    category: item.category,
    owner: item.owner,
    title: item.title,
  };
}

function addBlocker(id, code, message) {
  blockers.push({
    ...metadataFor(id),
    code,
    message,
  });
}

function addWarning(code, message) {
  warnings.push({ code, message });
}

async function contains(pathname, value) {
  const content = await readRepositoryFile(pathname);

  return content.includes(value);
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

if (!siteUrl) {
  addBlocker(
    "RC-001",
    "DOMAIN_NOT_CONFIGURED",
    "NEXT_PUBLIC_SITE_URL is missing; canonical URLs, robots and sitemap cannot be activated for production.",
  );
} else {
  try {
    const parsedUrl = new URL(siteUrl);

    if (parsedUrl.protocol !== "https:") {
      addBlocker(
        "RC-001",
        "DOMAIN_NOT_HTTPS",
        "NEXT_PUBLIC_SITE_URL must use HTTPS for production release.",
      );
    }
  } catch {
    addBlocker(
      "RC-001",
      "DOMAIN_INVALID",
      "NEXT_PUBLIC_SITE_URL is not a valid absolute URL.",
    );
  }
}

if (!process.env.CONTACT_WEBHOOK_URL?.trim()) {
  addBlocker(
    "RC-002",
    "CONTACT_TRANSPORT_MISSING",
    "CONTACT_WEBHOOK_URL is missing; the public contact form cannot deliver messages.",
  );
}

const contentSource = process.env.CONTENT_SOURCE?.trim() || "local";

if (contentSource === "cms") {
  if (!process.env.CMS_CONTENT_API_URL?.trim()) {
    addBlocker(
      "RC-CMS-001",
      "CMS_ENDPOINT_MISSING",
      "CONTENT_SOURCE=cms requires CMS_CONTENT_API_URL.",
    );
  }

  if (!process.env.EDITORIAL_PREVIEW_SECRET?.trim()) {
    addBlocker(
      "RC-CMS-002",
      "PREVIEW_SECRET_MISSING",
      "CMS editorial workflow requires EDITORIAL_PREVIEW_SECRET.",
    );
  }

  if (!process.env.EDITORIAL_REVALIDATION_SECRET?.trim()) {
    addBlocker(
      "RC-CMS-003",
      "REVALIDATION_SECRET_MISSING",
      "CMS editorial workflow requires EDITORIAL_REVALIDATION_SECRET.",
    );
  }
} else if (contentSource !== "local") {
  blockers.push({
    id: "RC-CONFIG",
    category: "runtime",
    owner: "WEBTECH",
    title: "Content source configuration",
    code: "CONTENT_SOURCE_INVALID",
    message: `Unsupported CONTENT_SOURCE "${contentSource}".`,
  });
}

const analyticsMode = process.env.ANALYTICS_MODE?.trim() || "disabled";

if (analyticsMode === "consent") {
  if (!process.env.ANALYTICS_WEBHOOK_URL?.trim()) {
    addBlocker(
      "RC-ANALYTICS-001",
      "ANALYTICS_TRANSPORT_MISSING",
      "ANALYTICS_MODE=consent requires ANALYTICS_WEBHOOK_URL for production measurement.",
    );
  }
} else if (analyticsMode === "disabled") {
  addWarning(
    "ANALYTICS_DISABLED",
    "Analytics is disabled. This is privacy-safe and acceptable if intentional.",
  );
} else {
  blockers.push({
    id: "RC-CONFIG",
    category: "observability",
    owner: "WEBTECH",
    title: "Analytics mode configuration",
    code: "ANALYTICS_MODE_INVALID",
    message: `Unsupported ANALYTICS_MODE "${analyticsMode}".`,
  });
}

const contentFiles = [
  { id: "RC-003", pathname: "src/content/home.ts" },
  { id: "RC-004", pathname: "src/content/cabinet.ts" },
  { id: "RC-005", pathname: "src/content/expertises.ts" },
  { id: "RC-006", pathname: "src/content/actualites.ts" },
  { id: "RC-007", pathname: "src/content/contact.ts" },
];

for (const { id, pathname } of contentFiles) {
  if (await contains(pathname, "À valider")) {
    addBlocker(
      id,
      "PROVISIONAL_CONTENT",
      `${pathname} still contains client-facing “À valider” content.`,
    );
  }
}

if (await contains("src/content/expertises.ts", "-a-valider")) {
  addBlocker(
    "RC-008",
    "PROVISIONAL_EXPERTISE_SLUGS",
    "Expertise URLs still use provisional *-a-valider slugs.",
  );
}

if (await contains("src/content/actualites.ts", "-a-valider")) {
  addBlocker(
    "RC-009",
    "PROVISIONAL_ARTICLE_SLUGS",
    "Local article fixtures still use provisional *-a-valider slugs.",
  );
}

if (
  await contains(
    "src/design-system/tokens.css",
    "official navy and cyan values are intentionally not declared",
  )
) {
  addBlocker(
    "RC-010",
    "BRAND_TOKENS_PENDING",
    "Official MAPIAP brand color tokens have not yet been integrated.",
  );
}

if (
  await contains(
    "src/components/domain/person-profile.tsx",
    "Portrait professionnel à intégrer",
  )
) {
  addBlocker(
    "RC-011",
    "PORTRAIT_PENDING",
    "The public profile still uses the portrait placeholder.",
  );
}

const legalFiles = [
  {
    id: "RC-012",
    pathname: "src/app/(website)/mentions-legales/page.tsx",
  },
  {
    id: "RC-013",
    pathname: "src/app/(website)/politique-de-confidentialite/page.tsx",
  },
];

for (const { id, pathname } of legalFiles) {
  if (await contains(pathname, "à finaliser")) {
    addBlocker(
      id,
      "LEGAL_CONTENT_PENDING",
      `${pathname} is still a legal placeholder.`,
    );
  }
}

const status = blockers.length === 0 ? "LAUNCH_READY" : "BLOCKED";
const report = {
  releaseTarget: registry.releaseTarget,
  status,
  blockerCount: blockers.length,
  warningCount: warnings.length,
  blockers,
  warnings,
};

if (jsonOutput) {
  console.log(JSON.stringify(report, null, 2));
} else {
  console.log("\nMAPIAP production release audit");
  console.log("================================");
  console.log(
    blockers.length === 0
      ? "Status: LAUNCH READY"
      : `Status: BLOCKED (${blockers.length} blocker(s))`,
  );

  if (blockers.length > 0) {
    console.log("\nBlockers:");
    blockers.forEach(
      ({ id, category, owner, code, message }, index) => {
        console.log(
          `${index + 1}. [${id}] [${category}] [${owner}] [${code}] ${message}`,
        );
      },
    );
  }

  if (warnings.length > 0) {
    console.log("\nWarnings:");
    warnings.forEach(({ code, message }, index) => {
      console.log(`${index + 1}. [${code}] ${message}`);
    });
  }

  console.log(
    "\nTechnical qualification remains separate from launch readiness. Resolve every blocker before production publication.",
  );
}

if (strict && blockers.length > 0) {
  process.exitCode = 1;
}
