'use client'

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react'

// Fade-and-rise on scroll into view. The hidden initial state is defined in
// CSS under `html.js` and gated by prefers-reduced-motion, so:
//  - no JS  -> content is visible (never hidden)
//  - reduced motion -> content is visible, no transition
//  - otherwise -> fades/rises once, when it enters the viewport.
export function Reveal({
  as: Tag = 'div',
  children,
  className = '',
  delay = 0,
}: {
  as?: ElementType
  children: ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
