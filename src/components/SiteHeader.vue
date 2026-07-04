<script setup lang="ts">
/**
 * SiteHeader
 * Fixed top navigation bar: wordmark on the left, primary nav on the right.
 * Hides itself (slides up) while scrolling down and glides back in when the
 * user scrolls up; gains a blurred dark backdrop once off the very top.
 * The active link renders as a pill (matching the "Home" state in the design).
 * On mobile the link list collapses into a toggleable menu.
 */
import { onMounted, onUnmounted, ref } from 'vue'
import { useGsap } from '@/composables/useGsap'
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap'

interface NavItem {
  label: string
  href: string
}

const items: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Schedule', href: '#schedule' },
  { label: 'Speakers', href: '#speakers' },
  { label: 'Tickets', href: '#tickets' },
  { label: 'Venue', href: '#venue' },
  { label: 'Sponsors', href: '#sponsors' },
]

// Tracks which link is "active" so we can render the pill highlight.
const active = ref('Home')
// Mobile menu open/closed state.
const menuOpen = ref(false)
// True once the page is scrolled past the top — switches on the blur backdrop.
const scrolled = ref(false)

const header = ref<HTMLElement | null>(null)
let st: ScrollTrigger | undefined

useGsap(header, () => {
  // Wordmark and nav links drop in from above on load.
  gsap.from('.header-item', {
    autoAlpha: 0,
    y: -16,
    duration: 0.6,
    stagger: 0.06,
    ease: 'power2.out',
  })
})

onMounted(() => {
  const el = header.value
  if (!el) return

  // Hide on scroll down, reveal on scroll up. quickTo reuses a single tween
  // so rapid direction changes stay smooth instead of stacking animations.
  const show = prefersReducedMotion()
    ? (visible: boolean) => gsap.set(el, { yPercent: visible ? 0 : -110 })
    : (() => {
        const yTo = gsap.quickTo(el, 'yPercent', { duration: 0.45, ease: 'power3.out' })
        return (visible: boolean) => yTo(visible ? 0 : -110)
      })()

  st = ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => {
      scrolled.value = self.scroll() > 8
      // Keep the bar visible near the very top and while the menu is open.
      const shouldShow = self.direction === -1 || self.scroll() < 80 || menuOpen.value
      show(shouldShow)
    },
  })
})

onUnmounted(() => {
  st?.kill()
  if (header.value) gsap.killTweensOf(header.value)
})
</script>

<template>
  <!-- Fixed full-width bar; the inner frame mirrors the page gutter so the
       wordmark and nav stay aligned with the hero card below. -->
  <header
    ref="header"
    class="fixed inset-x-0 top-0 z-50 transition-colors duration-300"
    :class="scrolled || menuOpen ? 'bg-black/70 backdrop-blur-md' : 'bg-transparent'"
  >
    <div
      class="mx-auto flex w-full max-w-360 items-center justify-between px-6 py-5 sm:px-12 lg:px-25 lg:py-6"
    >
      <!-- Wordmark -->
      <a href="#home" class="header-item text-2xl font-bold tracking-tight text-ink lowercase">
        nexus
      </a>

      <!-- Desktop navigation -->
      <nav class="hidden items-center gap-1 md:flex">
        <a
          v-for="item in items"
          :key="item.label"
          :href="item.href"
          @click="active = item.label"
          class="header-item rounded-full px-4 py-2 text-sm font-medium transition-colors"
          :class="
            active === item.label
              ? 'text-ink ring-1 ring-white/30' // active pill
              : 'text-muted hover:text-ink'
          "
        >
          {{ item.label }}
        </a>
      </nav>

      <!-- Mobile hamburger -->
      <button
        class="header-item text-ink md:hidden"
        aria-label="Toggle navigation"
        @click="menuOpen = !menuOpen"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path v-if="!menuOpen" d="M4 6h16M4 12h16M4 18h16" stroke-linecap="round" />
          <path v-else d="M6 6l12 12M18 6L6 18" stroke-linecap="round" />
        </svg>
      </button>
    </div>

    <!-- Mobile dropdown menu -->
    <nav
      v-if="menuOpen"
      class="absolute inset-x-4 top-20 z-20 flex flex-col gap-1 rounded-2xl bg-surface p-3 ring-1 ring-white/10 md:hidden"
    >
      <a
        v-for="item in items"
        :key="item.label"
        :href="item.href"
        @click="((active = item.label), (menuOpen = false))"
        class="rounded-xl px-4 py-3 text-sm font-medium transition-colors"
        :class="active === item.label ? 'bg-white/10 text-ink' : 'text-muted hover:text-ink'"
      >
        {{ item.label }}
      </a>
    </nav>
  </header>
</template>
