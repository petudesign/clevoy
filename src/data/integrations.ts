/**
 * What the current clevoy.io runs on, found 2026-11-18 from public HTML of 8 pages
 * and the public WP REST API namespace list. Admin-only plugins may be missing.
 */
export type Effort = 'Valmis' | 'Helppo' | 'Keskitaso' | 'Poistuu'

export const integrations: { name: string; does: string; found: string; plan: string; effort: Effort }[] = [
  { name: 'Brevo (Sendinblue)', does: 'Uutiskirjeen tilauslomakkeet, 10 % alennus', found: 'mailin-lisäosa, sibforms.com-lomake usealla sivulla', plan: 'Lomake lähettää jo suoraan Brevolle, joten sama upotus toimii staattisella sivulla. Ulkoasu tehdään omilla komponenteilla.', effort: 'Helppo' },
  { name: 'Elementor Pro -lomake', does: 'Yhteydenottolomake (Yhteystiedot)', found: 'elementor-form, FluentSMTP lähettää sähköpostit', plan: 'Korvataan omalla lomakkeella, joka lähettää Cloudflare- tai Netlify-funktion kautta, tai Brevon transaktioviestillä. Vaatii pienen palvelinfunktion.', effort: 'Keskitaso' },
  { name: 'Elementor Pro -popup', does: 'Ponnahdusikkuna kaikilla sivuilla', found: 'data-elementor-type="popup" 8/8 sivulla', plan: 'Toteutetaan yhtenä komponenttina design systemillä. Avautuu triggeristään ja kunnioittaa reduced motionia.', effort: 'Helppo' },
  { name: 'CookieYes', does: 'Evästesuostumus', found: 'cdn-cookieyes.com + cky-rajapinta', plan: 'Sama skripti lisätään sivupohjaan. Tilaus ja asetukset säilyvät CookieYesissä.', effort: 'Valmis' },
  { name: 'Google Tag Manager', does: 'Analytiikka ja mainosseuranta', found: 'googletagmanager.com', plan: 'Sama GTM-säiliö sivupohjaan, joten tagit ja konversiot säilyvät ennallaan.', effort: 'Valmis' },
  { name: 'Xbot-chatbot', does: 'Asiakaspalvelun chat', found: 'clevoy.xbot.fi/embed.js', plan: 'Sama upotusskripti. Ladataan vasta sivun latauduttua, ettei se hidasta ensimmäistä näkymää.', effort: 'Valmis' },
  { name: 'Trustmary', does: 'Asiakasarviot', found: 'widget.trustmary.com', plan: 'Widget toimii sellaisenaan. Vaihtoehtona arviot haetaan buildissa ja näytetään omalla tyylillä.', effort: 'Helppo' },
  { name: 'The SEO Framework', does: 'SEO-otsikot, kuvaukset, sitemap', found: 'tsf-api/v2', plan: 'Otsikot ja kuvaukset luetaan WP:n rajapinnasta tai siirretään sisällön mukaan. Sitemap tulee @astrojs/sitemapista.', effort: 'Helppo' },
  { name: 'Redirection', does: 'Uudelleenohjaukset', found: 'redirection/v1', plan: 'Säännöt viedään CSV:nä ja muunnetaan hostingin _redirects-tiedostoksi. Tärkeä hakusijoitusten kannalta.', effort: 'Helppo' },
  { name: 'Post Views Counter', does: 'Artikkelien katselukerrat', found: 'post-views-counter', plan: 'Sama tieto saadaan jo GTM/GA:sta. Jos lukua näytetään sivulla, haetaan se buildissa.', effort: 'Helppo' },
  { name: 'LiteSpeed Cache', does: 'Välimuisti', found: 'litespeed-cache, x-litespeed-cache: hit', plan: 'Ei tarvita: staattiset tiedostot ovat jo valmiita ja CDN välimuistittaa ne.', effort: 'Poistuu' },
  { name: 'Elementor AI, MCP Composer, Instant Images', does: 'Muokkaustyökalut adminissa', found: 'REST-nimiavaruudet', plan: 'Liittyvät sivurakentajaan ja kuvapankkiin. Kuvat optimoidaan jatkossa buildissa automaattisesti.', effort: 'Poistuu' },
]
