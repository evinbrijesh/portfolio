import { useEffect, useRef } from 'react'

/**
 * Attaches an IntersectionObserver to the returned ref.
 * When the element enters the viewport, it gets the class
 * `is-revealed`, which CSS transitions act upon.
 *
 * @param {number} threshold - 0–1, fraction of element visible before reveal
 * @param {string} rootMargin - CSS margin string, e.g. '0px 0px -80px 0px'
 */
export function useScrollReveal(threshold = 0.12, rootMargin = '0px 0px -60px 0px') {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-revealed')
          observer.unobserve(el) // only fire once
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return ref
}
