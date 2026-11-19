// Shared scroll reveal. Each [data-reveal-item] plays once, when ~55 % of it is visible
// and it's past the bottom 12 % of the screen – so it starts when you're actually looking.
// Items already on screen at load are left in their final state (no flash on reload).
// On narrow screens --seq is reset so stacked items don't wait for each other.
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
if (!reduce && 'IntersectionObserver' in window) {
  const narrow = window.matchMedia('(max-width: 767px)').matches
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue
        e.target.classList.add('is-in')
        io.unobserve(e.target)
      }
    },
    { threshold: 0.55, rootMargin: '0px 0px -12% 0px' },
  )
  document.querySelectorAll<HTMLElement>('[data-reveal-item]').forEach((el) => {
    const r = el.getBoundingClientRect()
    if (r.top < window.innerHeight * 0.75 && r.bottom > 0) return
    if (narrow) el.style.setProperty('--seq', '0')
    el.dataset.revealItem = 'ready'
    io.observe(el)
  })
}
