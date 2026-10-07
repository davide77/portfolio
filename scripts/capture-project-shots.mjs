import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "../public/images/projects");

/**
 * Screenshots are how the site shows project work: no page links out to a live
 * client site, so these captures are the evidence. See the note at the top of
 * src/constants/content/projects.ts.
 *
 * Each target produces two files:
 *   `file`     - a 1440x820 above-the-fold clip, used as the case-study hero.
 *   `fullFile` - the whole page at 1440 wide, used by the WorkBento tile, which
 *                scrolls the image on hover and so needs the full length.
 *
 * Only sites I built and can still vouch for belong here. Do not add a target
 * for a finished engagement whose site has since moved on: the capture would
 * show someone else's current work.
 */
const targets = [
  {
    url: "https://nannynow.co.uk",
    file: "nannynow.jpg",
    fullFile: "nannynow-full.jpg",
  },
  {
    url: "https://striver.football",
    file: "striver-football.jpg",
    fullFile: "striver-football-full.jpg",
  },
  {
    url: "https://cheamsportsfc.com",
    file: "cheam-sports-fc.jpg",
    fullFile: "cheam-sports-fc-full.jpg",
  },
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

/** Scroll the whole page so lazy images and scroll-triggered reveals fire. */
async function scrollThrough() {
  await page.evaluate(async () => {
    const step = window.innerHeight;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 350));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(800);
}

for (const t of targets) {
  const dest = join(outDir, t.file);
  const fullDest = join(outDir, t.fullFile);
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

    await scrollThrough();
    await waitForImages();
    await page.screenshot({
      path: fullDest,
      type: "jpeg",
      quality: 82,
      fullPage: true,
    });
    console.log("OK", t.url, "->", fullDest);
  } catch (err) {
    console.error("FAIL", t.url, err);
    process.exitCode = 1;
  }
}

await browser.close();
