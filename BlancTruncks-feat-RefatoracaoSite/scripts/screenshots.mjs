import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const OUT = "scripts/shots";

const viewports = [
  { name: "mobile-375", width: 375, height: 812 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "laptop-1024", width: 1024, height: 768 },
  { name: "desktop-1440", width: 1440, height: 900 },
  { name: "ultrawide-1920", width: 1920, height: 1080 },
];

const routes = [
  { name: "home", path: "/" },
  { name: "produtos", path: "/produtos" },
];

await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();
for (const route of routes) {
  for (const vp of viewports) {
    const page = await browser.newPage({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
    });
    await page.goto(`${BASE}${route.path}`, { waitUntil: "load", timeout: 60000 });
    // Dá tempo para reveals/vídeo assentarem.
    await page.waitForTimeout(1800);

    // Checa overflow horizontal real (scrollWidth vs viewport).
    const overflow = await page.evaluate(() => {
      const el = document.documentElement;
      return { scrollW: el.scrollWidth, clientW: el.clientWidth };
    });
    const horiz = overflow.scrollW > overflow.clientW + 1;
    console.log(
      `${route.name} @ ${vp.name}: scrollW=${overflow.scrollW} clientW=${overflow.clientW} ${
        horiz ? "⚠ OVERFLOW-X" : "ok"
      }`,
    );

    await page.screenshot({ path: `${OUT}/${route.name}-${vp.name}.png`, fullPage: true });
    await page.close();
  }
}
await browser.close();
console.log("done");
