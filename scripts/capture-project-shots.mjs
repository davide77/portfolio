import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "../public/images/projects");

const targets = [
  { url: "https://nannynow.co.uk", file: "nannynow.jpg" },
  { url: "https://striver.football", file: "striver-football.jpg" },
  { url: "https://cheamsportsfc.com", file: "cheam-sports-fc.jpg" },
];

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

for (const t of targets) {
  const dest = join(outDir, t.file);
  try {
    await page.goto(t.url, { waitUntil: "domcontentloaded", timeout: 60000 });
    await new Promise((r) => setTimeout(r, 2500));
    await page.screenshot({
      path: dest,
      type: "jpeg",
      quality: 88,
    });
    console.log("OK", t.url, "->", dest);
  } catch (err) {
    console.error("FAIL", t.url, err);
    process.exitCode = 1;
  }
}

await browser.close();
