import type { Dictionary } from "@/i18n/dictionary";

/**
 * Placeholder photography comes from Wikimedia Commons. Most of it is CC BY-SA,
 * which requires naming the author and the licence — that is what /credits is
 * for. Author names, licences and source links are never translated; the two
 * descriptive fields are looked up in the dictionary.
 */
export type PhotoCredit = {
  slot: keyof Dictionary["credits"]["slots"];
  note: keyof Dictionary["credits"]["notes"];
  title: string;
  author: string;
  license: string;
  licenseUrl: string;
  source: string;
};

export const PHOTO_CREDITS: PhotoCredit[] = [
  {
    slot: "hero",
    note: "crop169",
    title: "Плато Ассы",
    author: "Мирсаитов Ислам",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    source:
      "https://commons.wikimedia.org/wiki/File:%D0%9F%D0%BB%D0%B0%D1%82%D0%BE_%D0%90%D1%81%D1%81%D1%8B.jpg",
  },
  {
    slot: "car",
    note: "car",
    title: "Haval Jolion 1st gen in Moscow 2024 front",
    author: "Nord794ub",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    source: "https://commons.wikimedia.org/wiki/File:Haval_Jolion_1st_gen_in_Moscow_2024_front.jpg",
  },
  {
    slot: "lake",
    note: "crop32",
    title: "Big Almaty Lake from pass",
    author: "BitLord~ruwiki",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    source: "https://commons.wikimedia.org/wiki/File:Big_Almaty_Lake_from_pass.jpg",
  },
  {
    slot: "charyn",
    note: "crop32",
    title: "Charyn Canyon 18",
    author: "Adam Harangozó",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    source: "https://commons.wikimedia.org/wiki/File:Charyn_Canyon_18.jpg",
  },
  {
    slot: "kolsai",
    note: "crop32",
    title: "Kolsai lake",
    author: "Katariyakartikey",
    license: "CC0 1.0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    source: "https://commons.wikimedia.org/wiki/File:Kolsai_lake.jpg",
  },
  {
    slot: "altyn",
    note: "crop32",
    title:
      "Chalk Mountains. Aktau Mountains. Altyn-Emel National Park. Kazakhstan, April 2025 01",
    author: "Astrobond",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    source:
      "https://commons.wikimedia.org/wiki/File:Chalk_Mountains._Aktau_Mountains._Altyn-Emel_National_Park._Kazakhstan,_April_2025_01.jpg",
  },
  {
    slot: "airport",
    note: "crop169",
    title: "ALMATY AIRPORT - panoramio",
    author: "Kayhan ERTUGRUL",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    source: "https://commons.wikimedia.org/wiki/File:ALMATY_AIRPORT_-_panoramio.jpg",
  },
];
