# Clevoy – uudistuskonsepti

> **Huom:** Tämä ei ole virallinen yhteistyö Clevoy Oy:n kanssa. Kyseessä on itsenäinen rebrand- ja
> uudistusprojekti (portfolio / case study). Clevoy-nimi, palvelukuvaukset, hinnat ja asiakasarviot ovat
> Clevoy Oy:n julkisesta sivustosta [clevoy.io](https://clevoy.io/), ja ne kuuluvat Clevoy Oy:lle.
> Demo on merkitty `noindex`-tunnisteella, jotta se ei näy hakukoneissa oikean sivuston rinnalla.

Konsepti Clevoyn etusivun täydelle uudistukselle: uusi ilme, logo, design system ja kevyempi arkkitehtuuri
nykyisen WordPress-sivun tilalle.

- `/` – etusivu
- `/docs` – brändi, design system, liike, arkkitehtuuri, mittaukset, SEO ja GEO, integraatiot, CMS-siirtymä ja päätösloki
- `/c-kaanto` – prototyyppi: ikkunamerkki kääntyy C:ksi (latausanimaatio)

## Tekniikka

Astro (staattinen build) + React-islandit + Tailwind v4 + Motion. Fontit (Geist) itsehostattuina.

```bash
npm install
npm run dev      # kehityspalvelin
npm run build    # staattinen build kansioon dist/
npm run preview  # buildin esikatselu
```

### Vercel

Import repository → Vercel tunnistaa Astron automaattisesti (build `npm run build`, output `dist`). Muita asetuksia ei tarvita.

## Case study -materiaali

- `src/data/decisions.ts` – päätösloki. Lisää rivi aina kun jotain valitaan tai hylätään.
- `src/data/lighthouse.json` – mittausten mediaanit. Päivitys: aja Lighthouse `lighthouse/`-kansioon ja sitten `node scripts/lighthouse-summary.mjs`.
- `src/data/integrations.ts` – nykyisen WordPress-sivun integraatiot ja siirtosuunnitelma.
- `src/data/tokens.ts` – värit ja typografia (peilaa `src/styles/global.css`:n `@theme`-tokeneita).

## Kuvat

Kuvat ovat [Pexelsistä](https://www.pexels.com/license/) (vapaa kaupalliseen käyttöön, nimeä ei vaadita), ja ne ovat
väliaikaisia, kunnes käytössä on Clevoyn omat kuvat: herokuva 19991832, palveluntarjoajaosio 6195194,
palvelurivit 5591653, 3125905 ja 7746574.
