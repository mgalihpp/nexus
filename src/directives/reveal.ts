/**
 * v-reveal — declarative scroll-reveal directive.
 *
 * Usage:
 *   v-reveal                          → fade-up when the element scrolls in
 *   v-reveal="{ y: 60, delay: 0.2 }"  → custom offset / delay / duration
 *   v-reveal.stagger                  → animate direct children with a stagger
 *
 * Animates transform + opacity only (compositor-friendly) and fires once.
 * Respects prefers-reduced-motion by rendering content in place.
 */
import type { Directive } from 'vue'
import { gsap, prefersReducedMotion } from '@/lib/gsap'

interface RevealOptions {
  y?: number
  x?: number
  scale?: number
  delay?: number
  duration?: number
  stagger?: number
  start?: string
}

const contexts = new WeakMap<HTMLElement, gsap.Context>()

export const vReveal: Directive<HTMLElement, RevealOptions | undefined> = {
  mounted(el, binding) {
    if (prefersReducedMotion()) return

    const opts = binding.value ?? {}
    const staggerChildren = 'stagger' in binding.modifiers
    const targets = staggerChildren ? Array.from(el.children) : el
    if (staggerChildren && el.children.length === 0) return

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        autoAlpha: 0,
        y: opts.y ?? 40,
        x: opts.x ?? 0,
        scale: opts.scale ?? 1,
        duration: opts.duration ?? 0.9,
        delay: opts.delay ?? 0,
        stagger: staggerChildren ? (opts.stagger ?? 0.12) : 0,
        clearProps: 'transform',
        scrollTrigger: {
          trigger: el,
          start: opts.start ?? 'top 85%',
          once: true,
        },
      })
    }, el)

    contexts.set(el, ctx)
  },

  unmounted(el) {
    contexts.get(el)?.revert()
    contexts.delete(el)
  },
}
