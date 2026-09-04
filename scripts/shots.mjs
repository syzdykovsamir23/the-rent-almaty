import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = "http://localhost:3055";
const OUT = process.argv[2] || "/tmp/shots";
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ timeout: 120000 });

for (const [name, width, locale] of [
  ["mobile-375-ru", 375, "ru"],
  ["mobile-320-kk", 320, "kk"],
  ["desktop-1440-ru", 1440, "ru"],
]) {
  const ctx = await browser.newContext({
    viewport: { width, height: 900 },
    deviceScaleFactor: 2,
    storageState: { cookies: [], origins: [{ origin: BASE, localStorage: [{ name: "therent.locale", value: locale }] }] },
  });
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "domcontentloaded" });
  await page.waitForSelector("footer", { timeout: 30000 });
  await page.waitForLoadState("load").catch(() => {});
  await page.waitForTimeout(2500);

  await page.screenshot({ path: `${OUT}/${name}-full.png`, fullPage: true });

  // The two sections the client called out.
  for (const [label, sel] of [["how", "#conditions"], ["explore", "#delivery"]]) {
    const el = await page.$(sel);
    if (el) {
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(600);
      await el.screenshot({ path: `${OUT}/${name}-${label}.png` });
    }
  }
  await ctx.close();
  console.log("captured", name);
}

await browser.close();
