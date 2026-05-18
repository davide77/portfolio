import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "../public/images/projects/estee-lauder-emea");

/** ELC UK storefronts referenced in the EMEA case study. */
const brands = [
  { url: "https://www.esteelauder.co.uk", file: "estee-lauder-uk.jpg", label: "Estée Lauder UK" },
  { url: "https://www.jomalone.co.uk", file: "jo-malone-london.jpg", label: "Jo Malone London" },
  { url: "https://www.cremedelamer.co.uk", file: "la-mer.jpg", label: "La Mer" },
  { url: "https://www.clinique.co.uk", file: "clinique.jpg", label: "Clinique" },
  { url: "https://www.maccosmetics.co.uk", file: "mac.jpg", label: "MAC Cosmetics" },
  { url: "https://www.tomfordbeauty.co.uk", file: "tom-ford-beauty.jpg", label: "Tom Ford Beauty" },
  { url: "https://www.origins.co.uk", file: "origins.jpg", label: "Origins" },
  { url: "https://www.bobbibrown.co.uk", file: "bobbi-brown.jpg", label: "Bobbi Brown" },
];

async function dismissCookieBanners(page) {
  const selectors = [
    "#onetrust-accept-btn-handler",
    'button:has-text("Accept All")',
    'button:has-text("Accept all")',
    'button:has-text("Accept")',
    'button:has-text("I agree")',
    'button:has-text("Agree")',
    '[data-testid="cookie-accept"]',
  ];

  for (const selector of selectors) {
    try {
      const btn = page.locator(selector).first();
      if (await btn.isVisible({ timeout: 1500 })) {
        await btn.click({ timeout: 3000 });
        await page.waitForTimeout(800);
        return;
      }
    } catch {
      // try next selector
    }
  }
}

await mkdir(outDir, { recursive: true });

const launchOptions = {
  headless: false,
  args: ["--disable-blink-features=AutomationControlled"],
};

/** Prefer system Chrome; Akamai often blocks headless Chromium. */
try {
  launchOptions.channel = "chrome";
} catch {
  // fall back to bundled Chromium
}

const browser = await chromium.launch(launchOptions);
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  locale: "en-GB",
  timezoneId: "Europe/London",
  userAgent:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  extraHTTPHeaders: {
    "Accept-Language": "en-GB,en;q=0.9",
  },
});

await context.addInitScript(() => {
  Object.defineProperty(navigator, "webdriver", { get: () => undefined });
});

const page = await context.newPage();

let failed = 0;

for (const brand of brands) {
  const dest = join(outDir, brand.file);
  try {
    await page.goto(brand.url, { waitUntil: "load", timeout: 90000 });
    await page.waitForTimeout(3500);
    await dismissCookieBanners(page);
    await page.waitForTimeout(2000);

    const title = await page.title();
    if (/access denied/i.test(title) || (await page.locator("text=Access Denied").count()) > 0) {
      throw new Error("Akamai blocked this request (Access Denied)");
    }
    await page.screenshot({
      path: dest,
      type: "jpeg",
      quality: 88,
      fullPage: false,
    });
    console.log("OK", brand.label, brand.url, "->", dest);
  } catch (err) {
    failed += 1;
    console.error("FAIL", brand.label, brand.url, err.message ?? err);
  }
}

await browser.close();
process.exit(failed > 0 ? 1 : 0);
