import { memo, useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Broom, Buildings, CheckCircle, Check, House, Truck } from '@phosphor-icons/react'

const EASE_OUT = [0.23, 1, 0.32, 1] as const
const EASE_IN_OUT = [0.77, 0, 0.175, 1] as const

// phase: 0 services, 1 service picked, 2 times, 3 time picked, 4 confirmed
const PHASE_MS = [1100, 1400, 900, 1400, 3600]

const services = [
  { id: 'koti', name: 'Kotisiivous', meta: '62 m² · 3 h', icon: House },
  { id: 'airbnb', name: 'Airbnb-siivous', meta: 'Vaihtosiivous', icon: Buildings },
  { id: 'muutto', name: 'Muuttosiivous', meta: 'Koko asunto', icon: Truck },
]
const days = [
  { d: 'Ma', n: 24 },
  { d: 'Ti', n: 25 },
  { d: 'Ke', n: 26 },
  { d: 'To', n: 27 },
  { d: 'Pe', n: 28 },
]
const slots = ['08:00', '10:30', '12:00', '14:00', '15:30', '17:00']

export const PhoneDemo = memo(function PhoneDemo() {
  const reduce = useReducedMotion()
  const [phase, setPhase] = useState(reduce ? 4 : 0)

  useEffect(() => {
    if (reduce) return
    const t = window.setTimeout(() => setPhase((p) => (p + 1) % PHASE_MS.length), PHASE_MS[phase])
    return () => window.clearTimeout(t)
  }, [phase, reduce])

  const screen = phase < 2 ? 'service' : phase < 4 ? 'time' : 'done'

  return (
    <div
      role="img"
      aria-label="Esimerkki: kotisiivouksen varaus sovelluksessa kolmessa vaiheessa"
      className="relative aspect-[9/19.2] w-full rounded-[44px] bg-[#1b1d22] p-[7px] shadow-[0_40px_80px_-30px_rgba(21,23,28,0.55),0_0_0_1px_rgba(255,255,255,0.06)_inset]">
      <div aria-hidden className="relative h-full w-full overflow-hidden rounded-[37px] bg-canvas">
        {/* Dynamic island → morphs into the confirmation */}
        <div className="absolute inset-x-0 top-2.5 z-10 flex justify-center">
          <motion.div
            layout
            transition={{ layout: { type: 'spring', duration: 0.55, bounce: 0.22 } }}
            style={{ borderRadius: 999 }}
            className={`flex items-center overflow-hidden bg-[#0e0f12] text-white ${
              screen === 'done' ? 'gap-2.5 py-2 pr-4 pl-2' : 'h-[26px] w-[88px]'
            }`}
          >
            <AnimatePresence>
              {screen === 'done' && (
                <motion.div
                  layout="position"
                  initial={{ opacity: 0, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, transition: { duration: 0.12 } }}
                  transition={{ duration: 0.3, delay: 0.12, ease: EASE_OUT }}
                  className="flex items-center gap-2.5"
                >
                  <span className="grid size-7 place-items-center rounded-full bg-plum">
                    <Check size={14} weight="bold" />
                  </span>
                  <span className="flex flex-col leading-tight">
                    <span className="text-[12px] font-semibold whitespace-nowrap">Siivous tilattu!</span>
                    <span className="text-[10px] whitespace-nowrap text-white/55">Ke 26.11. klo 14:00</span>
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <div className="flex h-full flex-col px-4 pt-14 pb-4">
          <AnimatePresence mode="wait" initial={false}>
            {screen === 'service' && (
              <Screen key="service" title="Mitä siivotaan?" step="1/3">
                <div className="flex flex-col gap-2">
                  {services.map((s, idx) => {
                    const picked = phase === 1 && idx === 0
                    return (
                      <div
                        key={s.id}
                        className={`flex items-center gap-3 rounded-2xl border bg-white p-3 transition-[border-color,box-shadow] duration-300 ${
                          picked ? 'border-plum shadow-[0_0_0_3px_rgba(122,74,110,0.12)]' : 'border-line'
                        }`}
                      >
                        <span className="grid size-8 place-items-center rounded-xl bg-mist-soft text-ink">
                          <s.icon size={16} weight="duotone" />
                        </span>
                        <span className="flex min-w-0 flex-1 flex-col">
                          <span className="text-[12.5px] font-semibold text-ink">{s.name}</span>
                          <span className="text-[10.5px] text-muted">{s.meta}</span>
                        </span>
                        <span
                          className={`grid size-[18px] place-items-center rounded-full border transition-colors duration-200 ${
                            picked ? 'border-plum bg-plum text-white' : 'border-line'
                          }`}
                        >
                          {picked && <Check size={10} weight="bold" />}
                        </span>
                      </div>
                    )
                  })}
                </div>
                <BookingContext />
              </Screen>
            )}

            {screen === 'time' && (
              <Screen key="time" title="Valitse aika" step="2/3">
                <div className="mb-3 grid grid-cols-5 gap-1.5">
                  {days.map((d) => (
                    <div
                      key={d.n}
                      className={`flex flex-col items-center rounded-xl py-1.5 ${
                        d.n === 26 ? 'bg-ink text-white' : 'bg-white text-ink'
                      }`}
                    >
                      <span className="text-[9.5px] opacity-60">{d.d}</span>
                      <span className="font-mono text-[12px]">{d.n}</span>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {slots.map((t) => {
                    const picked = phase === 3 && t === '14:00'
                    const taken = t === '10:30' || t === '17:00'
                    return (
                      <div
                        key={t}
                        className={`relative rounded-xl border py-2 text-center font-mono text-[11px] transition-colors duration-200 ${
                          taken
                            ? 'border-transparent bg-transparent text-muted/50 line-through'
                            : picked
                              ? 'border-plum bg-plum text-white'
                              : 'border-line bg-white text-ink'
                        }`}
                      >
                        {t}
                      </div>
                    )
                  })}
                </div>
                <BookingContext />
              </Screen>
            )}

            {screen === 'done' && (
              <Screen key="done" title="Varaus vahvistettu" step="3/3">
                <div className="rounded-2xl border border-line bg-white p-3.5">
                  <div className="mb-3 flex items-center gap-2 text-plum">
                    <CheckCircle size={18} weight="fill" />
                    <span className="text-[12px] font-semibold">Siivooja tulossa</span>
                  </div>
                  <dl className="flex flex-col gap-2 text-[11px]">
                    <Row k="Palvelu" v="Kotisiivous" />
                    <Row k="Aika" v="Ke 26.11. 14:00" mono />
                    <Row k="Kesto" v="3 h" mono />
                  </dl>
                </div>
                <div className="mt-2 flex items-center gap-2.5 rounded-2xl bg-mist-soft p-3">
                  <span className="grid size-8 place-items-center rounded-full bg-white text-[11px] font-semibold text-ink">
                    AK
                  </span>
                  <span className="flex flex-col">
                    <span className="text-[11.5px] font-semibold text-ink">Aino Kettunen</span>
                    <span className="text-[10px] text-muted">Kiilto Siivous Oy</span>
                  </span>
                  <Broom size={16} className="ml-auto text-ink-soft" />
                </div>
              </Screen>
            )}
          </AnimatePresence>

          {/* Bottom bar – price is always visible, like the product promise */}
          <div className="mt-auto flex items-center justify-between rounded-2xl bg-white p-2 pl-3.5 shadow-[0_1px_0_rgba(21,23,28,0.04)]">
            <span className="flex flex-col leading-tight">
              <span className="text-[9.5px] text-muted">Hinta sis. alv</span>
              <span className="font-mono text-[14px] text-ink">128,00 €</span>
            </span>
            <motion.span
              animate={{ backgroundColor: screen === 'done' ? '#7a4a6e' : '#15171c' }}
              transition={{ duration: 0.3, ease: EASE_IN_OUT }}
              className="rounded-xl px-3.5 py-2 text-[11px] font-medium text-white"
            >
              {screen === 'done' ? 'Seuraa' : 'Jatka'}
            </motion.span>
          </div>
        </div>
      </div>
    </div>
  )
})

function Screen({ title, step, children }: { title: string; step: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 14, filter: 'blur(3px)' }}
      animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, x: -14, filter: 'blur(3px)', transition: { duration: 0.16, ease: 'easeIn' } }}
      transition={{ duration: 0.32, ease: EASE_OUT }}
    >
      <div className="mb-3 flex items-baseline justify-between">
        <p className="text-[15px] font-semibold tracking-tight text-ink">{title}</p>
        <span className="font-mono text-[10px] text-muted">{step}</span>
      </div>
      {children}
    </motion.div>
  )
}

/** Fills the lower half of steps 1–2: where and how big, like a real booking form. */
function BookingContext() {
  return (
    <div className="mt-4">
      <p className="mb-2 text-[10.5px] font-medium text-muted">Kohde</p>
      <div className="flex flex-col divide-y divide-line rounded-2xl border border-line bg-white text-[11px]">
        <div className="flex items-center justify-between px-3 py-2.5">
          <span className="text-muted">Osoite</span>
          <span className="font-medium text-ink">Kalevankatu 14, Helsinki</span>
        </div>
        <div className="flex items-center justify-between px-3 py-2.5">
          <span className="text-muted">Asunto</span>
          <span className="font-medium text-ink">Kaksio · 62 m²</span>
        </div>
        <div className="flex items-center justify-between px-3 py-2.5">
          <span className="text-muted">Arvioitu kesto</span>
          <span className="font-mono text-ink">3 h</span>
        </div>
      </div>
    </div>
  )
}

function Row({ k, v, mono }: { k: string; v: string; mono?: boolean }) {
  return (
    <div className="flex justify-between">
      <dt className="text-muted">{k}</dt>
      <dd className={`text-ink ${mono ? 'font-mono' : 'font-medium'}`}>{v}</dd>
    </div>
  )
}
