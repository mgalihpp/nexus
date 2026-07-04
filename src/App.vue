<script setup lang="ts">
/**
 * App root — composes the landing page from self-contained sections.
 * Layout intentionally thin: the page is just a header over a hero card
 * on a full-black canvas, matching the reference design.
 *
 * Also owns page-level scrolling: GSAP ScrollSmoother wraps the whole page
 * for inertia-smoothed scrolling, and in-page anchor clicks (#tickets, …)
 * are intercepted so they glide to the target instead of jumping.
 */
import { onMounted, onUnmounted, ref } from 'vue'
import { ScrollSmoother, prefersReducedMotion } from '@/lib/gsap'
import SiteHeader from './components/SiteHeader.vue'
import HeroSection from './components/HeroSection.vue'
import LogoStrip from './components/LogoStrip.vue'
import HighlightGrid from './components/HighlightGrid.vue'
import AgendaSection from './components/AgendaSection.vue'
import SpeakersSection from './components/SpeakersSection.vue'
import WhyAttendSection from './components/WhyAttendSection.vue'
import TestimonialsSection from './components/TestimonialsSection.vue'
import RegisterSection from './components/RegisterSection.vue'
import TicketSection from './components/TicketSection.vue'
import ContactSection from './components/ContactSection.vue'
import SiteFooter from './components/SiteFooter.vue'

const wrapper = ref<HTMLElement | null>(null)
let smoother: ScrollSmoother | undefined

// Delegated handler: any in-page anchor (navbar, CTAs, footer links)
// scrolls smoothly to its target section instead of jumping.
const onAnchorClick = (e: MouseEvent) => {
  const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]')
  if (!link) return
  const target = document.querySelector(link.getAttribute('href')!)
  if (!target) return
  e.preventDefault()
  if (smoother) {
    // Land targets just below the fixed header.
    smoother.scrollTo(target, true, 'top 88px')
  } else {
    target.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => {
  document.addEventListener('click', onAnchorClick)
  if (prefersReducedMotion()) return
  smoother = ScrollSmoother.create({
    wrapper: '#smooth-wrapper',
    content: '#smooth-content',
    smooth: 1.2, // seconds to "catch up" to the native scroll position
    smoothTouch: 0.1, // near-native on touch; heavy smoothing feels laggy there
    effects: false,
  })
})

onUnmounted(() => {
  document.removeEventListener('click', onAnchorClick)
  smoother?.kill()
})
</script>

<template>
  <!-- Fixed header lives OUTSIDE the ScrollSmoother wrapper: elements inside
       #smooth-content are translated every frame, which breaks position:fixed. -->
  <SiteHeader />

  <!-- ScrollSmoother structure: the wrapper stays fixed while the content
       inside is translated for the smoothed scroll. -->
  <div id="smooth-wrapper" ref="wrapper">
    <div id="smooth-content">
      <!-- Full-height flex column: pt compensates for the fixed header so the
           hero still fills the first viewport. -->
      <div class="flex min-h-screen flex-col bg-canvas pt-19 lg:pt-21">
        <!-- Design frame targeted at a 1440px Figma canvas, centred on wider screens.
             The horizontal gutter (~96px at 1440) is applied here so the wordmark,
             nav and hero card all share the same left/right alignment. -->
        <div
          class="mx-auto flex w-full max-w-360 flex-1 flex-col px-6 pb-6 sm:px-12 sm:pb-8 lg:px-25 lg:pb-10"
        >
          <!-- Hero fills the first viewport; the sections below scroll into view. -->
          <HeroSection />
          <LogoStrip />
          <HighlightGrid />
          <AgendaSection />
          <SpeakersSection />
          <WhyAttendSection />
          <TestimonialsSection />
          <RegisterSection />
          <TicketSection />
          <ContactSection />
          <SiteFooter />
        </div>
      </div>
    </div>
  </div>
</template>
