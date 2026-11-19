/**
 * Site facts – single source for the services section, the FAQ and the JSON-LD.
 * Every fact has a source; update here, not in components.
 * Slugs mirror clevoy.io's current WordPress pages so URLs stay the same after migration.
 */
export const org = {
  name: 'Clevoy',
  legalName: 'Clevoy Oy',
  url: 'https://clevoy.io',
  app: 'https://app.clevoy.io/',
  sameAs: [
    'https://www.instagram.com/clevoy.io/',
    'https://www.tiktok.com/@clevoy.io',
    'https://apps.apple.com/fi/app/clevoy/id6758142948',
    'https://play.google.com/store/apps/details?id=io.clevoy.app',
  ],
}

// clevoy.io pages (WP REST API, 2026-11-18)
export const serviceCities = [
  {
    service: 'Kotisiivous',
    slug: 'kotisiivous',
    blurb: 'Kertasiivous tai säännöllisesti viikon, kahden tai neljän viikon välein.',
    cities: ['Helsinki', 'Espoo', 'Vantaa', 'Tampere', 'Turku', 'Kuopio', 'Seinäjoki'],
  },
  {
    service: 'Muuttosiivous',
    slug: 'muuttosiivous',
    blurb: 'Loppusiivous ennen muuttoa tai sen jälkeen.',
    cities: ['Helsinki', 'Espoo', 'Vantaa'],
  },
  {
    service: 'Airbnb-siivous',
    slug: 'airbnb-siivous',
    blurb: 'Vaihtosiivous vieraiden välissä.',
    cities: ['Helsinki'],
  },
]
// Only toimistosiivous has its own page on clevoy.io today; the rest are listed without a link
// until they get pages (/yrittajalle/ is for providers, not business customers).
export const businessServices: { name: string; href?: string }[] = [
  { name: 'Toimistosiivous', href: '/toimistosiivous/' },
  { name: 'Toimitilojen siivous' },
  { name: 'Taloyhtiön siivous' },
  { name: 'Rappukäytävän siivous' },
  { name: 'Kuntosalien siivous' },
]

const citySlug = (c: string) =>
  c.toLowerCase().replace(/ä/g, 'a').replace(/ö/g, 'o').replace(/å/g, 'a')
export const cityHref = (serviceSlug: string, city: string) => `/${serviceSlug}-${citySlug(city)}/`

export const allCities = [...new Set(serviceCities.flatMap((s) => s.cities))]

/**
 * FAQ – answers only state verified facts.
 * Prices: clevoy.io/kotisiivous-helsinki + /kotisiivous-tampere meta (Clevoy Cleaning).
 * Tax credit: vero.fi, kotitalousvähennyksen määrä, verovuodet 2026–2027.
 */
export const faq = [
  {
    q: 'Paljonko kotisiivous maksaa?',
    a: 'Esimerkiksi Clevoy Cleaningin kotisiivous Helsingissä ja Tampereella maksaa 55 €/h kertasiivouksena ja alkaen 43 €/h säännöllisenä siivouksena. Hinnat vaihtelevat palveluntarjoajittain, ja näet aina tarkan kokonaishinnan arvonlisäveroineen ennen kuin vahvistat varauksen.',
  },
  {
    q: 'Saako siivouksesta kotitalousvähennyksen?',
    a: 'Kyllä. Vuosina 2026 ja 2027 yritykseltä ostetusta kotitaloustyöstä voi vähentää 40 % työn osuudesta. Vähennys on enintään 2 100 € henkilöä kohden vuodessa, ja omavastuu on 150 €. Vähennys tehdään verotuksessa, ei laskulta.',
  },
  {
    q: 'Missä kaupungeissa Clevoy toimii?',
    a: `Clevoyn kautta voi varata siivouksen esimerkiksi ${'Helsingissä, Espoossa, Vantaalla, Tampereella, Turussa, Kuopiossa ja Seinäjoella'}. Vapaat ajat ja palveluntarjoajat näkyvät, kun annat kohteen osoitteen.`,
  },
  {
    q: 'Mitä siivouspalveluita Clevoysta voi tilata?',
    a: 'Kotitalouksille kotisiivouksen, muuttosiivouksen ja Airbnb-siivouksen. Yrityksille ja taloyhtiöille toimistosiivouksen, toimitilojen siivouksen, taloyhtiön siivouksen, rappukäytävän siivouksen ja kuntosalien siivouksen.',
  },
  {
    q: 'Miten siivous tilataan?',
    a: 'Anna kohteen osoite ja pinta-ala, valitse palvelu ja sopiva aika, ja vahvista varaus. Tilaus onnistuu verkossa osoitteessa app.clevoy.io tai Clevoyn sovelluksessa iOS- ja Android-laitteille.',
  },
  {
    q: 'Voiko siivouksen etenemistä seurata?',
    a: 'Voi. Saat ilmoituksen, kun varaus on vahvistettu ja kun siivooja on matkalla, ja voit viestiä siivoojan kanssa Clevoyn sovelluksessa.',
  },
]
