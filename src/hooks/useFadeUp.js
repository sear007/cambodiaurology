import { useEffect, useRef } from 'react'

export function useFadeUp() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          io.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )

    el.querySelectorAll('.fade-up').forEach(child => io.observe(child))
    if (el.classList.contains('fade-up')) io.observe(el)

    return () => io.disconnect()
  }, [])

  return ref
}
