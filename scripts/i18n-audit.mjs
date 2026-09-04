import { readFileSync } from "node:fs";

/**
 * Checks every locale against the English reference: no missing keys, no keys
 * that do not exist in English, and nothing still sitting at the English text.
 * Values that are legitimately identical in that language are allowlisted.
 */
const DIR = "src/i18n/dictionaries";
const LOCALES = ["ru", "kk", "zh", "ar", "ko", "th"];

const ALLOWED_SAME_AS_EN = new Set([
  "carTypes.Sedan", "carTypes.SUV", "carTypes.Premium", "carTypes.Economy", "carTypes.4WD",
  "drivetrains.FWD", "drivetrains.RWD", "drivetrains.AWD", "drivetrains.4WD",
  "contact.wechatTitle", "card.perDay", "card.trunkUnit",
]);

function load(file) {
  const src = readFileSync(`${DIR}/${file}.ts`, "utf8");
  const body = src
    .replace(/^import[\s\S]*?;\s*$/m, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^\s*\/\/.*$/gm, "");
  const m = body.match(/=\s*(\{[\s\S]*\});\s*(?:\/\/[^\n]*\n)*\s*(?:export|$)/);
  if (!m) throw new Error(`cannot parse ${file}`);
  return eval(`(${m[1].replace(/:\s*DeepPartial<Dictionary>/, "")})`);
}

function flatten(obj, prefix = "", out = {}) {
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (Array.isArray(v)) {
      v.forEach((item, i) =>
        typeof item === "object" ? flatten(item, `${key}[${i}]`, out) : (out[`${key}[${i}]`] = item));
    } else if (v && typeof v === "object") flatten(v, key, out);
    else out[key] = v;
  }
  return out;
}

const en = flatten(load("en"));
const enKeys = Object.keys(en);
let problems = 0;

for (const loc of LOCALES) {
  const flat = flatten(load(loc));
  const missing = enKeys.filter((k) => !(k in flat));
  const untranslated = enKeys.filter(
    (k) => k in flat && flat[k] === en[k] && !ALLOWED_SAME_AS_EN.has(k)
      && !/^explore\.places\[\d\]\.distance$/.test(k),
  );
  const unknown = Object.keys(flat).filter((k) => !(k in en));

  problems += missing.length + untranslated.length + unknown.length;
  console.log(
    `${loc}: ${enKeys.length - missing.length}/${enKeys.length} keys` +
      (missing.length ? `  MISSING: ${missing.join(", ")}` : "") +
      (untranslated.length ? `  SAME-AS-EN: ${untranslated.join(", ")}` : "") +
      (unknown.length ? `  UNKNOWN KEY: ${unknown.join(", ")}` : ""),
  );
}

console.log(problems === 0 ? "\nAll locales complete." : `\n${problems} problem(s) found.`);
process.exit(problems === 0 ? 0 : 1);
