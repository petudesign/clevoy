import { memo, useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

type Props = { words: string[]; interval?: number; className?: string }

/**
 * Plain vertical roll inside a clipping mask: the old word slides up and out,
 * the new one slides up from below. No layout/scale tricks, no blur –
 * the word sits on its own line so width changes don't move anything.
 */
export const RotatingWord = memo(function RotatingWord({ words, interval = 2800, className }: Props) {
  const [i, setI] = useState(0)
  const reduce = useReducedMotion()

  useEffect(() => {
    const id = window.setInterval(() => setI((n) => (n + 1) % words.length), interval)
    return () => window.clearInterval(id)
  }, [words.length, interval])

  return (
    // mt-[0.05em]: optical leading. The line above is mostly x-height letters
    // ("vaivattomasti"), these words have ascenders, so equal line pitch looked tighter here.
    <span
      className={`relative mt-[0.05em] block pb-[0.08em] ${className ?? ''}`}
      // Mask = the glyphs' own box (ascender line → baseline), not the whole line box.
      // With overflow-hidden the outgoing word stayed visible in the gap under the
      // previous line mid-roll, which read as uneven line spacing.
      style={{ clipPath: 'inset(0.1em 0 0.18em 0)' }}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[i]}
          aria-hidden
          initial={reduce ? { opacity: 0 } : { y: '105%' }}
          animate={reduce ? { opacity: 1 } : { y: 0 }}
          exit={reduce ? { opacity: 0 } : { y: '-105%' }}
          transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
          className="block whitespace-nowrap"
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
      <span className="sr-only">{words.join(', ')}</span>
    </span>
  )
})
