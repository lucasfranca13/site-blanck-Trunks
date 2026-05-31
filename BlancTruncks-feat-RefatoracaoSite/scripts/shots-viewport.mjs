import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const OUT = "scripts/shots-vp";

const viewports = [
  { name: "mobile-375", width: 375, height: 812 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "laptop-1024", width: 1024, height: 768 },
  { name: "desktop-1440", width: 1440, height: 900 },
];

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch();

for (const vp of viewports) {
  // HOME — topo (hero)
  let page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
  await page.goto(`${BASE}/`, { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(1600);
  await page.screenshot({ path: `${OUT}/home-hero-${vp.name}.png` });
  await page.close();

  // PRODUTOS — topo (header + filtros) e grade após scroll
  page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
  await page.goto(`${BASE}/produtos`, { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${OUT}/produtos-top-${vp.name}.png` });
  await page.evaluate(() => window.scrollTo(0, 700));
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${OUT}/produtos-grid-${vp.name}.png` });
  await page.close();
}

await browser.close();
console.log("done");
