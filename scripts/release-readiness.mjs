import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const strict = process.argv.includes("--strict");
const root = process.cwd();

const blockers = [];
const warnings = [];

function addBlocker(code, message) {
  blockers.push({ code, message });
}

function addWarning(code, message) {
  warnings.push({ code, message });
}

async function readRepositoryFile(pathname) {
  return readFile(resolve(root, pathname), "utf8");
}

async function contains(pathname, value) {
  const content = await readRepositoryFile(pathname);

  return content.includes(value);
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

if (!siteUrl) {
  addBlocker(
    "DOMAIN_NOT_CONFIGURED",
    "NEXT_PUBLIC_SITE_URL is missing; canonical URLs, robots and sitemap cannot be activated for production.",
  );
} else {
  try {
    const parsedUrl = new URL(siteUrl);

    if (parsedUrl.protocol !== "https:") {
      addBlocker(
        "DOMAIN_NOT_HTTPS",
        "NEXT_PUBLIC_SITE_URL must use HTTPS for production release.",
      );
    }
  } catch {
    addBlocker(
      "DOMAIN_INVALID",
      "NEXT_PUBLIC_SITE_URL is not a valid absolute URL.",
    );
  }
}

if (!process.env.CONTACT_WEBHOOK_URL?.trim()) {
  addBlocker(
    "CONTACT_TRANSPORT_MISSING",
    "CONTACT_WEBHOOK_URL is missing; the public contact form cannot deliver messages.",
  );
}

const contentSource = process.env.CONTENT_SOURCE?.trim() || "local";

if (contentSource === "cms") {
  if (!process.env.CMS_CONTENT_API_URL?.trim()) {
    addBlocker(
      "CMS_ENDPOINT_MISSING",
      "CONTENT_SOURCE=cms requires CMS_CONTENT_API_URL.",
    );
  }

  if (!process.env.EDITORIAL_PREVIEW_SECRET?.trim()) {
    addBlocker(
      "PREVIEW_SECRET_MISSING",
      "CMS editorial workflow requires EDITORIAL_PREVIEW_SECRET.",
    );
  }

  if (!process.env.EDITORIAL_REVALIDATION_SECRET?.trim()) {
    addBlocker(
      "REVALIDATION_SECRET_MISSING",
      "CMS editorial workflow requires EDITORIAL_REVALIDATION_SECRET.",
    );
  }
} else if (contentSource !== "local") {
  addBlocker(
    "CONTENT_SOURCE_INVALID",
    `Unsupported CONTENT_SOURCE "${contentSource}".`,
  );
}

const analyticsMode = process.env.ANALYTICS_MODE?.trim() || "disabled";

if (analyticsMode === "consent") {
  if (!process.env.ANALYTICS_WEBHOOK_URL?.trim()) {
    addBlocker(
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
  addBlocker(
    "ANALYTICS_MODE_INVALID",
    `Unsupported ANALYTICS_MODE "${analyticsMode}".`,
  );
}

const contentFiles = [
  "src/content/home.ts",
  "src/content/cabinet.ts",
  "src/content/expertises.ts",
  "src/content/actualites.ts",
  "src/content/contact.ts",
];

for (const pathname of contentFiles) {
  if (await contains(pathname, "À valider")) {
    addBlocker(
      "PROVISIONAL_CONTENT",
      `${pathname} still contains client-facing “À valider” content.`,
    );
  }
}

if (await contains("src/content/expertises.ts", "-a-valider")) {
  addBlocker(
    "PROVISIONAL_EXPERTISE_SLUGS",
    "Expertise URLs still use provisional *-a-valider slugs.",
  );
}

if (await contains("src/content/actualites.ts", "-a-valider")) {
  addBlocker(
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
    "PORTRAIT_PENDING",
    "The public profile still uses the portrait placeholder.",
  );
}

const legalFiles = [
  "src/app/(website)/mentions-legales/page.tsx",
  "src/app/(website)/politique-de-confidentialite/page.tsx",
];

for (const pathname of legalFiles) {
  if (await contains(pathname, "à finaliser")) {
    addBlocker(
      "LEGAL_CONTENT_PENDING",
      `${pathname} is still a legal placeholder.`,
    );
  }
}

console.log("\nMAPIAP production release audit");
console.log("================================");

if (blockers.length === 0) {
  console.log("Status: LAUNCH READY");
} else {
  console.log(`Status: BLOCKED (${blockers.length} blocker(s))`);
}

if (blockers.length > 0) {
  console.log("\nBlockers:");
  blockers.forEach(({ code, message }, index) => {
    console.log(`${index + 1}. [${code}] ${message}`);
  });
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

if (strict && blockers.length > 0) {
  process.exitCode = 1;
}
