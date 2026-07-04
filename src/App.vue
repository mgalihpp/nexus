<script setup lang="ts">
/**
 * App root — composes the landing page from self-contained sections.
 * Layout intentionally thin: the page is just a header over a hero card
 * on a full-black canvas, matching the reference design.
 */
import SiteHeader from './components/SiteHeader.vue'
import HeroSection from './components/HeroSection.vue'
</script>

<template>
  <!-- Full-height flex column: header keeps its natural height,
       the hero grows to fill the remaining viewport space. -->
  <div class="flex min-h-screen flex-col bg-canvas">
    <!-- Design frame targeted at a 1440px Figma canvas, centred on wider screens.
         The horizontal gutter (~96px at 1440) is applied here so the wordmark,
         nav and hero card all share the same left/right alignment. -->
    <div
      class="mx-auto flex w-full max-w-360 flex-1 flex-col px-6 pb-6 sm:px-12 sm:pb-8 lg:px-24 lg:pb-10"
    >
      <SiteHeader />
      <HeroSection />
    </div>
  </div>
</template>
