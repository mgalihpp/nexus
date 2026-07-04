<script setup lang="ts">
/**
 * HeroSection
 * The large rounded "card" that dominates the page: event meta row,
 * oversized display title, supporting copy, CTA, and the decorative
 * pinwheel graphic bleeding out of the lower-right corner.
 */
import CtaButton from './CtaButton.vue'
</script>

<template>
  <section
    id="home"
    class="relative flex flex-1 flex-col overflow-hidden rounded-4xl bg-surface px-6 py-9 sm:px-10 sm:py-12 lg:px-14 lg:pb-20 lg:pt-20"
  >
    <!-- Decorative hero graphic (element_hero.png). Centred on the right half,
         vertically around the middle so it overlaps the headline/body — exactly
         as in the reference. aria-hidden: no informational content. -->
    <img
      src="/element_hero.png"
      alt=""
      aria-hidden="true"
      class="pointer-events-none absolute right-[10%] top-[70%] h-65 w-65 -translate-y-1/2 object-contain sm:h-90 sm:w-90"
    />

    <!-- Foreground content sits above the graphic and fills the card height. -->
    <div class="relative z-10 flex flex-1 flex-col">
      <!-- Meta row: date + location. Stacks on mobile, splits on wider screens. -->
      <div
        class="flex flex-col gap-2 text-[11px] font-bold uppercase tracking-wide text-ink sm:flex-row sm:items-start sm:justify-between sm:gap-6 sm:text-xs"
      >
        <span>October 15–17, 2052</span>
        <span>Horizon Convention Center, TechCity, Utopolis</span>
      </div>

      <!-- Display title — two fixed lines: "NEXT-GEN AI" over "SUMMIT".
           Each line is its own block so the break never shifts with viewport width. -->
      <h1
        class="mt-10 text-5xl font-bold uppercase leading-[1.05] tracking-tight text-ink sm:mt-12 sm:text-8xl lg:mt-16 lg:text-[6.25rem]"
      >
        <span class="block">Next-Gen AI</span>
        <span class="block">Summit</span>
      </h1>

      <!-- Supporting copy — forced two-line break between sentences on sm+ to
           mirror the reference; flows naturally on small screens. -->
      <p class="mt-8 max-w-205 text-base leading-relaxed text-ink sm:text-lg">
        Explore the cutting-edge innovations shaping the future of artificial intelligence.<br
          class="hidden sm:block"
        />
        Join global leaders and visionaries for two days of insights, discussions, and
        breakthroughs.
      </p>

      <!-- Call to action — mt-auto pushes it to the bottom of the tall card -->
      <div class="mt-auto pt-12">
        <CtaButton href="#tickets">Early bird tickets</CtaButton>
      </div>
    </div>
  </section>
</template>
