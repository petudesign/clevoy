import { ArrowRight } from '@phosphor-icons/react'

/**
 * CTA arrow that "swipes" on hover: the arrow exits to the right while a second one
 * slides in from the left. Pure CSS (.arrow-swap in global.css), triggered by hovering
 * the closest link/button; disabled for touch and reduced motion.
 */
export function ArrowSwap({ size = 14 }: { size?: number }) {
  return (
    <span className="arrow-swap" aria-hidden="true">
      <ArrowRight size={size} weight="bold" className="arrow-swap__a" />
      <ArrowRight size={size} weight="bold" className="arrow-swap__b" />
    </span>
  )
}
