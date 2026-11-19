import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ChatCircleDots, PaperPlaneRight, X } from '@phosphor-icons/react'
import { WindowMark } from './Logo'

const EASE_OUT = [0.23, 1, 0.32, 1] as const

/**
 * Visual stand-in for Clevoy's chat (Xbot, clevoy.xbot.fi/embed.js on the live site).
 * The real script is NOT loaded here: it would talk to Clevoy's production bot.
 * In production: keep this launcher, and open Xbot's widget from it (or style Xbot's own
 * launcher to match), loaded after first interaction so it never costs first paint.
 */
export function ChatLauncher() {
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()
  const btnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        btnRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3 md:right-6 md:bottom-6">
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Clevoyn asiakaspalvelu"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.92, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0, transition: { duration: 0.24, ease: EASE_OUT } }}
            exit={{ opacity: 0, scale: reduce ? 1 : 0.96, transition: { duration: 0.14, ease: 'easeIn' } }}
            // grows out of the launcher (bottom-right), never from its own center
            style={{ transformOrigin: 'calc(100% - 28px) calc(100% + 40px)' }}
            className="w-[min(360px,calc(100vw-2rem))] overflow-hidden rounded-[1.5rem] bg-white shadow-[0_0_0_1px_var(--color-line),0_30px_60px_-20px_rgba(21,23,28,0.35)]"
          >
            <div className="flex items-center gap-3 bg-ink px-4 py-3.5 text-white">
              <span className="grid size-9 place-items-center rounded-full bg-white/10">
                <WindowMark size={16} ink="#f5f6f8" accent="#d08cbb" />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-[14px] font-semibold">Clevoy</span>
                <span className="flex items-center gap-1.5 text-[11.5px] text-white/60">
                  <span className="size-1.5 rounded-full bg-[#6fcf97]" aria-hidden />
                  Vastaamme yleensä heti
                </span>
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Sulje chat"
                className="press ml-auto grid size-8 place-items-center rounded-full text-white/70 hover:bg-white/10 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex flex-col gap-2 bg-canvas p-4">
              <p className="max-w-[85%] rounded-2xl rounded-tl-md bg-white px-3.5 py-2.5 text-[13.5px] leading-snug text-ink shadow-[0_0_0_1px_var(--color-line)]">
                Hei! Kysy mitä vain siivouksesta, hinnoista tai varauksesta.
              </p>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {['Mitä kotisiivous maksaa?', 'Miten kotitalousvähennys toimii?', 'Voinko perua varauksen?'].map((q) => (
                  <span
                    key={q}
                    className="rounded-full border border-line bg-white px-3 py-1.5 text-[12px] text-ink-soft"
                  >
                    {q}
                  </span>
                ))}
              </div>
            </div>

            <form className="flex items-center gap-2 border-t border-line p-3" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="chat-input" className="sr-only">
                Kirjoita viesti
              </label>
              <input
                id="chat-input"
                disabled
                placeholder="Kirjoita viesti…"
                className="min-w-0 flex-1 rounded-full bg-canvas px-4 py-2.5 text-[13.5px] text-ink placeholder:text-muted disabled:cursor-not-allowed"
              />
              <button
                type="submit"
                disabled
                aria-label="Lähetä"
                className="grid size-10 place-items-center rounded-full bg-ink text-white opacity-40"
              >
                <PaperPlaneRight size={16} weight="fill" />
              </button>
            </form>
            <p className="px-4 pb-3 text-[11px] text-ink-soft">Esikatselu: oikea chat (Xbot) kytketään tuotannossa.</p>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        ref={btnRef}
        type="button"
        aria-expanded={open}
        aria-label={open ? 'Sulje chat' : 'Avaa chat'}
        onClick={() => setOpen((o) => !o)}
        className="press relative grid size-14 place-items-center rounded-full bg-plum text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_0_0_1px_rgba(90,51,82,0.6),0_14px_28px_-10px_rgba(90,51,82,0.7)]"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={open ? 'x' : 'chat'}
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6, rotate: open ? -45 : 45 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.18, ease: EASE_OUT }}
            className="grid place-items-center"
          >
            {open ? <X size={22} weight="bold" /> : <ChatCircleDots size={26} weight="fill" />}
          </motion.span>
        </AnimatePresence>
      </button>
    </div>
  )
}
