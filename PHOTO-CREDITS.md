# Photo credits

The hero image is the client's own. Everything below is still in `public/images/`
and is used under a free licence that **requires attribution**.

The attribution visitors see is a single line at the bottom of the site footer,
rendered from `src/lib/photoCredits.ts`. This file is the long form: it records
the exact title, author, licence and source of each photo.

## Big Almaty Lake card

- **Big Almaty Lake from pass**
- Author: BitLord~ruwiki
- Licence: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
- Source: https://commons.wikimedia.org/wiki/File:Big_Almaty_Lake_from_pass.jpg

## Charyn Canyon card

- **Charyn Canyon 18**
- Author: Adam Harangozó
- Licence: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
- Source: https://commons.wikimedia.org/wiki/File:Charyn_Canyon_18.jpg

## Kolsai Lakes card

- **Kolsai lake**
- Author: Katariyakartikey
- Licence: [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/)
- Source: https://commons.wikimedia.org/wiki/File:Kolsai_lake.jpg

## Altyn Emel card

- **Chalk Mountains. Aktau Mountains. Altyn-Emel National Park. Kazakhstan, April 2025 01**
- Author: Astrobond
- Licence: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
- Source: https://commons.wikimedia.org/wiki/File:Chalk_Mountains._Aktau_Mountains._Altyn-Emel_National_Park._Kazakhstan,_April_2025_01.jpg

## Airport delivery card

- **ALMATY AIRPORT - panoramio**
- Author: Kayhan ERTUGRUL
- Licence: [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)
- Source: https://commons.wikimedia.org/wiki/File:ALMATY_AIRPORT_-_panoramio.jpg

---

## Replacing a photo

When one of these is swapped for a photo the company owns, delete its entry from
`src/lib/photoCredits.ts` — that removes the name from the footer line — and
delete the matching section above. When all five are replaced, delete this file
and the `photoCredit` key from the seven dictionaries.
