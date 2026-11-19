import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import {
  ArrowRight,
  Barbell,
  Briefcase,
  Buildings,
  CaretDown,
  House,
  Key,
  List,
  Stairs,
  Storefront,
  Truck,
  X,
  type Icon,
} from '@phosphor-icons/react'
import { Logo } from './Logo'

const EASE_OUT = [0.23, 1, 0.32, 1] as const

type Service = { name: string; desc: string; href: string; icon: Icon }

// Same services as the current clevoy.io dropdown
const serviceGroups: { title: string; items: Service[] }[] = [
  {
    title: 'Kotitaloudet',
    items: [
      { name: 'Kotisiivous', desc: 'Ylläpito- ja perussiivous kotiin', href: '#kotisiivous', icon: House },
      { name: 'Muuttosiivous', desc: 'Ennen muuttoa tai sen jälkeen', href: '#muuttosiivous', icon: Truck },
      { name: 'Airbnb-siivous', desc: 'Vaihtosiivous vieraiden välissä', href: '#airbnb-siivous', icon: Key },
    ],
  },
  {
    title: 'Yritykset ja taloyhtiöt',
    items: [
      { name: 'Toimistosiivous', desc: 'Säännöllinen siivous työtiloihin', href: '#toimistosiivous', icon: Briefcase },
      { name: 'Toimitilojen siivous', desc: 'Liike- ja asiakastilat', href: '#toimitilat', icon: Storefront },
      { name: 'Taloyhtiön siivous', desc: 'Yhteiset tilat kuntoon', href: '#taloyhtio', icon: Buildings },
      { name: 'Rappukäytävän siivous', desc: 'Porraskäytävät ja aulat', href: '#rappukaytava', icon: Stairs },
      { name: 'Kuntosalien siivous', desc: 'Salit, pukuhuoneet ja suihkut', href: '#kuntosalit', icon: Barbell },
    ],
  },
]

const links = [
  { label: 'Liity palveluntarjoajaksi', href: '#palveluntarjoajaksi' },
  { label: 'Blogi', href: '#blogi' },
  { label: 'UKK', href: '#ukk' },
  { label: 'Yhteystiedot', href: '#yhteystiedot' },
]

const linkBase =
  'flex items-center gap-1 rounded-full px-3 py-2 text-[14px] font-medium whitespace-nowrap transition-colors duration-200'
const linkIdle = 'text-ink-soft hover:bg-ink/[0.04] hover:text-ink'
export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const solid = useHeroCtaGone()
  const [mobileOrigin, setMobileOrigin] = useState('100% 0%')
  const reduce = useReducedMotion()
  const navRef = useRef<HTMLElement>(null)
  const menuBtnRef = useRef<HTMLButtonElement>(null)

  // Panel grows out of the hamburger, not its own center
  useLayoutEffect(() => {
    if (!mobileOpen || !navRef.current || !menuBtnRef.current) return
    const nav = navRef.current.getBoundingClientRect()
    const btn = menuBtnRef.current.getBoundingClientRect()
    const panelTop = nav.bottom + 8
    setMobileOrigin(`${btn.left + btn.width / 2 - nav.left}px ${btn.top + btn.height / 2 - panelTop}px`)
  }, [mobileOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMobileOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header className="sticky top-0 z-40 px-4 pt-4 md:px-8 md:pt-6">
      <nav
        ref={navRef}
        // CSS entrance so the server-rendered nav is visible before hydration
        style={{ animationDelay: '0ms' }}
        className="glass reveal relative mx-auto flex max-w-[1240px] items-center justify-between gap-4 rounded-full py-2 pr-2 pl-5"
      >
        <a href="#" aria-label="Clevoy etusivu" className="press flex items-center">
          <Logo variant="ikkuna" size={19} />
        </a>

        <ul className="hidden items-center gap-0.5 lg:flex">
          <li>
            <a href="#" aria-current="page" className={`${linkBase} bg-mist-soft text-ink`}>
              Etusivu
            </a>
          </li>
          <li>
            <ServicesMenu />
          </li>
          {links.map((l) => (
            <li key={l.label}>
              <a href={l.href} className={`${linkBase} ${linkIdle}`}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {/* One dark CTA per view: quiet (light) while the hero CTA is on screen, dark once it
              scrolls away. Same circle-expand button as the page CTAs, small size. */}
          <a
            href="https://app.clevoy.io/"
            data-solid={solid}
            className={`cx cx--sm hidden sm:inline-flex ${solid ? '' : 'cx--light cx--quiet'}`}
          >
            <span className="cx-fill" aria-hidden />
            <span className="cx-label">Tilaa siivous</span>
            <span className="cx-icon" aria-hidden>
              <ArrowRight size={16} weight="bold" className="cx-arrow" />
            </span>
          </a>
          <button
            ref={menuBtnRef}
            type="button"
            aria-label={mobileOpen ? 'Sulje valikko' : 'Avaa valikko'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
            className="press grid size-10 place-items-center rounded-full text-ink hover:bg-ink/[0.05] lg:hidden"
          >
            {mobileOpen ? <X size={20} /> : <List size={20} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.24, ease: EASE_OUT } }}
              exit={{ opacity: 0, scale: reduce ? 1 : 0.95, transition: { duration: 0.14, ease: 'easeIn' } }}
              style={{ transformOrigin: mobileOrigin }}
              className="absolute inset-x-0 top-[calc(100%+8px)] max-h-[calc(100dvh-110px)] overflow-y-auto rounded-[1.75rem] border border-line bg-white p-3 shadow-[0_24px_48px_-20px_rgba(21,23,28,0.25)] lg:hidden"
            >
              <a href="#" className="block rounded-2xl px-3 py-3 text-[15px] font-medium text-ink">
                Etusivu
              </a>
              {serviceGroups.map((g) => (
                <div key={g.title} className="border-t border-line px-3 pt-3 pb-1">
                  <p className="mb-1 text-[12px] font-medium text-muted">{g.title}</p>
                  {g.items.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 rounded-xl py-2 text-[15px] text-ink"
                    >
                      <s.icon size={18} weight="duotone" className="text-ink-soft" />
                      {s.name}
                    </a>
                  ))}
                </div>
              ))}
              <div className="mt-1 border-t border-line pt-1">
                {links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-2xl px-3 py-3 text-[15px] font-medium text-ink"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}

/** True once the page's main CTA (#hero-cta) has left the viewport. Pages without one get the solid nav CTA. */
function useHeroCtaGone() {
  const [gone, setGone] = useState(false)
  useEffect(() => {
    const el = document.getElementById('hero-cta')
    if (!el) return setGone(true)
    const io = new IntersectionObserver(([e]) => setGone(!e.isIntersecting), {
      // treat it as gone a little before it passes under the sticky nav
      rootMargin: '-96px 0px 0px 0px',
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return gone
}

/**
 * Hover opens with a short close delay (so diagonal mouse paths don't snap it shut),
 * click toggles for touch/keyboard, Escape and outside click close.
 */
function ServicesMenu() {
  const [open, setOpen] = useState(false)
  const [origin, setOrigin] = useState('20% 0%')
  const ref = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // Scale out of the trigger button, wherever the panel ends up
  useLayoutEffect(() => {
    if (!open || !btnRef.current || !panelRef.current) return
    // offset* ignores the panel's own initial scale, so the measurement is exact
    const btn = btnRef.current
    const panel = panelRef.current
    const x = btn.offsetLeft + btn.offsetWidth / 2 - panel.offsetLeft
    const y = btn.offsetTop + btn.offsetHeight / 2 - panel.offsetTop
    setOrigin(`${x}px ${y}px`)
  }, [open])
  const closeTimer = useRef<number | undefined>(undefined)
  const reduce = useReducedMotion()

  const hoverOpenedAt = useRef(0)

  const openNow = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return
    window.clearTimeout(closeTimer.current)
    if (!open) hoverOpenedAt.current = performance.now()
    setOpen(true)
  }
  // A click right after hover-open would otherwise toggle it shut again
  const onClick = () => {
    if (open && performance.now() - hoverOpenedAt.current < 400) return
    setOpen((o) => !o)
  }
  const closeSoon = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setOpen(false), 140)
  }

  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', onDown)
    window.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  useEffect(() => () => window.clearTimeout(closeTimer.current), [])

  return (
    <div ref={ref} className="relative" onPointerEnter={openNow} onPointerLeave={closeSoon}>
      <button
        ref={btnRef}
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={onClick}
        className={`${linkBase} ${open ? 'bg-ink/[0.04] text-ink' : linkIdle}`}
      >
        Siivouspalvelut
        <CaretDown
          size={12}
          weight="bold"
          className={`opacity-50 transition-transform duration-200 ease-[var(--ease-out-strong)] ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: EASE_OUT } }}
            exit={{ opacity: 0, scale: reduce ? 1 : 0.98, transition: { duration: 0.12, ease: 'easeIn' } }}
            style={{ transformOrigin: origin }}
            // pt-3 is an invisible hover bridge between trigger and panel
            className="absolute top-full -left-3 pt-3"
          >
            <div className="grid w-[600px] grid-cols-[1fr_1.35fr] gap-2 rounded-[1.5rem] border border-line bg-white p-2 shadow-[0_1px_0_rgba(255,255,255,1)_inset,0_28px_56px_-24px_rgba(21,23,28,0.3)]">
              {serviceGroups.map((g, gi) => (
                <div key={g.title} className={`rounded-2xl p-2 ${gi === 0 ? 'bg-canvas' : ''}`}>
                  <p className="px-2 pt-1 pb-2 text-[12px] font-medium text-muted">{g.title}</p>
                  <ul className={gi === 1 ? 'grid grid-cols-1 gap-0.5' : 'flex flex-col gap-0.5'}>
                    {g.items.map((s) => (
                      <li key={s.name}>
                        <a
                          href={s.href}
                          onClick={() => setOpen(false)}
                          className="group flex items-start gap-3 rounded-xl p-2 transition-colors duration-150 hover:bg-white hover:shadow-[0_0_0_1px_var(--color-line)]"
                        >
                          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-white text-ink shadow-[0_0_0_1px_var(--color-line)] transition-colors duration-150 group-hover:bg-mist-soft">
                            <s.icon size={16} weight="duotone" />
                          </span>
                          <span className="flex flex-col">
                            <span className="text-[13.5px] font-medium text-ink">{s.name}</span>
                            <span className="text-[12px] leading-snug text-muted">{s.desc}</span>
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
