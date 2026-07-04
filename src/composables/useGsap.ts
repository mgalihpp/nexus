/**
 * useGsap — component-scoped GSAP context.
 * Runs the given setup after mount inside gsap.context() scoped to the
 * provided container ref (so selectors only match this component's subtree)
 * and reverts everything — tweens, ScrollTriggers, inline styles — on unmount.
 */
import { onMounted, onUnmounted, type Ref } from 'vue'
import { gsap, prefersReducedMotion } from '@/lib/gsap'

export function useGsap(
  container: Ref<HTMLElement | null>,
  setup: (ctx: gsap.Context) => void,
): void {
  let ctx: gsap.Context | undefined

  onMounted(() => {
    if (!container.value || prefersReducedMotion()) return
    ctx = gsap.context(setup, container.value)
  })

  onUnmounted(() => {
    ctx?.revert()
  })
}
