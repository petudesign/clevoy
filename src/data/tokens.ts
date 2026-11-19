// Mirrors @theme in src/styles/global.css – keep both in sync.
// Contrast ratios computed with the WCAG 2.x formula.
export const colors = [
  { group: 'Neutraalit', name: 'ink', hex: '#15171c', use: 'Teksti, pää-CTA, logon runko', contrast: '17.9:1 valkoisella' },
  { group: 'Neutraalit', name: 'ink-soft', hex: '#3a3e47', use: 'Toissijainen teksti, linkit', contrast: '10.7:1 valkoisella' },
  { group: 'Neutraalit', name: 'muted', hex: '#6b717d', use: 'Leipäteksti, metatiedot', contrast: '4.9:1 valkoisella (AA)' },
  { group: 'Neutraalit', name: 'line', hex: '#e3e6eb', use: 'Reunat ja erottimet', contrast: 'Koriste' },
  { group: 'Neutraalit', name: 'canvas', hex: '#f5f6f8', use: 'Sivun tausta', contrast: 'Pohja' },
  { group: 'Aksentti', name: 'plum', hex: '#7a4a6e', use: 'Korostettu teksti, valitut tilat', contrast: '6.9:1 valkoisella (AA)' },
  { group: 'Aksentti', name: 'plum-bright', hex: '#b8679f', use: 'Logon ruutu, grafiikka (ei pientä tekstiä)', contrast: '3.8:1, grafiikalle riittävä' },
  { group: 'Aksentti', name: 'plum-soft', hex: '#f1e8ee', use: 'Korostuksen taustat', contrast: 'Pohja' },
  { group: 'Lämmin aksentti', name: 'accent (aprikoosi)', hex: '#e8955f', use: 'Varattu lämpimille korostuksille, ei tekstiä', contrast: 'Grafiikka' },
  { group: 'Lämmin aksentti', name: 'accent-soft', hex: '#fcecdf', use: 'Bento-näyttämöt, UKK:n pallot', contrast: 'Pohja' },
  { group: 'Lämmin aksentti', name: 'accent-ink', hex: '#8a4a22', use: 'Ikonit ja teksti aprikoosin päällä', contrast: '5.9:1 accent-softilla (AA)' },
  { group: 'Tuki', name: 'mist', hex: '#c7d4ea', use: 'Kuvatausta, Figman navbarin sininen', contrast: 'Pohja' },
  { group: 'Tuki', name: 'star', hex: '#e0a33a', use: 'Vain arvostelutähdet, merkitysväri', contrast: 'Grafiikka, aina tekstin kanssa' },
  { group: 'Tuki', name: 'mist-soft', hex: '#e6ecf6', use: 'Aktiivinen linkki, ikonien taustat', contrast: 'Pohja' },
]

export const typeScale = [
  { name: 'Display', spec: '68 / 1.02 · 600 · -0.035em', mobile: '40–56 (14vw)', sample: 'Siivoukset vaivattomasti' },
  { name: 'H2', spec: '40 / 1.1 · 600 · -0.03em', mobile: '30', sample: 'Näin Clevoy toimii' },
  { name: 'H3', spec: '20 / 1.3 · 600 · -0.01em', mobile: '18', sample: 'Kotisiivous' },
  { name: 'Body L', spec: '17 / 1.65 · 400', mobile: '16', sample: 'Vertaa siivousyrityksiä ja näe hinta etukäteen.' },
  { name: 'Body', spec: '15 / 1.6 · 400', mobile: '15', sample: 'Varaa sopiva aika muutamalla klikkauksella.' },
  { name: 'Mono', spec: 'Geist Mono 14 · 500 · vain hinnat ja ajat', mobile: '14', sample: '128,00 € · Ke 26.11. 14:00' },
]

export const radii = [
  { name: 'Pilleri', value: '999px', use: 'Napit, navbar, chipit' },
  { name: 'Kortti L', value: '2rem', use: 'Kuvakortit, isot pinnat' },
  { name: 'Kortti', value: '1.5rem', use: 'Dropdown, sisältökortit' },
  { name: 'Ohjain', value: '1rem', use: 'Listarivit, kentät' },
  { name: 'Pieni', value: '0.75rem', use: 'Aikaslotit, ikonilaatat' },
]

export const motion = [
  { name: 'ease-out-strong', value: 'cubic-bezier(0.23, 1, 0.32, 1)', use: 'Kaikki mikä ilmestyy: valikot, paneelit, sisääntulot' },
  { name: 'ease-in-out-strong', value: 'cubic-bezier(0.77, 0, 0.175, 1)', use: 'Ruudulla jo olevan liike: värin vaihto, navbarin CTA' },
  { name: 'Painallus', value: '160 ms · scale 0.97–0.985', use: 'Jokainen nappi :active-tilassa' },
  { name: 'Valikko auki / kiinni', value: '200 ms / 120 ms', use: 'Sulkeminen on aina avaamista nopeampi' },
  { name: 'Sisääntulo', value: '600 ms · 70 ms porrastus', use: 'Herossa kerran, CSS:llä ilman JavaScriptiä' },
  { name: 'Vieritysanimaatio', value: '600–700 ms · 90 ms porrastus · kerran', use: 'Osiot nousevat näkyviin, yksityiskohdat käynnistyvät perässä' },
  { name: 'Reduced motion', value: 'Vain opacity', use: 'Loopit pysähtyvät, siirtymät muuttuvat häivytyksiksi' },
]
