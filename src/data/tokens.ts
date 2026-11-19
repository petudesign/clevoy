// Mirrors @theme in src/styles/global.css – keep both in sync.
// Contrast ratios computed with the WCAG 2.x formula.
export const colors = [
  { group: 'Neutraalit', name: 'ink', hex: '#15171c', use: 'Otsikot ja teksti, logon runko, tummat paneelit', contrast: '17.9:1 valkoisella' },
  { group: 'Neutraalit', name: 'ink-soft', hex: '#3a3e47', use: 'Toissijainen teksti ja linkit', contrast: '10.7:1 valkoisella' },
  { group: 'Neutraalit', name: 'muted', hex: '#6b717d', use: 'Leipäteksti ja metatiedot', contrast: '4.9:1 valkoisella (AA)' },
  { group: 'Neutraalit', name: 'line', hex: '#e3e6eb', use: 'Reunat ja erottimet', contrast: 'Koriste' },
  { group: 'Neutraalit', name: 'canvas', hex: '#f5f6f8', use: 'Sivun tausta', contrast: 'Pohja' },
  { group: 'Luumu', name: 'plum', hex: '#7a4a6e', use: 'Korostettu sana, valitut tilat, CTA:n hover, luumupaneeli', contrast: '6.9:1 valkoisella (AA)' },
  { group: 'Luumu', name: 'plum-light', hex: '#d08cbb', use: 'Luumu tummalla pinnalla: korostettu sana, logon ruutu', contrast: '7.0:1 inkillä (AA)' },
  { group: 'Luumu', name: 'plum-bright', hex: '#b8679f', use: 'Logon valaistu ruutu vaalealla', contrast: '3.8:1, vain grafiikkaan' },
  { group: 'Luumu', name: 'plum-soft', hex: '#f1e8ee', use: 'Ikonilaatat ja luumun vaaleat pinnat', contrast: 'Pohja · plum 5.8:1' },
  { group: 'Lämmin aksentti', name: 'accent', hex: '#e8955f', use: 'Aprikoosi, lämpimän tukivärin perussävy', contrast: 'Ei tekstiin' },
  { group: 'Lämmin aksentti', name: 'accent-soft', hex: '#fcecdf', use: 'Bento-näyttämöt ja UKK:n pallot', contrast: 'Pohja' },
  { group: 'Lämmin aksentti', name: 'accent-ink', hex: '#8a4a22', use: 'Ikonit ja teksti aprikoosin päällä', contrast: '5.9:1 accent-softilla (AA)' },
  { group: 'Tuki', name: 'mist-soft', hex: '#e6ecf6', use: 'Aktiivinen navilinkki, tietorivit ja ikonilaatat', contrast: 'Pohja · ink 15.1:1' },
  { group: 'Tuki', name: 'star', hex: '#e0a33a', use: 'Vain arvostelutähdet', contrast: 'Aina luvun kanssa (4,8)' },
]

export const typeScale = [
  { name: 'Display', spec: '68 / 1.02 · 600 · -0.035em', mobile: '40–56 (14vw)', sample: 'Siivoukset vaivattomasti' },
  { name: 'H2', spec: '48 / 1.05 · 600 · -0.03em', mobile: '34', sample: 'Siivous lähelläsi' },
  { name: 'H3', spec: '19–22 / 1.3 · 600 · -0.01em', mobile: '18', sample: 'Kotisiivous' },
  { name: 'Body L', spec: '16–17 / 1.65 · 400', mobile: '16', sample: 'Vertaa siivousyrityksiä ja näe hinta etukäteen.' },
  { name: 'Body', spec: '15 / 1.6 · 400', mobile: '15', sample: 'Varaa sopiva aika muutamalla klikkauksella.' },
  { name: 'Mono', spec: 'Geist Mono 13–16 · 400–500 · vain hinnat, ajat ja vaiheet', mobile: '13', sample: '128,00 € · Ke 26.11. 14:00' },
]

export const radii = [
  { name: 'Pilleri', value: '999px', use: 'Napit, navbar, chipit' },
  { name: 'Paneeli', value: '2.5rem', use: 'Koko leveyden paneelit (tumma, luumu, footer), mobiilissa 2rem' },
  { name: 'Kortti L', value: '1.75rem', use: 'Bento-ruudut, herokuva' },
  { name: 'Kortti', value: '1.25–1.5rem', use: 'Näyttämöt, dropdown, docsin kortit' },
  { name: 'Ohjain', value: '1rem', use: 'Listarivit, kentät' },
  { name: 'Pieni', value: '0.75rem', use: 'Aikaslotit, ikonilaatat' },
]

export const motion = [
  { name: 'ease-out-strong', value: 'cubic-bezier(0.23, 1, 0.32, 1)', use: 'Kaikki mikä ilmestyy: valikot, paneelit, sisääntulot, CTA:n pallo' },
  { name: 'ease-in-out-strong', value: 'cubic-bezier(0.77, 0, 0.175, 1)', use: 'Ruudulla jo olevan liike: sanan rullaus, värin vaihto, ikkunan kääntö' },
  { name: 'Painallus', value: '160 ms · scale 0.97', use: 'Jokainen nappi ja linkkipilleri :active-tilassa' },
  { name: 'CTA hover', value: '800 ms pallo · 650 ms nuoli, pieni ylitys', use: 'Pallo kasvaa nuolen kohdalta koko napiksi, nuoli kääntyy ↗ → →' },
  { name: 'Valikko auki / kiinni', value: '200 ms / 120 ms', use: 'Kasvaa triggeristään. Sulkeminen on aina avaamista nopeampi' },
  { name: 'Heron sisääntulo', value: '600 ms · 70 ms porrastus', use: 'Kerran, CSS:llä ilman JavaScriptiä' },
  { name: 'Vieritysanimaatio', value: '800–900 ms · 160 ms porrastus · kerran', use: 'Osiot nousevat näkyviin, yksityiskohdat käynnistyvät perässä' },
  { name: 'Aikajana', value: '4,2 s · pysähtyy jokaiseen vaiheeseen', use: 'Kolme vaihetta täyttyvät rauhallisesti yksi kerrallaan' },
  { name: 'Ikkunan kääntö', value: '1,1 s · neljännes vastapäivään', use: 'Footerin sana: ikkuna kääntyy kerran C:ksi' },
  { name: 'Reduced motion', value: 'Vain opacity', use: 'Loopit pysähtyvät, siirtymät muuttuvat häivytyksiksi' },
]
