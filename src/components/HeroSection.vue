<script setup lang="ts">
/**
 * HeroSection
 * The large rounded "card" that dominates the page: event meta row,
 * oversized display title, supporting copy, CTA, and the decorative
 * pinwheel graphic bleeding out of the lower-right corner.
 */
import { ref } from 'vue'
import CtaButton from './CtaButton.vue'
import { useGsap } from '@/composables/useGsap'
import { gsap } from '@/lib/gsap'

const section = ref<HTMLElement | null>(null)

useGsap(section, () => {
  // Intro: meta row → title lines → copy → CTA, with the pinwheel
  // scaling in alongside. Runs once on load.
  gsap
    .timeline({ defaults: { ease: 'power3.out' } })
    .from('.hero-meta > *', { autoAlpha: 0, y: 24, duration: 0.7, stagger: 0.12 })
    .from(
      '.hero-title .block',
      { autoAlpha: 0, yPercent: 60, duration: 1, stagger: 0.15, ease: 'power4.out' },
      '-=0.4',
    )
    .from('.hero-copy', { autoAlpha: 0, y: 30, duration: 0.8 }, '-=0.6')
    .from('.hero-cta', { autoAlpha: 0, y: 20, duration: 0.6 }, '-=0.5')
    .from(
      '.hero-graphic',
      { autoAlpha: 0, scale: 0.6, rotation: -90, duration: 1.4, ease: 'power2.out' },
      0.3,
    )

  // Gentle parallax drift on the pinwheel as the hero scrolls out of view.
  gsap.to('.hero-graphic', {
    yPercent: -35,
    rotation: 120,
    ease: 'none',
    scrollTrigger: {
      trigger: section.value,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  })
})
</script>

<template>
  <section
    id="home"
    ref="section"
    class="relative flex flex-1 flex-col overflow-hidden rounded-4xl bg-surface px-6 py-9 sm:px-10 sm:py-12 lg:px-14 lg:pb-20 lg:pt-20"
  >
    <!-- Decorative hero graphic (element_hero.png). Centred on the right half,
         vertically around the middle so it overlaps the headline/body — exactly
         as in the reference. Vertical centering is done with calc() in `top`
         (70% minus half the image height) instead of a translate utility, so
         the base position never depends on transforms — GSAP owns those.
         aria-hidden: no informational content. -->
    <img
      src="/element_hero.png"
      alt=""
      aria-hidden="true"
      class="hero-graphic pointer-events-none absolute right-[10%] top-[calc(70%-8.125rem)] h-65 w-65 object-contain will-change-transform sm:top-[calc(70%-11.25rem)] sm:h-90 sm:w-90"
    />

    <!-- Foreground content sits above the graphic and fills the card height. -->
    <div class="relative z-10 flex flex-1 flex-col">
      <!-- Meta row: date + location. Stacks on mobile, splits on wider screens. -->
      <div
        class="hero-meta flex flex-col gap-2 text-[11px] font-bold uppercase tracking-wide text-ink sm:flex-row sm:items-start sm:justify-between sm:gap-6 sm:text-xs"
      >
        <span>October 15–17, 2052</span>
        <span>Horizon Convention Center, TechCity, Utopolis</span>
      </div>

      <!-- Display title — two fixed lines: "NEXT-GEN AI" over "SUMMIT".
           Each line is its own block so the break never shifts with viewport width. -->
      <h1
        class="hero-title mt-10 text-5xl font-bold uppercase leading-[1.05] tracking-tight text-ink sm:mt-12 sm:text-8xl lg:mt-16 lg:text-[6.25rem]"
      >
        <span class="block">Next-Gen AI</span>
        <span class="block">Summit</span>
      </h1>

      <!-- Supporting copy — forced two-line break between sentences on sm+ to
           mirror the reference; flows naturally on small screens. -->
      <p class="hero-copy mt-8 max-w-205 text-base leading-relaxed text-ink sm:text-lg">
        Explore the cutting-edge innovations shaping the future of artificial intelligence.<br
          class="hidden sm:block"
        />
        Join global leaders and visionaries for two days of insights, discussions, and
        breakthroughs.
      </p>

      <!-- Call to action — mt-auto pushes it to the bottom of the tall card -->
      <div class="hero-cta mt-auto pt-12">
        <CtaButton href="#tickets">Early bird tickets</CtaButton>
      </div>
    </div>
  </section>
</template>
