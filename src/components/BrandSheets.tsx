import { Logo, marks, WindowMark, type LogoVariant } from './Logo'

/* Rendered statically by Astro (no client directive) – zero JS on /docs. */

const colorways = [
  { name: 'Nykyinen', note: 'Tumma luumu. 16 px:ssä se näyttää harmaalta, koska se on lähes yhtä tumma kuin runko.', frame: '#15171c', pane: '#7a4a6e', text: '#15171c' },
  { name: 'Kirkas luumu', note: 'Sama sävy vaaleampana ja kylläisempänä. Erottuu rungosta, ja väri jatkuu CTA:ssa ja toastissa.', frame: '#15171c', pane: '#b8679f', text: '#15171c', chosen: true },
  { name: 'Ikkunan valo', note: 'Lämmin auringonvalo ruudussa. Tarina on selkein, mutta brändiin tulisi toinen aksenttiväri.', frame: '#15171c', pane: '#f0b44c', text: '#15171c' },
  { name: 'Taivas', note: 'Figman navbarin sininen: ikkunasta näkyy taivas. Rauhallisin vaihtoehto.', frame: '#15171c', pane: '#8fb3e8', text: '#15171c' },
  { name: 'Luumurunko', note: 'Koko merkki luumuna ja ruutu vaalean roosana. Teksti pysyy tummana.', frame: '#7a4a6e', pane: '#ecc6dc', text: '#15171c' },
  { name: 'Luumuteksti', note: 'Nimi luumuna. Lämpimin, mutta nimi menettää terävyyttään pienissä koissa.', frame: '#15171c', pane: '#b8679f', text: '#7a4a6e' },
]

function Lockup({ size, frame, pane, text }: { size: number; frame: string; pane: string; text: string }) {
  return (
    <span className="inline-flex items-center gap-[0.3em] leading-none" style={{ fontSize: size }}>
      <span className="inline-flex -translate-y-[0.11em]">
        <WindowMark size={size} ink={frame} accent={pane} />
      </span>
      <span className="font-semibold tracking-[-0.04em]" style={{ color: text }}>
        Clevoy
      </span>
    </span>
  )
}

export function LogoColorways() {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {colorways.map((c) => (
        <div
          key={c.name}
          className={`relative flex flex-col gap-6 rounded-[1.5rem] border bg-white p-6 ${
            c.chosen ? 'border-plum shadow-[0_0_0_3px_rgba(122,74,110,0.1)]' : 'border-line'
          }`}
        >
          {c.chosen && (
            <span className="absolute top-4 right-4 rounded-full bg-plum px-2.5 py-1 text-[11px] font-medium text-white">
              Valittu
            </span>
          )}
          <div className="flex flex-wrap items-end justify-between gap-4">
            <Lockup size={36} {...c} />
            <span className="flex items-center gap-3">
              <span className="rounded-full bg-canvas px-3 py-2">
                <Lockup size={17} {...c} />
              </span>
              <WindowMark size={16} ink={c.frame} accent={c.pane} />
            </span>
          </div>
          <div>
            <p className="text-[14px] font-semibold text-ink">{c.name}</p>
            <p className="mt-0.5 text-[13px] leading-relaxed text-muted">{c.note}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

const directions: { id: LogoVariant; name: string; kind: string; idea: string; verdict: string; status: 'valittu' | 'varalla' | 'hylätty' }[] = [
  { id: 'ikkuna', name: 'Ikkuna', kind: 'Kuvamerkki', idea: 'Kaari-ikkuna: koti ja juuri pesty ikkuna. Valaistu ruutu on kuin varattu aika kalenterissa.', verdict: 'Selkeä 16 px:ssä', status: 'valittu' },
  { id: 'pyyhkaisy', name: 'Pyyhkäisy', kind: 'Kirjainmerkki', idea: 'C yhtenä leveänä vetona kuin ikkunalastan jälki, aukossa puhdas viiru.', verdict: 'Selkeä 16 px:ssä', status: 'varalla' },
  { id: 'aika', name: 'Aika', kind: 'Sanamerkki', idea: 'Pelkkä nimi. O on varattu aikaslotti, rengas joka toistuu sovelluksessa.', verdict: 'Selkeä 16 px:ssä', status: 'varalla' },
  { id: 'ovi', name: 'Ovi', kind: 'Kuvamerkki', idea: 'Raollaan oleva ovi ja valo sen takana: luotettu tekijä pääsee sisään.', verdict: 'Luumu katoaa 16 px:ssä', status: 'hylätty' },
  { id: 'kupla', name: 'Kupla', kind: 'Kuvamerkki', idea: 'Saippuakupla yhdellä heijastuksella. Pehmein suunnista.', verdict: 'Heijastus häviää 16 px:ssä', status: 'hylätty' },
  { id: 'raidat', name: 'Raidat', kind: 'Kuva + kirjain', idea: 'Imuroidun lattian raidat pinottuna C:n siluetiksi.', verdict: 'Näyttää hampurilaisvalikolta', status: 'hylätty' },
]

const statusStyle = {
  valittu: 'bg-plum text-white',
  varalla: 'bg-mist-soft text-ink',
  hylätty: 'bg-canvas text-muted',
}

export function LogoDirections() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {directions.map((d, i) => {
        const M = marks[d.id]
        return (
          <article key={d.id} className="flex flex-col overflow-hidden rounded-[1.5rem] border border-line bg-white">
            <div className="flex items-center justify-between gap-4 p-6 pb-8">
              <Logo variant={d.id} size={26} />
              <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium capitalize ${statusStyle[d.status]}`}>
                {d.status}
              </span>
            </div>
            <div className="flex items-center gap-4 border-y border-line bg-canvas px-6 py-4">
              <span className="grid size-11 place-items-center rounded-[12px] bg-white shadow-[0_0_0_1px_var(--color-line)]">
                <M size={24} />
              </span>
              <M size={16} />
              <span className="ml-auto grid size-11 place-items-center rounded-[12px] bg-ink">
                <M size={22} ink="#f5f6f8" accent="#d08cbb" />
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-1 p-6">
              <p className="flex items-baseline gap-2 text-[14px] font-semibold text-ink">
                <span className="font-mono text-[11px] text-muted">0{i + 1}</span>
                {d.name}
                <span className="text-[12px] font-normal text-muted">{d.kind}</span>
              </p>
              <p className="text-[13px] leading-relaxed text-muted">{d.idea}</p>
              <p className="mt-auto pt-3 font-mono text-[11px] text-ink-soft">16 px: {d.verdict}</p>
            </div>
          </article>
        )
      })}
    </div>
  )
}
