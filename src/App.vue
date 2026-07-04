<script setup lang="ts">
/**
 * App root — composes the landing page from self-contained sections.
 * Layout intentionally thin: the page is just a header over a hero card
 * on a full-black canvas, matching the reference design.
 */
import SiteHeader from './components/SiteHeader.vue'
import HeroSection from './components/HeroSection.vue'
import LogoStrip from './components/LogoStrip.vue'
import HighlightGrid from './components/HighlightGrid.vue'
import AgendaSection from './components/AgendaSection.vue'
import SpeakersSection from './components/SpeakersSection.vue'
import WhyAttendSection from './components/WhyAttendSection.vue'
</script>

<template>
  <!-- Full-height flex column: header keeps its natural height,
       the hero grows to fill the remaining viewport space. -->
  <div class="flex min-h-screen flex-col bg-canvas">
    <!-- Design frame targeted at a 1440px Figma canvas, centred on wider screens.
         The horizontal gutter (~96px at 1440) is applied here so the wordmark,
         nav and hero card all share the same left/right alignment. -->
    <div
      class="mx-auto flex w-full max-w-360 flex-1 flex-col px-6 pb-6 sm:px-12 sm:pb-8 lg:px-25 lg:pb-10"
    >
      <SiteHeader />
      <!-- Hero fills the first viewport; the sections below scroll into view. -->
      <HeroSection />
      <LogoStrip />
      <HighlightGrid />
      <AgendaSection />
      <SpeakersSection />
      <WhyAttendSection />
    </div>
  </div>
</template>
