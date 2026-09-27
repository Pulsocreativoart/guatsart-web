import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const baseUrl = process.env.PREVIEW_URL ?? "http://127.0.0.1:3000";
const output = path.resolve("output", "previews");
const targets = [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "tablet", width: 834, height: 1112 },
  { name: "mobile", width: 390, height: 844 },
];

await mkdir(output, { recursive: true });
const browser = await chromium.launch();

for (const target of targets) {
  const context = await browser.newContext({
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
    viewport: { height: target.height, width: target.width },
  });
  const page = await context.newPage();
  await page.goto(baseUrl, { waitUntil: "networkidle" });

  const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < pageHeight; y += Math.floor(target.height * 0.8)) {
    await page.evaluate((nextY) => window.scrollTo(0, nextY), y);
    await page.waitForTimeout(80);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(100);

  await page.screenshot({
    fullPage: true,
    path: path.join(output, `${target.name}-full.png`),
  });
  await page.screenshot({
    path: path.join(output, `${target.name}-hero.png`),
  });

  await page.locator("#obra").scrollIntoViewIfNeeded();
  await page.waitForTimeout(100);
  await page.screenshot({
    path: path.join(output, `${target.name}-artwork.png`),
  });
  await context.close();
}

await browser.close();
console.log(`Previews written to ${output}`);
