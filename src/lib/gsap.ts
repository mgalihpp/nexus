/**
 * Central GSAP setup.
 * Registers plugins exactly once and exposes shared helpers so every
 * component animates through the same configured instance.
 */
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { Observer } from 'gsap/Observer'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, Observer)

// Global defaults keep the motion language consistent across sections.
gsap.defaults({ ease: 'power3.out', duration: 0.9 })

/** True when the user asked the OS to minimise motion — all entrance
 *  animations and parallax are skipped, content renders in place. */
export const prefersReducedMotion = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export { gsap, ScrollTrigger, ScrollSmoother, Observer }
