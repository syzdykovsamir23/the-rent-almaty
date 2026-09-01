/**
 * The five landscape photos still come from Wikimedia Commons. Four are
 * CC BY-SA, which requires naming the author and the licence wherever the
 * work is used — that is what the footer line renders. Each author links to
 * the source file page, where the exact licence for that photo is stated.
 *
 * Replacing a photo with the company's own means deleting its entry here.
 */
export type PhotoCredit = {
  author: string;
  source: string;
};

export const PHOTO_CREDITS: PhotoCredit[] = [
  {
    author: "BitLord~ruwiki",
    source: "https://commons.wikimedia.org/wiki/File:Big_Almaty_Lake_from_pass.jpg",
  },
  {
    author: "Adam Harangozó",
    source: "https://commons.wikimedia.org/wiki/File:Charyn_Canyon_18.jpg",
  },
  {
    author: "Katariyakartikey",
    source: "https://commons.wikimedia.org/wiki/File:Kolsai_lake.jpg",
  },
  {
    author: "Astrobond",
    source:
      "https://commons.wikimedia.org/wiki/File:Chalk_Mountains._Aktau_Mountains._Altyn-Emel_National_Park._Kazakhstan,_April_2025_01.jpg",
  },
  {
    author: "Kayhan ERTUGRUL",
    source: "https://commons.wikimedia.org/wiki/File:ALMATY_AIRPORT_-_panoramio.jpg",
  },
];

export const LICENSE_LABEL = "CC BY-SA / CC0";
export const LICENSE_URL = "https://creativecommons.org/licenses/by-sa/4.0/";
export const SOURCE_LABEL = "Wikimedia Commons";
