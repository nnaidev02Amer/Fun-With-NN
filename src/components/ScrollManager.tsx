import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
}

/**
 * Scrolls to the element named by the URL hash (e.g. `/#about`) after navigation or on
 * first load. Sections use `scroll-mt-*` classes so sticky headers don't cover headings.
 * Retries briefly because the target may mount a frame after the route changes.
 */
export function ScrollManager() {
  const { hash, pathname, state, key } = useLocation()

  // Footer links set `state.scrollTop`. A route change keeps the old scroll offset (the
  // footer sits at the bottom), so the new page would open mid-way down — glide to the top.
  useEffect(() => {
    if (!hash && (state as { scrollTop?: boolean } | null)?.scrollTop) scrollToTop()
  }, [key, hash, state])

  useEffect(() => {
    if (!hash) return
    const id = decodeURIComponent(hash.slice(1))
    let tries = 0
    let timer: number | undefined
    const attempt = () => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
      } else if (tries++ < 10) {
        timer = window.setTimeout(attempt, 50)
      }
    }
    attempt()
    return () => window.clearTimeout(timer)
  }, [hash, pathname])

  return null
}
