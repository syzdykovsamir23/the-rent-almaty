import { chromium } from "playwright";

const BASE = "http://localhost:3055";
const PAGES = ["/", "/cars"];
const WIDTHS = [320, 360, 375, 390, 414, 480, 640, 768, 834, 1024, 1280, 1440, 1920];
const LOCALES = ["en", "ru", "kk", "zh", "ar", "ko", "th"];

/**
 * Reports only what a visitor would actually see go wrong:
 *   - the page scrolling sideways
 *   - text that is truncated or cut off by its own box
 *   - an element sticking out of the viewport once ancestor clipping is applied
 *
 * A deliberately zoomed photo overflows its crop box by design, so overflow is
 * only a finding when the box itself holds the text.
 */
const PROBE = () => {
  const vw = window.innerWidth;

  const scrollableAncestor = (el) => {
    for (let p = el.parentElement; p; p = p.parentElement) {
      const ox = getComputedStyle(p).overflowX;
      if (ox === "auto" || ox === "scroll") return true;
    }
    return false;
  };

  /** The rect actually painted, after every clipping ancestor has had its say. */
  const visibleRect = (el) => {
    let r = el.getBoundingClientRect();
    let box = { l: r.left, t: r.top, r: r.right, b: r.bottom };
    for (let p = el.parentElement; p; p = p.parentElement) {
      const cs = getComputedStyle(p);
      const clipsX = cs.overflowX === "hidden" || cs.overflowX === "clip" || cs.overflowX === "auto" || cs.overflowX === "scroll";
      const clipsY = cs.overflowY === "hidden" || cs.overflowY === "clip" || cs.overflowY === "auto" || cs.overflowY === "scroll";
      if (!clipsX && !clipsY) continue;
      const pr = p.getBoundingClientRect();
      if (clipsX) { box.l = Math.max(box.l, pr.left); box.r = Math.min(box.r, pr.right); }
      if (clipsY) { box.t = Math.max(box.t, pr.top); box.b = Math.min(box.b, pr.bottom); }
    }
    return box;
  };

  /** Text sitting directly in this element, ignoring nested elements. */
  const ownText = (el) =>
    Array.from(el.childNodes)
      .filter((n) => n.nodeType === 3)
      .map((n) => n.textContent.trim())
      .join(" ")
      .trim();

  const label = (el) =>
    el.tagName.toLowerCase() +
    (el.id ? "#" + el.id : "") +
    "." + (el.className || "").toString().trim().split(/\s+/).slice(0, 3).join(".");

  const clipped = [], escaping = [];
  for (const el of document.querySelectorAll("body *")) {
    const cs = getComputedStyle(el);
    if (cs.display === "none" || cs.visibility === "hidden") continue;
    const r = el.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) continue;

    const text = ownText(el);

    if (cs.textOverflow === "ellipsis" && el.scrollWidth > el.clientWidth + 1) {
      clipped.push({ el: label(el), cut: el.scrollWidth - el.clientWidth, t: text.slice(0, 34) });
    }
    // Only boxes that carry their own text can cut text off.
    if (text && (cs.overflowY === "hidden" || cs.overflowY === "clip") && el.scrollHeight > el.clientHeight + 2) {
      clipped.push({ el: label(el), cutY: el.scrollHeight - el.clientHeight, t: text.slice(0, 34) });
    }

    if (!scrollableAncestor(el)) {
      const v = visibleRect(el);
      // Ignore boxes an ancestor has already clipped away entirely.
      if (v.r - v.l > 1 && v.b - v.t > 1 && (v.r > vw + 1 || v.l < -1)) {
        escaping.push({ el: label(el), l: Math.round(v.l), r: Math.round(v.r) });
      }
    }
  }
  return {
    pageOverflow: document.documentElement.scrollWidth - vw,
    clipped: clipped.slice(0, 5),
    escaping: escaping.slice(0, 5),
  };
};

// A cold headless shell on a busy machine needs longer than the 30s default.
const browser = await chromium.launch({ timeout: 120000 });
let problems = 0, checks = 0;

for (const path of PAGES) {
  for (const width of WIDTHS) {
    const ctx = await browser.newContext({
      viewport: { width, height: 900 },
      deviceScaleFactor: 2,
      // Storage seeded before first paint so the language modal never shows.
      storageState: { cookies: [], origins: [{ origin: BASE, localStorage: [{ name: "therent.locale", value: "en" }] }] },
    });
    const page = await ctx.newPage();
    // Not networkidle: the dev server keeps an HMR socket open, so the network
    // never goes quiet and the wait times out.
    await page.goto(BASE + path, { waitUntil: "domcontentloaded" });
    await page.waitForSelector("footer", { timeout: 30000 });
    await page.waitForTimeout(400);

    for (const locale of LOCALES) {
      await page.evaluate((l) => {
        localStorage.setItem("therent.locale", l);
        window.dispatchEvent(new StorageEvent("storage", { key: "therent.locale" }));
      }, locale);
      await page.waitForTimeout(220);
      const res = await page.evaluate(PROBE);
      checks++;
      const bad = res.pageOverflow > 1 || res.clipped.length || res.escaping.length;
      if (bad) {
        problems++;
        console.log(`\n✗ ${path} @ ${width}px [${locale}]  overflow=${res.pageOverflow}`);
        res.clipped.forEach((c) => console.log(`    CLIPPED ${c.el} ${c.cut ? "cutX=" + c.cut : "cutY=" + c.cutY} "${c.t}"`));
        res.escaping.forEach((e) => console.log(`    ESCAPES ${e.el} [${e.l}..${e.r}]`));
      }
    }
    await ctx.close();
  }
}

await browser.close();
console.log(`\n${checks} checks, ${problems} with findings.`);
