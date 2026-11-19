import { useId } from 'react'

/**
 * Clevoy logo directions (built on a 24-unit grid, no traced references).
 * Process loosely follows the make-logo skill: six directions, at least half
 * show the idea as a picture, every mark checked at 16 px.
 */
export type LogoVariant = 'ikkuna' | 'pyyhkaisy' | 'kupla' | 'ovi' | 'raidat' | 'aika'

type MarkProps = { size?: number; ink?: string; accent?: string }

const INK = '#15171c'
const PLUM = '#7a4a6e'
const PLUM_BRIGHT = '#b8679f' // "Kirkas luumu" – chosen 2026-11-18, reads at 16 px

/**
 * Arched window: home + freshly cleaned window + one lit pane = a booked slot.
 * Since 2026-11-19 the panes have soft inner corners at every size (same shape as the
 * large mark), drawn flat here: no gradient, no glow, so it stays crisp down to 16 px.
 */
export function WindowMark({ size = 24, ink = INK, accent = PLUM_BRIGHT }: MarkProps) {
  return <WindowMarkSoft size={size} ink={ink} accent={accent} />
}

/**
 * Large-size Ikkuna (chosen 2026-11-19, "Pehmeä + hehku"): same silhouette, rounded pane
 * corners, one top-light gradient on the frame and a quiet glow on the lit pane, as if
 * light came through the window. Only above 24 px: at 24 px and below the detail turns
 * to mush, so ClevoyMark falls back to the flat WindowMark.
 */
export function WindowMarkSoft({
  size = 64,
  tone = 'light',
  ink,
  accent,
}: {
  size?: number
  tone?: 'light' | 'dark'
  /** Solid colours (watermarks, one-colour backgrounds): same soft shape, no gradient or glow. */
  ink?: string
  accent?: string
}) {
  const id = 'cs' + useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const light = tone === 'light'
  const top = light ? '#3a3e47' : '#ffffff'
  const base = light ? '#15171c' : '#d5d8de'
  const r = 1.6 // pane corner radius
  const g = 0.95 // half the mullion gap (1.9, same as the flat mark)
  const solid = ink !== undefined
  const frame = solid ? ink : `url(#${id}f)`
  const lit = `M${12 + g} 2.06A8.5 8.5 0 0 1 20.5 10.5V${12 - g}H${12 + g + r}a${r} ${r} 0 0 1 -${r} -${r}z`
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden overflow="visible">
      <defs>
        <linearGradient id={`${id}f`} x1="0" y1="2" x2="0" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={top} />
          <stop offset="1" stopColor={base} />
        </linearGradient>
        <radialGradient id={`${id}l`} cx="18.5" cy="4.5" r="9" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={light ? '#dc93c4' : '#ecb5d9'} />
          <stop offset="1" stopColor={light ? '#a95a92' : '#c47aac'} />
        </radialGradient>
        <filter id={`${id}g`} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="1.8" />
        </filter>
      </defs>
      <path d={`M3.5 ${12 - g}V10.5a8.5 8.5 0 0 1 ${8.5 - g} -8.44V${12 - g - r}a${r} ${r} 0 0 1 -${r} ${r}H3.5z`} fill={frame} />
      {!solid && <path d={lit} fill="#d08cbb" opacity={light ? 0.35 : 0.5} filter={`url(#${id}g)`} />}
      <path d={lit} fill={solid ? (accent ?? ink) : `url(#${id}l)`} />
      <path d={`M3.5 ${12 + g}H${12 - g - r}a${r} ${r} 0 0 1 ${r} ${r}V22H3.5z`} fill={frame} />
      <path d={`M${12 + g + r} ${12 + g}H20.5V22H${12 + g}V${12 + g + r}a${r} ${r} 0 0 1 ${r} -${r}z`} fill={frame} />
    </svg>
  )
}

/** The mark to use by default: soft + glow above 24 px, flat at 24 px and below. */
export function ClevoyMark({ size = 24, tone = 'light' }: { size?: number; tone?: 'light' | 'dark' }) {
  if (size > 24) return <WindowMarkSoft size={size} tone={tone} />
  return tone === 'dark' ? <WindowMark size={size} ink="#f5f6f8" accent="#d08cbb" /> : <WindowMark size={size} />
}

/** C as one squeegee stroke with flat ends + the clean streak it leaves */
export function WipeMark({ size = 24, ink = INK, accent = PLUM }: MarkProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M19.1 6.2A9 9 0 1 0 19.1 17.8" stroke={ink} strokeWidth="4.6" />
      <path d="M15.2 12h6.3" stroke={accent} strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  )
}

/** Soap bubble: a ring with a single highlight */
export function BubbleMark({ size = 24, ink = INK, accent = PLUM }: MarkProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8.6" stroke={ink} strokeWidth="3.4" />
      <path d="M7.6 10.4a4.8 4.8 0 0 1 3-3.1" stroke={accent} strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  )
}

/** Door left ajar with light behind it */
export function DoorMark({ size = 24, ink = INK, accent = PLUM }: MarkProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 21.5V4a1.5 1.5 0 0 1 1.5-1.5h11A1.5 1.5 0 0 1 19 4v17.5" stroke={ink} strokeWidth="2.2" />
      <path d="M14.6 3.6 19 3.6V21.5H14.6z" fill={accent} />
      <path d="M5.6 2.9 14.6 4.6V20.6L5.6 22z" fill={ink} />
    </svg>
  )
}

/** Vacuum stripes on a fresh floor, stacked into a C silhouette */
export function StripesMark({ size = 24, ink = INK, accent = PLUM }: MarkProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="5" y="3" width="16" height="5" rx="2.5" fill={ink} />
      <rect x="2.5" y="9.5" width="10" height="5" rx="2.5" fill={accent} />
      <rect x="5" y="16" width="16" height="5" rx="2.5" fill={ink} />
    </svg>
  )
}

/** Icon form of the wordmark-only direction: the booked-slot ring */
export function SlotMark({ size = 24, ink = INK, accent = '#c79ab9' }: MarkProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect width="24" height="24" rx="6" fill={ink} />
      <circle cx="12" cy="12" r="4.4" stroke={accent} strokeWidth="2.6" />
    </svg>
  )
}

export const marks: Record<LogoVariant, (p: MarkProps) => React.ReactElement> = {
  ikkuna: WindowMark,
  pyyhkaisy: WipeMark,
  kupla: BubbleMark,
  ovi: DoorMark,
  raidat: StripesMark,
  aika: SlotMark,
}

function SlotWordmark({ color, accent }: { color: string; accent: string }) {
  return (
    <span className="inline-flex items-baseline font-semibold tracking-[-0.04em]" style={{ color }}>
      Clev
      <span
        aria-hidden
        className="mx-[0.03em] inline-block size-[0.5em] rounded-full"
        style={{ boxShadow: `inset 0 0 0 0.13em ${accent}` }}
      />
      y<span className="sr-only">Clevoy</span>
    </span>
  )
}

export function Logo({
  variant = 'ikkuna',
  size = 19,
  tone = 'light',
}: {
  variant?: LogoVariant
  size?: number
  tone?: 'light' | 'dark'
}) {
  const ink = tone === 'light' ? INK : '#f5f6f8'
  const accent = tone === 'light' ? PLUM_BRIGHT : '#d08cbb'

  if (variant === 'aika') {
    return (
      <span className="leading-none" style={{ fontSize: size * 1.05 }}>
        <SlotWordmark color={ink} accent={accent} />
      </span>
    )
  }
  const M = marks[variant]
  return (
    <span className="inline-flex items-center gap-[0.3em] leading-none" style={{ fontSize: size }}>
      {/* Optical alignment: mark ≈ cap height + overshoot, ink bottom sits on the text baseline */}
      <span className="inline-flex -translate-y-[0.11em]">
        {variant === 'ikkuna' ? <ClevoyMark size={size} tone={tone} /> : <M size={size} ink={ink} accent={accent} />}
      </span>
      <span className="font-semibold tracking-[-0.04em]" style={{ color: ink }}>
        Clevoy
      </span>
    </span>
  )
}
