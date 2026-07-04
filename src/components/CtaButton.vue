<script setup lang="ts">
/**
 * CtaButton
 * Rounded gradient pill call-to-action with a trailing arrow glyph.
 * Kept generic (label via slot, optional href) so it can be reused elsewhere.
 */
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap, prefersReducedMotion } from '@/lib/gsap'

withDefaults(defineProps<{ href?: string }>(), { href: '#' })

// Magnetic hover: the pill leans toward the cursor while hovered and
// springs back on leave. gsap.quickTo reuses one tween per axis, so the
// pointermove handler never allocates new tweens (cheap at 60fps+).
const pill = ref<HTMLAnchorElement | null>(null)
let cleanup: (() => void) | undefined

onMounted(() => {
  const el = pill.value
  if (!el || prefersReducedMotion() || !window.matchMedia('(hover: hover)').matches) return

  const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3' })
  const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3' })

  const onMove = (e: PointerEvent) => {
    const rect = el.getBoundingClientRect()
    xTo((e.clientX - rect.left - rect.width / 2) * 0.3)
    yTo((e.clientY - rect.top - rect.height / 2) * 0.4)
  }
  const onLeave = () => {
    xTo(0)
    yTo(0)
  }

  el.addEventListener('pointermove', onMove)
  el.addEventListener('pointerleave', onLeave)
  cleanup = () => {
    el.removeEventListener('pointermove', onMove)
    el.removeEventListener('pointerleave', onLeave)
    gsap.killTweensOf(el)
  }
})

onUnmounted(() => cleanup?.())
</script>

<template>
  <a
    ref="pill"
    :href="href"
    class="group inline-flex items-center gap-2 rounded-full bg-linear-to-r from-[#5a86f7] via-[#2d55e8] to-[#132a8f] px-7 py-3.5 text-[15px] font-medium text-ink will-change-transform"
  >
    <slot>Early bird tickets</slot>
    <!-- Diagonal arrow that nudges on hover -->
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2.2"
      class="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
    >
      <path d="M7 17L17 7M17 7H8M17 7v9" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </a>
</template>
