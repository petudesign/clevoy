// Shared scroll reveal. Each [data-reveal-item] plays once, when ~55 % of it is visible
// and it's past the bottom 12 % of the screen – so it starts when you're actually looking.
// Items already on screen at load are left in their final state (no flash on reload).
// On narrow screens --seq is reset so stacked items don't wait for each other.
//
// [data-reveal-group] (e.g. the bento as a swipe row on phones): its items sit side by side
// in a horizontal scroller, so most of them are off to the right and would never reach 55 %.
// On narrow screens the whole group is observed instead, and all its items play together
// in order – the next tile peeking in at the edge is visible, so the row reads as swipeable.
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
if (!reduce && 'IntersectionObserver' in window) {
  const narrow = window.matchMedia('(max-width: 767px)').matches
  const play = (target: Element) => {
    if (target.hasAttribute('data-reveal-group')) {
      target.querySelectorAll('[data-reveal-item]').forEach((i) => i.classList.add('is-in'))
    } else target.classList.add('is-in')
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue
        play(e.target)
        io.unobserve(e.target)
      }
    },
    { threshold: 0.55, rootMargin: '0px 0px -12% 0px' },
  )
  const inView = (el: Element) => {
    const r = el.getBoundingClientRect()
    return r.top < window.innerHeight * 0.75 && r.bottom > 0
  }
  const groups = new Set<Element>()
  document.querySelectorAll<HTMLElement>('[data-reveal-item]').forEach((el) => {
    const group = narrow ? el.closest('[data-reveal-group]') : null
    if (group) {
      if (inView(group)) return
      el.style.setProperty('--seq', String([...group.querySelectorAll('[data-reveal-item]')].indexOf(el)))
      el.dataset.revealItem = 'ready'
      groups.add(group)
      return
    }
    if (inView(el)) return
    if (narrow) el.style.setProperty('--seq', '0')
    el.dataset.revealItem = 'ready'
    io.observe(el)
  })
  groups.forEach((g) => io.observe(g))
}
