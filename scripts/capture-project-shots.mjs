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
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  userAgent:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
});
const page = await context.newPage();

async function waitForImages() {
  await page.evaluate(async () => {
    const imgs = Array.from(document.querySelectorAll("img"));
    await Promise.all(
      imgs.map((img) =>
        img.complete
          ? Promise.resolve()
          : new Promise((resolve) => {
              img.addEventListener("load", resolve, { once: true });
              img.addEventListener("error", resolve, { once: true });
            }),
      ),
    );
  });
}

async function dismissCookieBanner() {
  const acceptAll = page.getByRole("button", { name: /accept all/i });
  if (await acceptAll.isVisible({ timeout: 3000 }).catch(() => false)) {
    await acceptAll.click();
    await page.waitForTimeout(600);
  }
}

for (const t of targets) {
  const dest = join(outDir, t.file);
  try {
    await page.goto(t.url, { waitUntil: "networkidle", timeout: 90000 });
    await dismissCookieBanner();
    await waitForImages();
    await page.waitForTimeout(2000);
    await page.screenshot({
      path: dest,
      type: "jpeg",
      quality: 90,
      clip: { x: 0, y: 0, width: 1440, height: 820 },
    });
    console.log("OK", t.url, "->", dest);
  } catch (err) {
    console.error("FAIL", t.url, err);
    process.exitCode = 1;
  }
}

await browser.close();
